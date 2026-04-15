const app = getApp();
const { STATE_TEXT_MAP, getDefaultUser, normalizeUser, acceptOrder, updateOrderState, getIncome, calcCredit } = require('../../utils/order.js');

function decorateOrders(orders, userRole, userInfo) {
  const studentId = String(userInfo.studentId || '');
  const sortedOrders = orders.slice().sort((a, b) => Number(b.id) - Number(a.id));

  return sortedOrders.map((item) => {
    const isMine = item.riderStudentId && String(item.riderStudentId) === studentId;
    const income = getIncome(item.amount);

    return {
      ...item,
      stateText: STATE_TEXT_MAP[item.currentState] || '待处理',
      riderIncomeText: income.riderIncome.toFixed(2),
      canAccept: userRole === 'rider' && item.currentState === 'pending',
      canPick: userRole === 'rider' && item.currentState === 'accepted' && isMine,
      canDeliver: userRole === 'rider' && item.currentState === 'picked' && isMine,
      canConfirm: userRole === 'demander' && item.currentState === 'delivered',
      canRate: userRole === 'demander' && item.currentState === 'confirmed',
      isMine
    };
  });
}

Page({
  data: {
    orders: [],
    userRole: 'demander',
    userInfo: getDefaultUser(),
    pageTip: '',
    ratingModalVisible: false,
    ratingOrderId: null,
    ratingScore: 5,
    ratingText: ''
  },

  onShow() {
    this.refreshOrders();
  },

  onPullDownRefresh() {
    this.refreshOrders();
    wx.stopPullDownRefresh();
  },

  refreshOrders() {
    const userInfo = normalizeUser(app.globalData.userInfo || wx.getStorageSync('userInfo'));
    const userRole = app.globalData.userRole || wx.getStorageSync('userRole') || 'demander';
    const orders = wx.getStorageSync('ordersList') || [];

    app.globalData.userInfo = userInfo;
    app.globalData.userRole = userRole;

    this.setData({
      userInfo,
      userRole,
      orders: decorateOrders(orders, userRole, userInfo),
      pageTip: userRole === 'demander'
        ? '需求方可在这里查看订单状态、确认收货并完成评价。'
        : '跑腿员可在这里接单、拍照上传验收单并标记已送达。'
    });
  },

  saveOrders(orders) {
    wx.setStorageSync('ordersList', orders);
    this.refreshOrders();
  },

  cancelOrder(e) {
    const orderId = String(e.currentTarget.dataset.id);
    const amount = Number(e.currentTarget.dataset.amount);
    wx.showModal({
      title: '取消订单',
      content: `确定要取消订单吗？\n\n已支付的 ¥${amount} 将原路退回您的微信零钱。`,
      success: (res) => {
        if (res.confirm) {
          this.handleStateChange(orderId, 'pending', 'cancelled', '订单已取消');
        }
      }
    });
  },

  handleAccept(e) {
    const orderId = String(e.currentTarget.dataset.id);
    const orders = wx.getStorageSync('ordersList') || [];
    const targetOrder = orders.find((item) => String(item.id) === orderId);

    if (!targetOrder || targetOrder.currentState !== 'pending') {
      wx.showToast({ title: '订单已被接走', icon: 'none' });
      this.refreshOrders();
      return;
    }

    const currentSchool = wx.getStorageSync('currentSchool');
    const currentCampus = wx.getStorageSync('currentCampus');
    if (targetOrder.school !== currentSchool || targetOrder.campus !== currentCampus) {
      wx.showModal({ title: '无法接单', content: '您只能接当前所在校区的订单，请在首页切换校区。', showCancel: false });
      return;
    }

    const nextOrders = orders.map((item) => (
      String(item.id) === orderId ? acceptOrder(item, this.data.userInfo) : item
    ));

    this.saveOrders(nextOrders);
    wx.showToast({ title: '接单成功', icon: 'success' });
  },

  handlePicked(e) {
    this.handleStateChange(e.currentTarget.dataset.id, 'accepted', 'picked', '已标记取货');
  },

  handleDelivered(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.handleStateChange(orderId, 'picked', 'delivered', '已送达并上传验收图', {
          proofImage: res.tempFiles[0].tempFilePath
        });
      },
      fail: () => {
        wx.showToast({ title: '需上传照片才能送达', icon: 'none' });
      }
    });
  },

  handleConfirm(e) {
    const orderId = String(e.currentTarget.dataset.id);
    wx.showModal({
      title: '确认收货',
      content: '确认后，平台将把这笔佣金结算给跑腿员。',
      success: (res) => {
        if (res.confirm) {
          const orders = wx.getStorageSync('ordersList') || [];
          const targetOrder = orders.find((item) => String(item.id) === orderId);
          const income = getIncome(targetOrder.amount);
          
          const userInfo = this.data.userInfo;
          if (targetOrder.riderStudentId === userInfo.studentId) {
             userInfo.balance = Number((userInfo.balance + income.riderIncome).toFixed(2));
             wx.setStorageSync('userInfo', userInfo);
          }
          this.handleStateChange(orderId, 'delivered', 'confirmed', '收货成功，跑腿费已结算');
        }
      }
    });
  },

  // ============== 评价相关功能 =================
  openRatingModal(e) {
    const orderId = e.currentTarget.dataset.id;
    if (!orderId) return;
    this.setData({ 
      ratingModalVisible: true, 
      ratingOrderId: String(orderId), 
      ratingScore: 5, 
      ratingText: '' 
    });
  },

  closeRatingModal() {
    this.setData({ ratingModalVisible: false });
  },

  setRating(e) {
    this.setData({ ratingScore: Number(e.currentTarget.dataset.score) });
  },

  onReviewInput(e) {
    this.setData({ ratingText: e.detail.value });
  },

  submitRating() {
    if (!this.data.ratingOrderId) return;
    const score = this.data.ratingScore;

    // 找到该订单对应的跑腿员，更新其信用分
    const orders = wx.getStorageSync('ordersList') || [];
    const targetOrder = orders.find(o => String(o.id) === this.data.ratingOrderId);
    if (targetOrder && targetOrder.riderStudentId) {
      // 如果跑腿员是当前用户自己（本地演示场景），直接更新
      const userInfo = this.data.userInfo;
      if (String(userInfo.studentId) === String(targetOrder.riderStudentId)) {
        userInfo.credit = calcCredit(userInfo.credit, score);
        app.globalData.userInfo = userInfo;
        wx.setStorageSync('userInfo', userInfo);
      }
    }

    this.handleStateChange(this.data.ratingOrderId, 'confirmed', 'rated', '评价成功！', {
      rating: score,
      review: this.data.ratingText
    });
    this.closeRatingModal();
  },
  // ===========================================

  contactOtherParty() {
    wx.showModal({ title: '联系对方', content: '呼起聊天界面... (这里在真实项目中会跳转到 IM 聊天页)', confirmText: '确定', showCancel: false });
  },
  
  appealOrder(e) {
    const orderId = String(e.currentTarget.dataset.id);
    wx.showModal({
      title: '申请客服介入', content: '如果外卖损坏或未送到，资金将冻结，客服会介入调查。',
      success: (res) => { if (res.confirm) this.handleStateChange(orderId, 'delivered', 'appealing', '已提交申诉'); }
    });
  },

  handleStateChange(orderId, expectedState, nextState, toastTitle, extraData = {}) {
    const orders = wx.getStorageSync('ordersList') || [];
    const targetOrder = orders.find((item) => String(item.id) === String(orderId));

    if (!targetOrder || targetOrder.currentState !== expectedState) {
      wx.showToast({ title: '订单状态已变化', icon: 'none' });
      this.refreshOrders();
      return;
    }
    const nextOrders = orders.map((item) => (
      String(item.id) === String(orderId) ? updateOrderState(item, nextState, extraData) : item
    ));
    this.saveOrders(nextOrders);
    wx.showToast({ title: toastTitle, icon: 'success' });
  },

  previewImage(e) {
    wx.previewImage({ urls: [e.currentTarget.dataset.url] });
  },

  clearOrders() {
    wx.showModal({
      title: '清空订单',
      content: '确认清空本地订单记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('ordersList', []);
          this.refreshOrders();
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  }
});