const test = require('node:test');
const assert = require('node:assert/strict');

const {
  CAMPUS_DATA,
  getSchoolNames,
  getCampusNames,
  getCampusCoords,
  getCampusBuildings,
  findNearestCampus,
  SERVICE_TYPES,
  STATE_TEXT_MAP,
  getDefaultUser,
  normalizeUser,
  createOrder,
  acceptOrder,
  updateOrderState,
  bumpServiceStats
} = require('../utils/order');

// ============== 校区数据测试 ==============

test('CAMPUS_DATA 包含 9 所高校', () => {
  assert.equal(getSchoolNames().length, 9);
});

test('getCampusNames 返回正确校区列表', () => {
  const campuses = getCampusNames('西安交通大学');
  assert.ok(campuses.includes('兴庆校区'));
  assert.ok(campuses.includes('中国西部科技创新港'));
});

test('getCampusCoords 返回经纬度', () => {
  const coord = getCampusCoords('延安大学', '杨家岭校区');
  assert.ok(coord);
  assert.ok(coord.lat > 36 && coord.lat < 37);
  assert.ok(coord.lng > 109 && coord.lng < 110);
});

test('getCampusCoords 不存在时返回 null', () => {
  assert.equal(getCampusCoords('不存在的大学', '不存在校区'), null);
});

test('getCampusBuildings 返回建筑列表', () => {
  const buildings = getCampusBuildings('西安交通大学', '兴庆校区');
  assert.ok(buildings.length > 0);
  assert.ok(buildings.includes('图书馆'));
});

test('findNearestCampus 能找到最近校区', () => {
  // 使用延安大学杨家岭校区附近的坐标
  const result = findNearestCampus(36.598, 109.489);
  assert.equal(result.school, '延安大学');
  assert.equal(result.campus, '杨家岭校区');
  assert.ok(result.distance < 500); // 500米以内
});

test('findNearestCampus 能区分不同城市的校区', () => {
  // 使用广州华南理工附近的坐标
  const result = findNearestCampus(23.156, 113.352);
  assert.equal(result.school, '华南理工大学');
  assert.equal(result.campus, '五山校区');
});

// ============== 原有测试 ==============

test('服务类型收敛为 5 个核心服务', () => {
  assert.deepEqual(
    SERVICE_TYPES.map((item) => item.title),
    ['代取快递', '代拿外卖', '代买餐饮', '代签到', '代排队']
  );
});

test('createOrder 会创建待接单订单', () => {
  const order = createOrder({
    serviceTypeIndex: 2,
    pickupCode: 'A-302',
    destination: '13号宿舍楼',
    amount: '16.8',
    remark: '到楼下联系',
    demanderName: '校园用户',
    demanderStudentId: '20240001',
    demanderPhone: '18800001111'
  });

  assert.equal(order.serviceTypeName, '代买餐饮');
  assert.equal(order.currentState, 'pending');
  assert.equal(order.demanderName, '校园用户');
  assert.equal(order.amount, 16.8);
  assert.equal(STATE_TEXT_MAP[order.currentState], '待接单');
});

test('acceptOrder 会把待接单订单分配给跑腿员', () => {
  const pendingOrder = createOrder({
    serviceTypeIndex: 0,
    pickupCode: '5-302',
    destination: '8号教学楼',
    amount: 12.5,
    remark: '',
    demanderName: '发布者',
    demanderStudentId: '20240001',
    demanderPhone: '18800001111'
  });

  const accepted = acceptOrder(pendingOrder, {
    nickName: '李明',
    studentId: '20245555'
  });

  assert.equal(accepted.currentState, 'accepted');
  assert.equal(accepted.riderName, '李明');
  assert.equal(accepted.riderStudentId, '20245555');
});

test('updateOrderState 会推进订单状态', () => {
  const order = createOrder({
    serviceTypeIndex: 1,
    pickupCode: 'WM-09',
    destination: '4号宿舍楼',
    amount: 15,
    remark: '',
    demanderName: '发布者',
    demanderStudentId: '20240001',
    demanderPhone: '18800001111'
  });

  const accepted = acceptOrder(order, {
    nickName: '李明',
    studentId: '20245555'
  });
  const picked = updateOrderState(accepted, 'picked');
  const delivered = updateOrderState(picked, 'delivered');

  assert.equal(picked.currentState, 'picked');
  assert.equal(delivered.currentState, 'delivered');
});

test('bumpServiceStats 每满 5 单累计一张免单券', () => {
  let userInfo = getDefaultUser();

  for (let i = 0; i < 5; i += 1) {
    userInfo = bumpServiceStats(userInfo, 0);
  }

  const normalized = normalizeUser(userInfo);

  assert.equal(normalized.orderCounts[0], 0);
  assert.equal(normalized.freeCoupons[0], 1);
});
