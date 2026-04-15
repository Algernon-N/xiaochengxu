const app = getApp();
const { SERVICE_TYPES, STATE_TEXT_MAP, getDefaultUser, normalizeUser, getIncome, CAMPUS_DATA, getSchoolNames, getCampusNames, getCampusCoords, findNearestCampus } = require('../../utils/order.js');

Page({
  data: {
    userInfo: getDefaultUser(),
    userRole: 'demander',
    serviceCards: SERVICE_TYPES,
    roleHeadline: '', primaryTitle: '', primaryDesc: '', switchRoleText: '',
    latestOrder: null, latestOrderStateText: '暂无订单', latestRiderIncomeText: '0.00',
    pendingCount: 0, activeCount: 0,
    region: [], schoolRange: [], schoolIndex: [],
    locating: false, locationTip: '', liveMode: false,
    gpsLat: '', gpsLng: '', gpsAccuracy: ''
  },

  onLoad() {
    this.initLocation();
  },

  onShow() {
    this.refreshPage();
    // 如果实时定位已开启，重新启动（从其他 tab 切回时）
    if (this.data.liveMode) {
      this._startLiveLocation();
    }
  },

  onHide() {
    // 离开页面时停止实时定位，节省电量
    this._stopLiveLocation();
  },

  onUnload() {
    this._stopLiveLocation();
  },

  // 初始化并读取上次缓存的定位
  initLocation() {
    let schoolIndex = wx.getStorageSync('schoolIndex');
    let region = wx.getStorageSync('region');

    if (!schoolIndex) schoolIndex = [0, 0];
    if (!region) region = ['陕西省', '西安市', '雁塔区'];

    const schoolKeys = getSchoolNames();
    let selectedSchool = schoolKeys[schoolIndex[0]];
    if (!selectedSchool) {
      selectedSchool = schoolKeys[0];
      schoolIndex = [0, 0];
    }
    const schoolRange = [schoolKeys, getCampusNames(selectedSchool)];

    this.setData({ region, schoolIndex, schoolRange });

    // 全局缓存当前选中的学校、校区和坐标
    this._saveCurrentCampus(selectedSchool, schoolRange[1][schoolIndex[1]]);

    // 首次打开 / 无缓存坐标时自动 GPS 定位
    if (!wx.getStorageSync('gpsLat')) {
      this.autoDetectLocation();
    }
  },

  // 单次 GPS 定位（首次进入 / 手动点击）
  autoDetectLocation() {
    this.setData({ locating: true, locationTip: '正在获取高精度定位...' });
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      needFullAccuracy: true,
      highAccuracyExpireTime: 8000,
      success: (res) => {
        this._applyGps(res.latitude, res.longitude, res.accuracy);
      },
      fail: (err) => {
        // 高精度失败时降级为普通定位
        wx.getLocation({
          type: 'gcj02',
          success: (res) => {
            this._applyGps(res.latitude, res.longitude, res.accuracy);
          },
          fail: () => {
            this.setData({ locating: false, locationTip: '定位失败，请检查GPS和定位权限后重试' });
          }
        });
      }
    });
  },

  // 开启 / 关闭实时定位
  toggleLiveLocation() {
    if (this.data.liveMode) {
      this._stopLiveLocation();
      this.setData({ liveMode: false, locationTip: '实时定位已关闭' });
      wx.showToast({ title: '实时定位已关闭', icon: 'none' });
    } else {
      this.setData({ liveMode: true });
      this._startLiveLocation();
    }
  },

  _startLiveLocation() {
    this.setData({ locating: true, locationTip: '实时高精度定位开启中...' });
    wx.startLocationUpdate({
      type: 'gcj02',
      needFullAccuracy: true,
      isHighAccuracy: true,
      highAccuracyExpireTime: 5000,
      success: () => {
        wx.onLocationChange((res) => {
          this._applyGps(res.latitude, res.longitude, res.accuracy);
        });
      },
      fail: (err) => {
        console.error('startLocationUpdate fail', err);
        this.setData({ locating: false, liveMode: false, locationTip: '实时定位启动失败，请检查GPS和定位权限' });
      }
    });
  },

  _stopLiveLocation() {
    wx.stopLocationUpdate({
      success() {},
      fail() {}
    });
    wx.offLocationChange();
  },

  // 统一处理 GPS 坐标 → 匹配最近校区 → 刷新页面
  _applyGps(latitude, longitude, accuracy) {
    wx.setStorageSync('gpsLat', latitude);
    wx.setStorageSync('gpsLng', longitude);

    const nearest = findNearestCampus(latitude, longitude);
    const schoolKeys = getSchoolNames();
    const schoolIdx = schoolKeys.indexOf(nearest.school);
    const campuses = getCampusNames(nearest.school);
    const campusIdx = campuses.indexOf(nearest.campus);

    const accText = accuracy ? Math.round(accuracy) + 'm' : '--';

    if (schoolIdx >= 0 && campusIdx >= 0) {
      const schoolRange = [schoolKeys, campuses];
      const schoolIndex = [schoolIdx, campusIdx];
      this.setData({ schoolRange, schoolIndex });
      wx.setStorageSync('schoolIndex', schoolIndex);
      this._saveCurrentCampus(nearest.school, nearest.campus);

      const distText = nearest.distance > 1000
        ? (nearest.distance / 1000).toFixed(1) + 'km'
        : nearest.distance + 'm';
      const liveTag = this.data.liveMode ? '[实时] ' : '';
      this.setData({
        locating: false,
        gpsLat: latitude.toFixed(6),
        gpsLng: longitude.toFixed(6),
        gpsAccuracy: accText,
        locationTip: liveTag + nearest.school + ' ' + nearest.campus + '  距离' + distText + '  精度±' + accText
      });
      this.refreshPage();
    } else {
      this.setData({ locating: false, gpsAccuracy: accText, locationTip: '未匹配到校区(精度±' + accText + ')，请手动选择' });
    }
  },

  // 将当前校区信息及坐标存入缓存
  _saveCurrentCampus(school, campus) {
    wx.setStorageSync('currentSchool', school);
    wx.setStorageSync('currentCampus', campus);
    const coord = getCampusCoords(school, campus);
    if (coord) {
      wx.setStorageSync('campusLat', coord.lat);
      wx.setStorageSync('campusLng', coord.lng);
    }
  },

  bindRegionChange(e) {
    this.setData({ region: e.detail.value });
    wx.setStorageSync('region', e.detail.value);
  },

  bindSchoolChange(e) {
    const val = e.detail.value;
    this.setData({ schoolIndex: val });
    wx.setStorageSync('schoolIndex', val);

    const school = this.data.schoolRange[0][val[0]];
    const campus = this.data.schoolRange[1][val[1]];
    this._saveCurrentCampus(school, campus);

    // 切换校区后刷新首页数据
    this.refreshPage();
  },

  bindSchoolColumnChange(e) {
    const data = { schoolRange: this.data.schoolRange, schoolIndex: this.data.schoolIndex };
    data.schoolIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      const selectedSchool = data.schoolRange[0][e.detail.value];
      data.schoolRange[1] = getCampusNames(selectedSchool);
      data.schoolIndex[1] = 0;
    }
    this.setData(data);
  },

  refreshPage() {
    const userInfo = normalizeUser(app.globalData.userInfo || wx.getStorageSync('userInfo'));
    const userRole = app.globalData.userRole || wx.getStorageSync('userRole') || 'demander';
    const orders = wx.getStorageSync('ordersList') || [];
    
    // 首页的最新订单和统计，也只看本校区的
    const currentSchool = wx.getStorageSync('currentSchool');
    const currentCampus = wx.getStorageSync('currentCampus');
    const campusOrders = orders.filter(o => o.school === currentSchool && o.campus === currentCampus);

    const latestOrder = campusOrders.length ? { ...campusOrders[0], stateText: STATE_TEXT_MAP[campusOrders[0].currentState] || '待处理' } : null;
    const income = latestOrder ? getIncome(latestOrder.amount) : getIncome(0);

    app.globalData.userInfo = userInfo;
    app.globalData.userRole = userRole;

    this.setData({
      userInfo, userRole, latestOrder,
      latestOrderStateText: latestOrder ? latestOrder.stateText : '暂无订单',
      latestRiderIncomeText: income.riderIncome.toFixed(2),
      pendingCount: campusOrders.filter((item) => item.currentState === 'pending').length,
      activeCount: campusOrders.filter((item) => ['accepted', 'picked', 'delivered', 'confirmed'].includes(item.currentState)).length,
      roleHeadline: userRole === 'demander' ? '校园任务一键发布' : '跑腿大厅实时接单',
      primaryTitle: userRole === 'demander' ? '快速发布任务' : '进入接单大厅',
      primaryDesc: userRole === 'demander' ? '五大场景一键直达。' : '待接订单统一收口。',
      switchRoleText: userRole === 'demander' ? '切到跑腿' : '切到需求'
    });
  },

  switchRole() {
    const nextRole = this.data.userRole === 'demander' ? 'rider' : 'demander';
    app.globalData.userRole = nextRole;
    wx.setStorageSync('userRole', nextRole);
    this.refreshPage();
    wx.showToast({ title: nextRole === 'demander' ? '已切换为需求方' : '已切换为跑腿员', icon: 'none' });
  },
  goService(e) {
    wx.setStorageSync('selectedServiceTypeIndex', Number(e.currentTarget.dataset.index || 0));
    wx.switchTab({ url: '/pages/placeOrder/placeOrder' });
  },
  goPlacePage() { wx.switchTab({ url: '/pages/placeOrder/placeOrder' }); },
  goOrders() { wx.switchTab({ url: '/pages/orders/orders' }); }
});