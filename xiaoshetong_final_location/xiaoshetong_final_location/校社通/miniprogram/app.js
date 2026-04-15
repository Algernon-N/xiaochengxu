const { getDefaultUser, normalizeUser } = require('./utils/order.js');

App({
  globalData: {
    userInfo: null,
    userRole: 'demander'
  },

  onLaunch() {
    // 【上线必配】：初始化微信云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // 【必填】：点击开发者工具顶部的“云开发”按钮，开通后会得到一个“环境ID”
        // 将下面这个字符串替换成你的真实环境 ID，例如 'xiaoshetong-8a9b2c'
        env: 'YOUR-CLOUD-ENV-ID', 
        traceUser: true,
      });
    }

    // 本地缓存兜底逻辑 (云开发接入前期，先用本地缓存保证程序能跑)
    const storedUser = wx.getStorageSync('userInfo');
    const userRole = wx.getStorageSync('userRole') || 'demander';
    const userInfo = storedUser ? normalizeUser(storedUser) : getDefaultUser();

    this.globalData.userInfo = userInfo;
    this.globalData.userRole = userRole;

    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('userRole', userRole);
  }
});