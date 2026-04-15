const app = getApp();
const { getDefaultUser, normalizeUser } = require('../../utils/order.js');

Page({
  data: {
    userInfo: getDefaultUser(),
    userRole: 'demander',
    riderStats: { totalOrders: 0, goodReviews: 0, averageRating: '5.0' },
    // 学信网认证表单
    chsiModalVisible: false,
    chsiStep: 1,       // 1=填信息 2=验证中 3=结果
    chsiForm: { realName: '', studentId: '', idCard: '', school: '' },
    chsiResult: null    // { success, msg }
  },

  onShow() {
    const userInfo = normalizeUser(app.globalData.userInfo || wx.getStorageSync('userInfo'));
    const userRole = app.globalData.userRole || wx.getStorageSync('userRole') || 'demander';
    
    // 动态计算跑腿成绩
    const allOrders = wx.getStorageSync('ordersList') || [];
    const myRiderOrders = allOrders.filter(o => o.riderStudentId === userInfo.studentId && o.currentState === 'rated');
    const totalOrders = myRiderOrders.length;
    const goodReviews = myRiderOrders.filter(o => Number(o.rating || 5) >= 4).length;
    const averageRating = totalOrders > 0 
      ? (myRiderOrders.reduce((acc, o) => acc + Number(o.rating || 5), 0) / totalOrders).toFixed(1) 
      : '5.0';

    app.globalData.userInfo = userInfo; 
    app.globalData.userRole = userRole;
    wx.setStorageSync('userInfo', userInfo); 
    wx.setStorageSync('userRole', userRole);
    
    this.setData({ userInfo, userRole, riderStats: { totalOrders, goodReviews, averageRating } });
  },

  // 获取微信头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    
    wx.showLoading({ title: '保存中...' });
    
    setTimeout(() => {
      let user = this.data.userInfo;
      user.avatarUrl = avatarUrl; 
      
      this.setData({ userInfo: user });
      app.globalData.userInfo = user;
      wx.setStorageSync('userInfo', user);
      
      wx.hideLoading();
      wx.showToast({ title: '头像更新成功', icon: 'success' });
    }, 600);
  },

  switchRole() {
    const nextRole = this.data.userRole === 'demander' ? 'rider' : 'demander';
    
    if (nextRole === 'rider' && !this.data.userInfo.isVerified) {
      wx.showModal({
        title: '跑腿员认证', 
        content: '为保障校园安全，成为跑腿员需进行身份核实。(点击确定模拟人工审核通过)',
        confirmText: '去认证',
        success: (res) => {
          if (res.confirm) {
            wx.showLoading({ title: '核实中...' });
            setTimeout(() => {
              let user = this.data.userInfo; 
              user.isVerified = true;
              wx.setStorageSync('userInfo', user); 
              this.setData({ userInfo: user });
              wx.hideLoading(); wx.showToast({ title: '认证成功' });
            }, 1000);
          }
        }
      });
      return;
    }
    app.globalData.userRole = nextRole;
    wx.setStorageSync('userRole', nextRole);
    this.setData({ userRole: nextRole });
    wx.showToast({ title: nextRole === 'demander' ? '已切换为需求方' : '已切换为跑腿员', icon: 'none' });
  },

  editField(e) {
    const field = e.currentTarget.dataset.field;
    const fieldNameMap = { 
      nickName: '昵称', birthday: '生日', 
      phoneNumber: '手机号', studentId: '学号', idCard: '身份证号' 
    };

    const restrictedFields = {
      phoneNumber: 'lastModifiedPhone',
      studentId: 'lastModifiedStudentId',
      idCard: 'lastModifiedIdCard'
    };

    if (restrictedFields[field]) {
      const lastModifiedTime = this.data.userInfo[restrictedFields[field]] || 0;
      const now = Date.now();
      const threeMonthsInMs = 90 * 24 * 60 * 60 * 1000; 

      if (lastModifiedTime !== 0 && (now - lastModifiedTime < threeMonthsInMs)) {
        const daysLeft = Math.ceil((threeMonthsInMs - (now - lastModifiedTime)) / (1000 * 60 * 60 * 24));
        return wx.showModal({
          title: '修改受限',
          content: `出于安全考虑，【${fieldNameMap[field]}】每3个月仅能修改一次。\n\n距离下次可修改还剩 ${daysLeft} 天。`,
          showCancel: false,
          confirmText: '我知道了'
        });
      }
    }

    wx.showModal({
      title: `修改${fieldNameMap[field]}`,
      editable: true,
      placeholderText: `请输入新的${fieldNameMap[field]}`,
      success: (res) => {
        if (!res.confirm) return;
        const value = (res.content || '').trim();
        if (!value) return wx.showToast({ title: '内容不能为空', icon: 'none' });

        const userInfo = { ...this.data.userInfo, [field]: value };
        if (restrictedFields[field]) {
          userInfo[restrictedFields[field]] = Date.now();
        }

        this.setData({ userInfo });
        app.globalData.userInfo = userInfo;
        wx.setStorageSync('userInfo', userInfo);
        wx.showToast({ title: '保存成功', icon: 'success' });
      }
    });
  },

  // ============== 学信网认证 ==============
  openChsiModal() {
    if (this.data.userInfo.chsiVerified) {
      return wx.showToast({ title: '你已通过学信网认证', icon: 'none' });
    }
    const userInfo = this.data.userInfo;
    this.setData({
      chsiModalVisible: true,
      chsiStep: 1,
      chsiResult: null,
      chsiForm: {
        realName: userInfo.chsiRealName || '',
        studentId: userInfo.studentId || '',
        idCard: userInfo.idCard || '',
        school: wx.getStorageSync('currentSchool') || ''
      }
    });
  },

  closeChsiModal() {
    this.setData({ chsiModalVisible: false });
  },

  onChsiInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ ['chsiForm.' + field]: e.detail.value });
  },

  submitChsiVerify() {
    const { realName, studentId, idCard, school } = this.data.chsiForm;
    if (!realName.trim()) return wx.showToast({ title: '请输入真实姓名', icon: 'none' });
    if (!studentId.trim()) return wx.showToast({ title: '请输入学号', icon: 'none' });
    if (!idCard.trim() || idCard.trim().length < 15) return wx.showToast({ title: '请输入正确的身份证号', icon: 'none' });
    if (!school.trim()) return wx.showToast({ title: '请输入就读院校', icon: 'none' });

    // 进入验证中状态
    this.setData({ chsiStep: 2 });

    // 模拟学信网 API 校验（实际项目中替换为服务端调用学信网接口）
    setTimeout(() => {
      // 模拟规则：身份证号长度 18 位且学号非空 → 通过
      const passed = idCard.trim().length === 18;

      if (passed) {
        const userInfo = {
          ...this.data.userInfo,
          chsiVerified: true,
          chsiRealName: realName.trim(),
          chsiSchool: school.trim(),
          chsiMajor: '（学信网返回专业）',
          chsiLevel: '本科',
          chsiVerifiedAt: Date.now(),
          studentId: studentId.trim(),
          idCard: idCard.trim(),
          isVerified: true
        };
        this.setData({ userInfo, chsiStep: 3, chsiResult: { success: true, msg: '学信网学籍核验通过' } });
        app.globalData.userInfo = userInfo;
        wx.setStorageSync('userInfo', userInfo);
      } else {
        this.setData({ chsiStep: 3, chsiResult: { success: false, msg: '学信网核验未通过，请检查身份证号是否为18位' } });
      }
    }, 2000);
  },

  resetUserData() {
    wx.showModal({
      title: '重置资料', 
      content: '确认恢复为默认信息吗？历史累计数据将被清除。',
      success: (res) => {
        if (!res.confirm) return;
        const userInfo = getDefaultUser();
        app.globalData.userInfo = userInfo; 
        wx.setStorageSync('userInfo', userInfo);
        this.setData({ userInfo }); 
        wx.showToast({ title: '已重置', icon: 'success' });
      }
    });
  }
});