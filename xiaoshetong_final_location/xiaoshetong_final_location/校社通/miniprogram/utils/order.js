// ============== 校区数据（含经纬度 + 常用地点） ==============
var CAMPUS_DATA = {
  '延安大学': {
    campuses: ['杨家岭校区', '新城校区'],
    coords: {
      '杨家岭校区': { lat: 36.5983, lng: 109.4893 },
      '新城校区':   { lat: 36.5852, lng: 109.4941 }
    },
    buildings: {
      '杨家岭校区': ['1号教学楼', '图书馆', '学生一食堂', '学生二食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '6号宿舍楼', '快递驿站', '校医院', '体育馆'],
      '新城校区':   ['主教学楼', '实验楼', '学生公寓A栋', '学生公寓B栋', '学生公寓C栋', '学生公寓D栋', '食堂', '校医院', '行政楼']
    }
  },
  '西安交通大学': {
    campuses: ['兴庆校区', '雁塔校区', '曲江校区', '中国西部科技创新港'],
    coords: {
      '兴庆校区': { lat: 34.2571, lng: 108.9903 },
      '雁塔校区': { lat: 34.2268, lng: 108.9422 },
      '曲江校区': { lat: 34.1982, lng: 108.9641 },
      '中国西部科技创新港': { lat: 34.1533, lng: 108.7651 }
    },
    buildings: {
      '兴庆校区': ['主楼', '教学二楼', '图书馆', '康桥苑食堂', '东区食堂', '东1舍', '东2舍', '东3舍', '东4舍', '东5舍', '西1舍', '西2舍', '西3舍', '菜鸟驿站', '校医院'],
      '雁塔校区': ['教学主楼', '财经学院', '学生食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递点'],
      '曲江校区': ['A教学楼', 'B教学楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递中心'],
      '中国西部科技创新港': ['涵英楼', '致远楼', '19号巨构', '23号巨构', '西食堂', '东食堂', '19-1宿舍', '19-2宿舍', '19-3宿舍', '23-1宿舍', '23-2宿舍', '23-3宿舍', '快递中心', '校医院']
    }
  },
  '西北大学': {
    campuses: ['太白校区', '桃园校区', '长安校区'],
    coords: {
      '太白校区': { lat: 34.2493, lng: 108.9201 },
      '桃园校区': { lat: 34.2601, lng: 108.9322 },
      '长安校区': { lat: 34.0100, lng: 108.8983 }
    },
    buildings: {
      '太白校区': ['文博楼', '图书馆', '学生食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站'],
      '桃园校区': ['教学楼', '实验楼', '食堂', '桃园1号楼', '桃园2号楼', '桃园3号楼', '校门快递点'],
      '长安校区': ['教学1号楼', '教学2号楼', '图书馆', '一食堂', '二食堂', '柳园1号楼', '柳园2号楼', '柳园3号楼', '桃园1号楼', '桃园2号楼', '桃园3号楼', '快递中心']
    }
  },
  '陕西师范大学': {
    campuses: ['雁塔校区', '长安校区'],
    coords: {
      '雁塔校区': { lat: 34.2251, lng: 108.9601 },
      '长安校区': { lat: 34.0190, lng: 108.9302 }
    },
    buildings: {
      '雁塔校区': ['文渊楼', '图书馆', '学生食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '体育馆'],
      '长安校区': ['文津楼', '文汇楼', '图书馆', '阳光苑食堂', '紫月苑食堂', '阳光苑1号楼', '阳光苑2号楼', '阳光苑3号楼', '紫月苑1号楼', '紫月苑2号楼', '紫月苑3号楼', '菜鸟驿站']
    }
  },
  '长安大学': {
    campuses: ['渭水校区', '雁塔校区'],
    coords: {
      '渭水校区': { lat: 34.3821, lng: 108.9553 },
      '雁塔校区': { lat: 34.2361, lng: 108.9393 }
    },
    buildings: {
      '渭水校区': ['逸夫楼', '图书馆', '北苑食堂', '南苑食堂', '修远1号楼', '修远2号楼', '修远3号楼', '明远1号楼', '明远2号楼', '明远3号楼', '快递中心'],
      '雁塔校区': ['教学主楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '校门快递点']
    }
  },
  '西北工业大学': {
    campuses: ['友谊校区', '长安校区'],
    coords: {
      '友谊校区': { lat: 34.2441, lng: 108.9162 },
      '长安校区': { lat: 34.0342, lng: 108.7671 }
    },
    buildings: {
      '友谊校区': ['教学西楼', '图书馆', '翱翔食堂', '海天苑', '公寓1号楼', '公寓2号楼', '公寓3号楼', '公寓4号楼', '公寓5号楼', '快递站'],
      '长安校区': ['教学东楼', '翱翔体育馆', '启翔食堂', '星天苑', '星天苑1号楼', '星天苑2号楼', '星天苑3号楼', '星天苑4号楼', '星天苑5号楼', '星天苑6号楼', '菜鸟驿站']
    }
  },
  '华南理工大学': {
    campuses: ['五山校区', '大学城校区', '广州国际校区'],
    coords: {
      '五山校区':     { lat: 23.1561, lng: 113.3521 },
      '大学城校区':   { lat: 23.0432, lng: 113.3971 },
      '广州国际校区': { lat: 23.0383, lng: 113.3952 }
    },
    buildings: {
      '五山校区':     ['1号楼', '图书馆', '西湖苑食堂', '芷园食堂', '东1宿舍', '东2宿舍', '东3宿舍', '西1宿舍', '西2宿舍', '西3宿舍', '快递中心'],
      '大学城校区':   ['A教学楼', 'B教学楼', '图书馆', '第一食堂', '第二食堂', 'A1宿舍', 'A2宿舍', 'A3宿舍', 'B1宿舍', 'B2宿舍', 'B3宿舍', '菜鸟驿站'],
      '广州国际校区': ['教学楼', 'D1栋', '食堂', 'C1宿舍', 'C2宿舍', 'C3宿舍', 'C4宿舍', '快递柜']
    }
  },
  '中山大学': {
    campuses: ['广州校区南校园', '广州校区东校园', '珠海校区', '深圳校区'],
    coords: {
      '广州校区南校园': { lat: 23.0972, lng: 113.2983 },
      '广州校区东校园': { lat: 23.0611, lng: 113.3942 },
      '珠海校区':       { lat: 22.3581, lng: 113.5791 },
      '深圳校区':       { lat: 22.6162, lng: 114.0123 }
    },
    buildings: {
      '广州校区南校园': ['永芳堂', '图书馆', '第一食堂', '第二食堂', '明辨园1号', '明辨园2号', '明辨园3号', '至善园1号', '至善园2号', '快递驿站'],
      '广州校区东校园': ['教学楼', '图书馆', '饭堂', '1号宿舍', '2号宿舍', '3号宿舍', '4号宿舍', '快递点'],
      '珠海校区':       ['教学楼群', '图书馆', '榕园食堂', '梅园食堂', '榕园1号楼', '榕园2号楼', '梅园1号楼', '梅园2号楼', '快递中心'],
      '深圳校区':       ['教学楼', '图书馆', '荔园食堂', '荔园1号楼', '荔园2号楼', '荔园3号楼', '快递站']
    }
  },
  '暨南大学': {
    campuses: ['石牌校区', '番禺校区', '广园东校区'],
    coords: {
      '石牌校区':   { lat: 23.1331, lng: 113.3471 },
      '番禺校区':   { lat: 23.0362, lng: 113.3581 },
      '广园东校区': { lat: 23.1491, lng: 113.4201 }
    },
    buildings: {
      '石牌校区':   ['教学楼', '图书馆', '第一食堂', '真如1栋', '真如2栋', '真如3栋', '金陵1栋', '金陵2栋', '快递站', '校医院'],
      '番禺校区':   ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '菜鸟驿站'],
      '广园东校区': ['主楼', '食堂', '1号宿舍', '2号宿舍', '3号宿舍', '快递点']
    }
  },

  // ==================== 陕西（补充） ====================
  '西安电子科技大学': {
    campuses: ['南校区', '北校区'],
    coords: {
      '南校区': { lat: 34.1251, lng: 108.8361 },
      '北校区': { lat: 34.2341, lng: 108.9221 }
    },
    buildings: {
      '南校区': ['信远楼', 'E楼教学区', '图书馆', '竹园餐厅', '海棠餐厅', '竹园1号楼', '竹园2号楼', '竹园3号楼', '竹园4号楼', '海棠1号楼', '海棠2号楼', '海棠3号楼', '海棠4号楼', '丁香1号楼', '丁香2号楼', '菜鸟驿站', '校医院'],
      '北校区': ['主楼', '教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递点']
    }
  },
  '西北农林科技大学': {
    campuses: ['南校区', '北校区'],
    coords: {
      '南校区': { lat: 34.2641, lng: 108.0771 },
      '北校区': { lat: 34.2711, lng: 108.0691 }
    },
    buildings: {
      '南校区': ['教学楼群', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '快递驿站', '体育馆'],
      '北校区': ['农学院', '实验楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '西安建筑科技大学': {
    campuses: ['雁塔校区', '草堂校区'],
    coords: {
      '雁塔校区': { lat: 34.2131, lng: 108.9631 },
      '草堂校区': { lat: 34.0581, lng: 108.6471 }
    },
    buildings: {
      '雁塔校区': ['教学主楼', '图书馆', '北院食堂', '南院食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站'],
      '草堂校区': ['紫阁楼', '图书馆', '第一食堂', '第二食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '5号公寓', '6号公寓', '菜鸟驿站']
    }
  },
  '西安理工大学': {
    campuses: ['金花校区', '曲江校区'],
    coords: {
      '金花校区': { lat: 34.2591, lng: 108.9961 },
      '曲江校区': { lat: 34.1961, lng: 108.9691 }
    },
    buildings: {
      '金花校区': ['教学主楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站'],
      '曲江校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '5号公寓', '菜鸟驿站', '体育馆']
    }
  },
  '陕西科技大学': {
    campuses: ['未央校区', '咸阳校区'],
    coords: {
      '未央校区': { lat: 34.3701, lng: 108.8981 },
      '咸阳校区': { lat: 34.3381, lng: 108.7071 }
    },
    buildings: {
      '未央校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '快递中心', '体育馆'],
      '咸阳校区': ['教学楼', '实验楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '西安科技大学': {
    campuses: ['临潼校区', '雁塔校区'],
    coords: {
      '临潼校区': { lat: 34.3681, lng: 109.1831 },
      '雁塔校区': { lat: 34.2181, lng: 108.9501 }
    },
    buildings: {
      '临潼校区': ['教学主楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '菜鸟驿站', '体育场'],
      '雁塔校区': ['教学楼', '实验楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安邮电大学': {
    campuses: ['长安校区', '雁塔校区'],
    coords: {
      '长安校区': { lat: 34.0131, lng: 108.9121 },
      '雁塔校区': { lat: 34.2311, lng: 108.9551 }
    },
    buildings: {
      '长安校区': ['教学楼', '图书馆', '东区食堂', '西区食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '5号公寓', '快递驿站', '体育馆'],
      '雁塔校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安外国语大学': {
    campuses: ['长安校区', '雁塔校区'],
    coords: {
      '长安校区': { lat: 34.0131, lng: 108.9061 },
      '雁塔校区': { lat: 34.2191, lng: 108.9591 }
    },
    buildings: {
      '长安校区': ['教学楼群', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '5号公寓', '快递站', '体育馆'],
      '雁塔校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西北政法大学': {
    campuses: ['长安校区', '雁塔校区'],
    coords: {
      '长安校区': { lat: 34.0201, lng: 108.9051 },
      '雁塔校区': { lat: 34.2191, lng: 108.9631 }
    },
    buildings: {
      '长安校区': ['教学楼', '图书馆', '天平楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '菜鸟驿站'],
      '雁塔校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递点']
    }
  },
  '西安工程大学': {
    campuses: ['临潼校区', '金花校区'],
    coords: {
      '临潼校区': { lat: 34.3771, lng: 109.1891 },
      '金花校区': { lat: 34.2591, lng: 108.9991 }
    },
    buildings: {
      '临潼校区': ['教学主楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站'],
      '金花校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安工业大学': {
    campuses: ['未央校区', '金花校区'],
    coords: {
      '未央校区': { lat: 34.3651, lng: 108.9081 },
      '金花校区': { lat: 34.2601, lng: 108.9951 }
    },
    buildings: {
      '未央校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '快递中心', '体育场'],
      '金花校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安石油大学': {
    campuses: ['鄠邑校区', '雁塔校区'],
    coords: {
      '鄠邑校区': { lat: 34.1071, lng: 108.5961 },
      '雁塔校区': { lat: 34.2101, lng: 108.9511 }
    },
    buildings: {
      '鄠邑校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '体育馆'],
      '雁塔校区': ['教学楼', '实验楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '陕西中医药大学': {
    campuses: ['南校区', '北校区'],
    coords: {
      '南校区': { lat: 34.2851, lng: 108.7801 },
      '北校区': { lat: 34.3391, lng: 108.7101 }
    },
    buildings: {
      '南校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '中医药博物馆'],
      '北校区': ['教学楼', '实验楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '西安财经大学': {
    campuses: ['长安校区', '翠华路校区'],
    coords: {
      '长安校区': { lat: 34.0031, lng: 108.9081 },
      '翠华路校区': { lat: 34.2241, lng: 108.9661 }
    },
    buildings: {
      '长安校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '菜鸟驿站'],
      '翠华路校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安文理学院': {
    campuses: ['高新校区', '太白校区'],
    coords: {
      '高新校区': { lat: 34.1921, lng: 108.8621 },
      '太白校区': { lat: 34.2481, lng: 108.9191 }
    },
    buildings: {
      '高新校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '太白校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '渭南师范学院': {
    campuses: ['朝阳校区', '富平校区'],
    coords: {
      '朝阳校区': { lat: 34.5061, lng: 109.5031 },
      '富平校区': { lat: 34.7481, lng: 109.1581 }
    },
    buildings: {
      '朝阳校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站'],
      '富平校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '宝鸡文理学院': {
    campuses: ['高新校区', '石鼓校区'],
    coords: {
      '高新校区': { lat: 34.3501, lng: 107.1701 },
      '石鼓校区': { lat: 34.3771, lng: 107.1381 }
    },
    buildings: {
      '高新校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育馆'],
      '石鼓校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '咸阳师范学院': {
    campuses: ['渭城校区', '秦都校区'],
    coords: {
      '渭城校区': { lat: 34.3671, lng: 108.7061 },
      '秦都校区': { lat: 34.3281, lng: 108.6771 }
    },
    buildings: {
      '渭城校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站'],
      '秦都校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '榆林学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 38.2881, lng: 109.7281 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育场']
    }
  },
  '安康学院': {
    campuses: ['江南校区', '江北校区'],
    coords: {
      '江南校区': { lat: 32.6751, lng: 109.0241 },
      '江北校区': { lat: 32.6881, lng: 109.0221 }
    },
    buildings: {
      '江南校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '江北校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '商洛学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 33.8701, lng: 109.9191 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  },
  '西安医学院': {
    campuses: ['未央校区', '含光校区'],
    coords: {
      '未央校区': { lat: 34.3751, lng: 108.8931 },
      '含光校区': { lat: 34.2351, lng: 108.9381 }
    },
    buildings: {
      '未央校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站', '实验楼'],
      '含光校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '西安航空学院': {
    campuses: ['沣惠校区', '阎良校区'],
    coords: {
      '沣惠校区': { lat: 34.2481, lng: 108.8811 },
      '阎良校区': { lat: 34.6441, lng: 109.2291 }
    },
    buildings: {
      '沣惠校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '阎良校区': ['教学楼', '实验楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '西京学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 34.0091, lng: 108.8571 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育馆']
    }
  },
  '西安欧亚学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 34.1501, lng: 109.0211 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站']
    }
  },
  '西安培华学院': {
    campuses: ['长安校区', '高新校区'],
    coords: {
      '长安校区': { lat: 34.0161, lng: 108.9541 },
      '高新校区': { lat: 34.1941, lng: 108.8541 }
    },
    buildings: {
      '长安校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '高新校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '西安翻译学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 34.0141, lng: 108.8261 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育场']
    }
  },

  // ==================== 甘肃 ====================
  '兰州大学': {
    campuses: ['城关校区', '榆中校区'],
    coords: {
      '城关校区': { lat: 36.0461, lng: 103.8601 },
      '榆中校区': { lat: 35.8571, lng: 104.1151 }
    },
    buildings: {
      '城关校区': ['逸夫科学馆', '图书馆', '丹桂苑食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '校医院'],
      '榆中校区': ['天山堂', '昆仑堂', '图书馆', '视野食堂', '丹桂苑', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '5号公寓', '6号公寓', '菜鸟驿站']
    }
  },
  '兰州理工大学': {
    campuses: ['兰工坪校区', '彭家坪校区'],
    coords: {
      '兰工坪校区': { lat: 36.0501, lng: 103.8141 },
      '彭家坪校区': { lat: 36.0231, lng: 103.7451 }
    },
    buildings: {
      '兰工坪校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '彭家坪校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '菜鸟驿站', '体育馆']
    }
  },
  '兰州交通大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 36.0781, lng: 103.7401 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '天佑会堂', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育场']
    }
  },
  '甘肃农业大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 36.0901, lng: 103.7031 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '实验田']
    }
  },
  '西北师范大学': {
    campuses: ['本部', '知行学院'],
    coords: {
      '本部': { lat: 36.0941, lng: 103.7281 },
      '知行学院': { lat: 36.1071, lng: 103.6601 }
    },
    buildings: {
      '本部': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '体育馆'],
      '知行学院': ['教学楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '西北民族大学': {
    campuses: ['城关校区', '榆中校区'],
    coords: {
      '城关校区': { lat: 36.0491, lng: 103.8311 },
      '榆中校区': { lat: 35.8751, lng: 104.1351 }
    },
    buildings: {
      '城关校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '榆中校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '菜鸟驿站']
    }
  },
  '甘肃中医药大学': {
    campuses: ['和平校区', '定西校区'],
    coords: {
      '和平校区': { lat: 36.0911, lng: 103.7111 },
      '定西校区': { lat: 35.5801, lng: 104.6261 }
    },
    buildings: {
      '和平校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '定西校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '甘肃政法大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 36.0891, lng: 103.7201 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '模拟法庭']
    }
  },
  '兰州财经大学': {
    campuses: ['段家滩校区', '和平校区'],
    coords: {
      '段家滩校区': { lat: 36.0561, lng: 103.8901 },
      '和平校区': { lat: 36.0891, lng: 103.7141 }
    },
    buildings: {
      '段家滩校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '和平校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '菜鸟驿站']
    }
  },
  '兰州城市学院': {
    campuses: ['本部', '培黎校区'],
    coords: {
      '本部': { lat: 36.0601, lng: 103.8381 },
      '培黎校区': { lat: 36.0741, lng: 103.7701 }
    },
    buildings: {
      '本部': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '培黎校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '天水师范学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 34.5681, lng: 105.7401 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  },
  '河西学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 38.9301, lng: 100.4401 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站']
    }
  },
  '陇东学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 35.7381, lng: 107.6371 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  },

  // ==================== 青海 ====================
  '青海大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 36.7141, lng: 101.7441 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '快递驿站', '体育馆', '校医院']
    }
  },
  '青海师范大学': {
    campuses: ['城北校区', '城西校区'],
    coords: {
      '城北校区': { lat: 36.6511, lng: 101.7251 },
      '城西校区': { lat: 36.6191, lng: 101.7491 }
    },
    buildings: {
      '城北校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '体育馆'],
      '城西校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '青海民族大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 36.5971, lng: 101.8001 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '民族博物馆']
    }
  },

  // ==================== 宁夏 ====================
  '宁夏大学': {
    campuses: ['贺兰山校区', '金凤校区'],
    coords: {
      '贺兰山校区': { lat: 38.4831, lng: 106.2591 },
      '金凤校区': { lat: 38.4341, lng: 106.2841 }
    },
    buildings: {
      '贺兰山校区': ['文科楼', '理科楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '快递站', '体育馆'],
      '金凤校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '4号公寓', '菜鸟驿站']
    }
  },
  '宁夏医科大学': {
    campuses: ['雁湖校区', '双怡校区'],
    coords: {
      '雁湖校区': { lat: 38.4761, lng: 106.2451 },
      '双怡校区': { lat: 38.4871, lng: 106.2981 }
    },
    buildings: {
      '雁湖校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站', '附属医院'],
      '双怡校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '北方民族大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 38.4281, lng: 106.2641 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育馆']
    }
  },
  '宁夏师范学院': {
    campuses: ['古雁校区', '文苑校区'],
    coords: {
      '古雁校区': { lat: 36.0031, lng: 106.2721 },
      '文苑校区': { lat: 35.9961, lng: 106.2651 }
    },
    buildings: {
      '古雁校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '文苑校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },

  // ==================== 新疆 ====================
  '新疆大学': {
    campuses: ['校本部', '南校区', '北校区'],
    coords: {
      '校本部': { lat: 43.7981, lng: 87.6001 },
      '南校区': { lat: 43.7901, lng: 87.5921 },
      '北校区': { lat: 43.8171, lng: 87.6001 }
    },
    buildings: {
      '校本部': ['教学主楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '校医院'],
      '南校区': ['教学楼', '实验楼', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点'],
      '北校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站']
    }
  },
  '石河子大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 44.3021, lng: 86.0501 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '5号宿舍楼', '6号宿舍楼', '快递驿站', '校医院', '体育馆']
    }
  },
  '新疆农业大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 43.8191, lng: 87.5491 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '实验农场']
    }
  },
  '新疆师范大学': {
    campuses: ['昆仑校区', '文光校区'],
    coords: {
      '昆仑校区': { lat: 43.7711, lng: 87.5651 },
      '文光校区': { lat: 43.7981, lng: 87.6141 }
    },
    buildings: {
      '昆仑校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递驿站', '体育馆'],
      '文光校区': ['教学楼', '图书馆', '食堂', '1号公寓', '2号公寓', '3号公寓', '快递点']
    }
  },
  '新疆医科大学': {
    campuses: ['雪莲山校区', '新医路校区'],
    coords: {
      '雪莲山校区': { lat: 43.8801, lng: 87.6081 },
      '新医路校区': { lat: 43.8121, lng: 87.5851 }
    },
    buildings: {
      '雪莲山校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '附属医院'],
      '新医路校区': ['教学楼', '食堂', '1号公寓', '2号公寓', '快递点']
    }
  },
  '新疆财经大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 43.7801, lng: 87.5561 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  },
  '塔里木大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 40.5461, lng: 81.2921 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼', '快递站', '体育场']
    }
  },
  '伊犁师范大学': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 43.9201, lng: 81.3281 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  },
  '喀什大学': {
    campuses: ['新泉校区', '东城校区'],
    coords: {
      '新泉校区': { lat: 39.4491, lng: 75.9791 },
      '东城校区': { lat: 39.4541, lng: 76.0301 }
    },
    buildings: {
      '新泉校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递站'],
      '东城校区': ['教学楼', '食堂', '1号宿舍楼', '2号宿舍楼', '快递点']
    }
  },
  '昌吉学院': {
    campuses: ['主校区'],
    coords: {
      '主校区': { lat: 44.0101, lng: 87.2931 }
    },
    buildings: {
      '主校区': ['教学楼', '图书馆', '食堂', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '快递驿站']
    }
  }
};

function getSchoolNames() {
  return Object.keys(CAMPUS_DATA);
}

function getCampusNames(school) {
  var data = CAMPUS_DATA[school];
  return data ? data.campuses : [];
}

function getCampusCoords(school, campus) {
  var data = CAMPUS_DATA[school];
  if (!data || !data.coords[campus]) return null;
  return data.coords[campus];
}

function getCampusBuildings(school, campus) {
  var data = CAMPUS_DATA[school];
  if (!data || !data.buildings[campus]) return [];
  return data.buildings[campus];
}

// ============== 宿舍楼精确坐标 ==============
// 格式: '学校名|校区名|建筑名' → { lat, lng }
// 重点高校手动标注，其余通过 getBuildingCoord 自动计算
var DORM_COORDS = {
  // 延安大学 杨家岭校区
  '延安大学|杨家岭校区|1号宿舍楼': { lat: 36.5978, lng: 109.4883 },
  '延安大学|杨家岭校区|2号宿舍楼': { lat: 36.5980, lng: 109.4887 },
  '延安大学|杨家岭校区|3号宿舍楼': { lat: 36.5982, lng: 109.4880 },
  '延安大学|杨家岭校区|4号宿舍楼': { lat: 36.5984, lng: 109.4876 },
  '延安大学|杨家岭校区|5号宿舍楼': { lat: 36.5976, lng: 109.4890 },
  '延安大学|杨家岭校区|6号宿舍楼': { lat: 36.5974, lng: 109.4886 },
  // 延安大学 新城校区
  '延安大学|新城校区|学生公寓A栋': { lat: 36.5847, lng: 109.4935 },
  '延安大学|新城校区|学生公寓B栋': { lat: 36.5849, lng: 109.4939 },
  '延安大学|新城校区|学生公寓C栋': { lat: 36.5851, lng: 109.4943 },
  '延安大学|新城校区|学生公寓D栋': { lat: 36.5845, lng: 109.4947 },

  // 西安交通大学 兴庆校区
  '西安交通大学|兴庆校区|东1舍': { lat: 34.2580, lng: 108.9918 },
  '西安交通大学|兴庆校区|东2舍': { lat: 34.2582, lng: 108.9922 },
  '西安交通大学|兴庆校区|东3舍': { lat: 34.2584, lng: 108.9915 },
  '西安交通大学|兴庆校区|东4舍': { lat: 34.2578, lng: 108.9920 },
  '西安交通大学|兴庆校区|东5舍': { lat: 34.2576, lng: 108.9925 },
  '西安交通大学|兴庆校区|西1舍': { lat: 34.2565, lng: 108.9888 },
  '西安交通大学|兴庆校区|西2舍': { lat: 34.2563, lng: 108.9892 },
  '西安交通大学|兴庆校区|西3舍': { lat: 34.2567, lng: 108.9885 },
  // 西安交通大学 创新港
  '西安交通大学|中国西部科技创新港|19-1宿舍': { lat: 34.1538, lng: 108.7643 },
  '西安交通大学|中国西部科技创新港|19-2宿舍': { lat: 34.1541, lng: 108.7647 },
  '西安交通大学|中国西部科技创新港|19-3宿舍': { lat: 34.1536, lng: 108.7640 },
  '西安交通大学|中国西部科技创新港|23-1宿舍': { lat: 34.1528, lng: 108.7658 },
  '西安交通大学|中国西部科技创新港|23-2宿舍': { lat: 34.1531, lng: 108.7662 },
  '西安交通大学|中国西部科技创新港|23-3宿舍': { lat: 34.1526, lng: 108.7655 },

  // 西北大学 长安校区
  '西北大学|长安校区|柳园1号楼': { lat: 34.0105, lng: 108.8975 },
  '西北大学|长安校区|柳园2号楼': { lat: 34.0107, lng: 108.8979 },
  '西北大学|长安校区|柳园3号楼': { lat: 34.0103, lng: 108.8972 },
  '西北大学|长安校区|桃园1号楼': { lat: 34.0095, lng: 108.8990 },
  '西北大学|长安校区|桃园2号楼': { lat: 34.0097, lng: 108.8994 },
  '西北大学|长安校区|桃园3号楼': { lat: 34.0093, lng: 108.8987 },

  // 陕西师范大学 长安校区
  '陕西师范大学|长安校区|阳光苑1号楼': { lat: 34.0195, lng: 108.9295 },
  '陕西师范大学|长安校区|阳光苑2号楼': { lat: 34.0198, lng: 108.9299 },
  '陕西师范大学|长安校区|阳光苑3号楼': { lat: 34.0192, lng: 108.9292 },
  '陕西师范大学|长安校区|紫月苑1号楼': { lat: 34.0185, lng: 108.9308 },
  '陕西师范大学|长安校区|紫月苑2号楼': { lat: 34.0188, lng: 108.9312 },
  '陕西师范大学|长安校区|紫月苑3号楼': { lat: 34.0183, lng: 108.9305 },

  // 长安大学 渭水校区
  '长安大学|渭水校区|修远1号楼': { lat: 34.3826, lng: 108.9545 },
  '长安大学|渭水校区|修远2号楼': { lat: 34.3828, lng: 108.9549 },
  '长安大学|渭水校区|修远3号楼': { lat: 34.3824, lng: 108.9542 },
  '长安大学|渭水校区|明远1号楼': { lat: 34.3816, lng: 108.9560 },
  '长安大学|渭水校区|明远2号楼': { lat: 34.3818, lng: 108.9564 },
  '长安大学|渭水校区|明远3号楼': { lat: 34.3814, lng: 108.9557 },

  // 西北工业大学 长安校区
  '西北工业大学|长安校区|星天苑1号楼': { lat: 34.0347, lng: 108.7665 },
  '西北工业大学|长安校区|星天苑2号楼': { lat: 34.0349, lng: 108.7669 },
  '西北工业大学|长安校区|星天苑3号楼': { lat: 34.0345, lng: 108.7662 },
  '西北工业大学|长安校区|星天苑4号楼': { lat: 34.0351, lng: 108.7673 },
  '西北工业大学|长安校区|星天苑5号楼': { lat: 34.0343, lng: 108.7676 },
  '西北工业大学|长安校区|星天苑6号楼': { lat: 34.0339, lng: 108.7680 },

  // 西安电子科技大学 南校区
  '西安电子科技大学|南校区|竹园1号楼': { lat: 34.1256, lng: 108.8353 },
  '西安电子科技大学|南校区|竹园2号楼': { lat: 34.1258, lng: 108.8357 },
  '西安电子科技大学|南校区|竹园3号楼': { lat: 34.1254, lng: 108.8350 },
  '西安电子科技大学|南校区|竹园4号楼': { lat: 34.1260, lng: 108.8346 },
  '西安电子科技大学|南校区|海棠1号楼': { lat: 34.1246, lng: 108.8368 },
  '西安电子科技大学|南校区|海棠2号楼': { lat: 34.1248, lng: 108.8372 },
  '西安电子科技大学|南校区|海棠3号楼': { lat: 34.1244, lng: 108.8365 },
  '西安电子科技大学|南校区|海棠4号楼': { lat: 34.1242, lng: 108.8375 },
  '西安电子科技大学|南校区|丁香1号楼': { lat: 34.1240, lng: 108.8355 },
  '西安电子科技大学|南校区|丁香2号楼': { lat: 34.1238, lng: 108.8359 },

  // 兰州大学 榆中校区
  '兰州大学|榆中校区|宿舍区': { lat: 35.8575, lng: 104.1145 },
  '兰州大学|城关校区|宿舍区': { lat: 36.0465, lng: 103.8595 }
};

// 根据建筑名生成一个稳定的数值哈希（用于自动计算坐标偏移）
function _simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // 转32位整数
  }
  return hash;
}

// 获取建筑坐标：优先查精确坐标表，否则基于校区中心 + 建筑名哈希自动偏移
function getBuildingCoord(school, campus, buildingName) {
  // 1. 查精确坐标表
  var key = school + '|' + campus + '|' + buildingName;
  if (DORM_COORDS[key]) return DORM_COORDS[key];

  // 2. 基于校区中心自动偏移（每栋楼偏移 50~350 米，方向由名称哈希决定）
  var center = getCampusCoords(school, campus);
  if (!center) return null;

  var hash = _simpleHash(key);
  var angle = (Math.abs(hash) % 360) * Math.PI / 180; // 方向角
  var dist = 50 + (Math.abs(hash >> 8) % 300); // 距离 50~350m
  var latOffset = (dist * Math.cos(angle)) / 111320; // 1度纬度 ≈ 111320m
  var lngOffset = (dist * Math.sin(angle)) / (111320 * Math.cos(center.lat * Math.PI / 180));

  return {
    lat: Number((center.lat + latOffset).toFixed(6)),
    lng: Number((center.lng + lngOffset).toFixed(6))
  };
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  var R = 6371000; // 地球半径（米）
  var toRad = function(d) { return d * Math.PI / 180; };
  var dLat = toRad(lat2 - lat1);
  var dLng = toRad(lng2 - lng1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCampus(lat, lng) {
  var bestDistance = Infinity;
  var bestSchool = '';
  var bestCampus = '';
  var schools = Object.keys(CAMPUS_DATA);
  for (var i = 0; i < schools.length; i++) {
    var school = schools[i];
    var campuses = CAMPUS_DATA[school].campuses;
    for (var j = 0; j < campuses.length; j++) {
      var campus = campuses[j];
      var coord = CAMPUS_DATA[school].coords[campus];
      if (!coord) continue;
      var dist = haversineDistance(lat, lng, coord.lat, coord.lng);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSchool = school;
        bestCampus = campus;
      }
    }
  }
  return { school: bestSchool, campus: bestCampus, distance: Math.round(bestDistance) };
}

var SERVICE_TYPES = [
  { key: 'express', title: '代取快递', short: '快', subtitle: '包裹送到宿舍楼下' },
  { key: 'takeout', title: '代拿外卖', short: '外', subtitle: '午晚餐准时送达' },
  { key: 'food', title: '代买餐饮', short: '买', subtitle: '饮品零食顺手带回' },
  { key: 'checkin', title: '代签到', short: '签', subtitle: '课程活动快速补位' },
  { key: 'queue', title: '代排队', short: '排', subtitle: '热门窗口提前排上' }
];

var SERVICE_TYPE_NAMES = SERVICE_TYPES.map(function(item) { return item.title; });

var STATE_TEXT_MAP = {
  pending: '待接单', accepted: '已接单', picked: '已取货',
  delivered: '已送达', confirmed: '待评价', rated: '已完成',
  cancelled: '已取消', appealing: '申诉中' 
};

function formatDate(date) {
  var d = date || new Date();
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  var hour = String(d.getHours()).padStart(2, '0');
  var minute = String(d.getMinutes()).padStart(2, '0');
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function getDefaultUser() {
  return {
    nickName: '校园用户', avatarUrl: '', phoneNumber: '188****1234', birthday: '2000-01-01', credit: 4.92, studentId: '20240001',
    orderCounts: new Array(5).fill(0), freeCoupons: new Array(5).fill(0),
    isVerified: false,
    balance: 0.00,
    idCard: '',
    chsiVerified: false,
    chsiRealName: '',
    chsiSchool: '',
    chsiMajor: '',
    chsiLevel: '',
    chsiVerifiedAt: 0,
    lastModifiedPhone: 0,
    lastModifiedStudentId: 0,
    lastModifiedIdCard: 0
  };
}

function normalizeUser(userInfo) {
  var base = getDefaultUser();
  var info = userInfo || {};
  return Object.assign({}, base, info, {
    orderCounts: Array.isArray(info.orderCounts) && info.orderCounts.length === 5 ? info.orderCounts : base.orderCounts,
    freeCoupons: Array.isArray(info.freeCoupons) && info.freeCoupons.length === 5 ? info.freeCoupons : base.freeCoupons,
    isVerified: info.isVerified !== undefined ? info.isVerified : base.isVerified,
    balance: info.balance !== undefined ? info.balance : base.balance,
    idCard: info.idCard || base.idCard,
    chsiVerified: info.chsiVerified || base.chsiVerified,
    chsiRealName: info.chsiRealName || base.chsiRealName,
    chsiSchool: info.chsiSchool || base.chsiSchool,
    chsiMajor: info.chsiMajor || base.chsiMajor,
    chsiLevel: info.chsiLevel || base.chsiLevel,
    chsiVerifiedAt: info.chsiVerifiedAt || base.chsiVerifiedAt,
    lastModifiedPhone: info.lastModifiedPhone || base.lastModifiedPhone,
    lastModifiedStudentId: info.lastModifiedStudentId || base.lastModifiedStudentId,
    lastModifiedIdCard: info.lastModifiedIdCard || base.lastModifiedIdCard
  });
}

function sanitizeServiceTypeIndex(serviceTypeIndex) {
  var index = Number(serviceTypeIndex);
  if (Number.isNaN(index) || index < 0 || index >= SERVICE_TYPES.length) return 0;
  return index;
}

function createOrder(payload) {
  var p = payload || {};
  var serviceTypeIndex = sanitizeServiceTypeIndex(p.serviceTypeIndex);
  var amount = Number(p.amount || 0);

  return {
    id: Date.now() + '' + Math.floor(Math.random() * 1000),
    serviceTypeIndex: serviceTypeIndex, serviceTypeName: SERVICE_TYPE_NAMES[serviceTypeIndex],
    pickupCode: String(p.pickupCode || '').trim(), destination: String(p.destination || '').trim(),
    amount: Number(amount.toFixed(2)), remark: String(p.remark || '').trim(),
    demanderName: p.demanderName || '发布者', demanderStudentId: p.demanderStudentId || '', demanderPhone: p.demanderPhone || '',
    school: p.school || '', campus: p.campus || '', riderName: '', riderStudentId: '', proofImage: '', 
    rating: 5, review: '',
    currentState: 'pending', createdAt: formatDate(), updatedAt: formatDate()
  };
}

function acceptOrder(order, riderInfo) {
  var r = riderInfo || {};
  return Object.assign({}, order, {
    riderName: r.nickName || '跑腿员', riderStudentId: r.studentId || '',
    currentState: 'accepted', updatedAt: formatDate(), acceptedAt: formatDate()
  });
}

function updateOrderState(order, nextState, extraData) {
  return Object.assign({}, order, extraData || {}, { currentState: nextState, updatedAt: formatDate() });
}

function bumpServiceStats(userInfo, serviceTypeIndex) {
  var normalized = normalizeUser(userInfo);
  var index = sanitizeServiceTypeIndex(serviceTypeIndex);
  var orderCounts = normalized.orderCounts.slice();
  var freeCoupons = normalized.freeCoupons.slice();
  orderCounts[index] += 1;
  if (orderCounts[index] >= 5) { orderCounts[index] = 0; freeCoupons[index] += 1; }
  return Object.assign({}, normalized, { orderCounts: orderCounts, freeCoupons: freeCoupons });
}

function getIncome(amount) {
  var total = Number(amount || 0);
  return { total: total, platformFee: Number((total * 0.1).toFixed(2)), riderIncome: Number((total * 0.9).toFixed(2)) };
}

// 信用分规则：5星+0.1  4星+0.05  3星+0  2星-0.15  1星-0.3  范围[0, 5]
var CREDIT_DELTA = { 5: 0.1, 4: 0.05, 3: 0, 2: -0.15, 1: -0.3 };

function calcCredit(currentCredit, ratingScore) {
  var score = Number(ratingScore) || 5;
  if (score < 1) score = 1;
  if (score > 5) score = 5;
  var delta = CREDIT_DELTA[score] !== undefined ? CREDIT_DELTA[score] : 0;
  var next = Number((Number(currentCredit || 4.92) + delta).toFixed(2));
  if (next > 5) next = 5;
  if (next < 0) next = 0;
  return next;
}

module.exports = { CAMPUS_DATA, DORM_COORDS, getSchoolNames, getCampusNames, getCampusCoords, getCampusBuildings, getBuildingCoord, findNearestCampus, haversineDistance, SERVICE_TYPES, SERVICE_TYPE_NAMES, STATE_TEXT_MAP, formatDate, getDefaultUser, normalizeUser, createOrder, acceptOrder, updateOrderState, bumpServiceStats, getIncome, CREDIT_DELTA, calcCredit };