const app = getApp();
const { SERVICE_TYPES, SERVICE_TYPE_NAMES, STATE_TEXT_MAP, getDefaultUser, normalizeUser, createOrder, acceptOrder, bumpServiceStats, getCampusCoords, getCampusBuildings, getBuildingCoord } = require('../../utils/order.js');

function decorateOrders(orders, userInfo) {
  const studentId = String(userInfo.studentId || '');
  return orders.map((item) => ({
    ...item,
    stateText: STATE_TEXT_MAP[item.currentState] || '待处理',
    isMine: item.riderStudentId && String(item.riderStudentId) === studentId
  }));
}

Page({
  data: {
    serviceCards: SERVICE_TYPES,
    serviceTypes: SERVICE_TYPE_NAMES,
    serviceTypeIndex: 0,
    pickupCode: '',
    destination: '',     // 地图选点地址
    detailAddress: '',   // 详细门牌号
    contactName: '',     // 联系人
    contactPhone: '',    // 联系电话
    amount: '12.50',
    remark: '',
    userInfo: getDefaultUser(),
    userRole: 'demander',
    freeCouponCount: 0,
    pendingOrders: [],
    myOrders: [],
    currentSchool: '',
    currentCampus: '',
    addressHistory: [],
    campusBuildings: [],
    destinationLat: 0,
    destinationLng: 0
  },

  onShow() {
    this.applySelectedService();
    this.refreshPage();
  },

  applySelectedService() {
    const selectedServiceTypeIndex = wx.getStorageSync('selectedServiceTypeIndex');
    if (selectedServiceTypeIndex !== '' && selectedServiceTypeIndex != null) {
      this.setData({ serviceTypeIndex: Number(selectedServiceTypeIndex) || 0 });
      wx.removeStorageSync('selectedServiceTypeIndex');
    }
  },

  refreshPage() {
    const userInfo = normalizeUser(app.globalData.userInfo || wx.getStorageSync('userInfo'));
    const userRole = app.globalData.userRole || wx.getStorageSync('userRole') || 'demander';
    const orders = wx.getStorageSync('ordersList') || [];
    const decoratedOrders = decorateOrders(orders, userInfo);

    let currentSchool = wx.getStorageSync('currentSchool');
    let currentCampus = wx.getStorageSync('currentCampus');
    if (!currentSchool || !currentCampus) {
      currentSchool = '延安大学';
      currentCampus = '杨家岭校区';
      wx.setStorageSync('currentSchool', currentSchool);
      wx.setStorageSync('currentCampus', currentCampus);
    }

    const addressHistory = wx.getStorageSync('addressHistory') || [];
    const campusBuildings = getCampusBuildings(currentSchool, currentCampus);

    app.globalData.userInfo = userInfo;
    app.globalData.userRole = userRole;

    // 如果联系人和电话为空，自动填充用户的默认信息
    let { contactName, contactPhone } = this.data;
    if (!contactName) contactName = userInfo.nickName;
    if (!contactPhone) contactPhone = userInfo.phoneNumber;

    this.setData({
      userInfo,
      userRole,
      currentSchool,
      currentCampus,
      addressHistory,
      campusBuildings,
      contactName,
      contactPhone,
      pendingOrders: decoratedOrders.filter((item) =>
        item.currentState === 'pending' && item.school === currentSchool && item.campus === currentCampus
      ),
      myOrders: decoratedOrders.filter((item) => item.isMine)
    });

    this.syncCouponCount();
  },

  bindServiceTypeChange(e) {
    this.setData({ serviceTypeIndex: Number(e.detail.value) }, () => this.syncCouponCount());
  },

  selectService(e) {
    this.setData({ serviceTypeIndex: Number(e.currentTarget.dataset.index || 0) }, () => this.syncCouponCount());
  },

  bindInput(e) {
    this.setData({ [e.currentTarget.dataset.field]: e.detail.value });
  },

  syncCouponCount() {
    const freeCoupons = this.data.userInfo.freeCoupons || [];
    this.setData({ freeCouponCount: freeCoupons[this.data.serviceTypeIndex] || 0 });
  },

  switchRole() {
    const nextRole = this.data.userRole === 'demander' ? 'rider' : 'demander';
    
    if (nextRole === 'rider' && !this.data.userInfo.isVerified) {
      return wx.showToast({ title: '请先在"我的"页面完成实名认证', icon: 'none' });
    }

    app.globalData.userRole = nextRole;
    wx.setStorageSync('userRole', nextRole);
    this.refreshPage();
    wx.showToast({ title: nextRole === 'demander' ? '已切换为需求方' : '已切换为跑腿员', icon: 'none' });
  },

  chooseLocation() {
    // 优先用缓存的校区中心坐标打开地图，精确定位到校区范围
    const campusLat = wx.getStorageSync('campusLat');
    const campusLng = wx.getStorageSync('campusLng');
    const options = {
      success: (res) => {
        const addrParts = [res.name];
        if (res.address && res.address !== res.name) addrParts.push(res.address);
        this.setData({
          destination: addrParts.join(' - '),
          destinationLat: res.latitude,
          destinationLng: res.longitude
        });
      },
      fail: () => {
        wx.showToast({ title: '未选择地址', icon: 'none' });
      }
    };
    if (campusLat && campusLng) {
      options.latitude = campusLat;
      options.longitude = campusLng;
    }
    wx.chooseLocation(options);
  },

  selectHistoryAddress(e) {
    this.setData({
      destination: e.currentTarget.dataset.address,
      detailAddress: ''
    });
  },

  // 选择校内常用建筑（自动填入建筑坐标）
  selectBuilding(e) {
    const building = e.currentTarget.dataset.building;
    const school = this.data.currentSchool;
    const campus = this.data.currentCampus;
    const coord = getBuildingCoord(school, campus, building);
    const update = {
      destination: campus + ' - ' + building,
      detailAddress: ''
    };
    if (coord) {
      update.destinationLat = coord.lat;
      update.destinationLng = coord.lng;
    }
    this.setData(update);
  },

  submitOrder() {
    if (this.data.userRole !== 'demander') return wx.showToast({ title: '跑腿员身份不能下单', icon: 'none' });
    
    const { serviceTypeIndex, pickupCode, destination, detailAddress, contactName, contactPhone, amount, remark, userInfo } = this.data;

    // 组装最终地址
    const fullDestination = detailAddress.trim() ? `${destination} ${detailAddress}` : destination;

    if (!pickupCode.trim()) return wx.showToast({ title: '请填写取件信息', icon: 'none' });
    if (!fullDestination.trim()) return wx.showToast({ title: '请选择并完善送达地址', icon: 'none' });
    if (!contactName.trim()) return wx.showToast({ title: '请填写联系人', icon: 'none' });
    if (!contactPhone.trim()) return wx.showToast({ title: '请填写联系电话', icon: 'none' });
    
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) return wx.showToast({ title: '金额需大于 0', icon: 'none' });

    wx.showModal({
      title: '发布确认',
      content: `为符合微信运营规范，平台不代收资金。\n\n跑腿费 ¥${parsedAmount} 请在跑腿员送达后，通过微信转账或当面结算。`,
      confirmText: '我已知晓',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '安全检测中...' });
          setTimeout(() => { 
            wx.hideLoading(); 
            this.executeCreateOrder(serviceTypeIndex, pickupCode, fullDestination, parsedAmount, remark, userInfo, contactName, contactPhone); 
          }, 800);
        }
      }
    });
  },

  executeCreateOrder(serviceTypeIndex, pickupCode, fullDestination, parsedAmount, remark, userInfo, contactName, contactPhone) {
    const currentSchool = wx.getStorageSync('currentSchool') || '未知学校';
    const currentCampus = wx.getStorageSync('currentCampus') || '未知校区';

    let history = wx.getStorageSync('addressHistory') || [];
    history = history.filter(item => item !== fullDestination); 
    history.unshift(fullDestination); 
    if (history.length > 3) history = history.slice(0, 3); 
    wx.setStorageSync('addressHistory', history);

    const order = createOrder({ 
      serviceTypeIndex, 
      pickupCode, 
      destination: fullDestination, 
      amount: parsedAmount, 
      remark, 
      demanderName: contactName, 
      demanderStudentId: userInfo.studentId, 
      demanderPhone: contactPhone, 
      school: currentSchool, 
      campus: currentCampus 
    });
    
    const nextUserInfo = bumpServiceStats(userInfo, serviceTypeIndex);
    
    const orders = wx.getStorageSync('ordersList') || [];
    orders.unshift(order);
    
    app.globalData.userInfo = nextUserInfo;
    wx.setStorageSync('ordersList', orders); 
    wx.setStorageSync('userInfo', nextUserInfo);
    
    this.setData({ 
      userInfo: nextUserInfo, 
      pickupCode: '', 
      destination: '', 
      detailAddress: '',
      amount: '12.50', 
      remark: '' 
    });
    
    this.refreshPage(); 
    
    wx.showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => { wx.switchTab({ url: '/pages/orders/orders' }); }, 600);
  },

  acceptHallOrder(e) {
    if (this.data.userRole !== 'rider') return wx.showToast({ title: '请先切换到跑腿员', icon: 'none' });
    const orderId = String(e.currentTarget.dataset.id);
    const orders = wx.getStorageSync('ordersList') || [];
    const targetOrder = orders.find((item) => String(item.id) === orderId);
    if (!targetOrder || targetOrder.currentState !== 'pending') return this.refreshPage();
    
    const nextOrders = orders.map((item) => (String(item.id) === orderId ? acceptOrder(item, this.data.userInfo) : item));
    wx.setStorageSync('ordersList', nextOrders); 
    this.refreshPage();
    wx.showToast({ title: '接单成功', icon: 'success' });
  },

  goOrders() {
    wx.switchTab({ url: '/pages/orders/orders' });
  }
});