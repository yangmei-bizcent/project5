const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
import layout from '@/pages/layout'

const routerMap = [
  {
    path: '/',
    redirect: '/login',
    component: lazyload('user/index'),
    children: [{
      path: 'login',
      name: 'login',
      component: lazyload('user/login'),
      meta: {
        title: '登录'
      }
    }, {
      path: 'foget',
      name: 'foget',
      component: lazyload('user/foget'),
      meta: {
        title: '忘记密码'
      }
    }]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '出错啦'
    },
    component: lazyload('errorPage/404')
  }, {
    path: '/401',
    name: '401',
    meta: {
      title: '出错啦'
    },
    component: lazyload('errorPage/401')
  }, {
    path: '/500',
    name: '500',
    meta: {
      title: '出错啦'
    },
    component: lazyload('errorPage/500')
  }, {
    path: '/turnout/writetransfer',
    name: 'writetransfer',
    meta: { title: '填写转诊信息' },
    component: lazyload('turnout/writetransfer')
  }, {
    path: '/turnout/checktransfer',
    name: 'checktransfer',
    meta: { title: '填写转诊信息' },
    component: lazyload('turnout/checktransfer')
  }]
//noDropdown : if `noDropdown:true` will has no submenu
const sideRoutes = [{
  path: '/introduction',
  name: 'introduction',
  meta: {
    title: '简介'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'index',
    alias: '',
    meta: { title: '简介' },
    component: lazyload('base/introduction')
  }]
},
{
  path: '/turnout',
  name: 'turnout',
  meta: {
    title: '新增转诊'
  },
  component: layout,
  children: [{
    path: 'add',
    name: 'add',
    meta: { title: '手动新增转诊' },
    component: lazyload('turnout/add'),
    children: [
      {
        path: 'addtransfer',
        name: 'addtransfer',
        meta: { title: '手动新增转诊' },
        component: lazyload('turnout/addtransfer')
      },
      {
        path: 'writetransfer',
        name: 'writetransfer',
        meta: { title: '填写转诊信息' },
        component: lazyload('turnout/writetransfer')
      },
      {
        path: 'checktransfer',
        name: 'checktransfer',
        meta: { title: '信息核实' },
        component: lazyload('turnout/checktransfer')
      }
    ]
  }]
}, {
  path: '/waitinvalid',
  name: 'waitinvalid',
  meta: {
    title: '待接收的病人'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'waitinvalid',
    alias: '',
    meta: { title: '待接收的病人' },
    component: lazyload('waitinvalid/waitinvalid')
  }]
}, {
  path: '/zzinstall',
  name: 'zzinstall',
  meta: {
    title: '转诊设置'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'zzinstall',
    alias: '',
    meta: { title: '转诊设置' },
    component: lazyload('zzinstall/zzinstall')
  }]
}, {
  path: '/zzerwm',
  name: 'zzerwm',
  meta: {
    title: '转诊二维码'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'zzerwm',
    alias: '',
    meta: { title: '转诊二维码' },
    component: lazyload('zzerwm/erwmpage')
  }]
}, {
  path: '/alreadyinvalid',
  name: 'alreadyinvalid',
  meta: {
    title: '已接收的病人'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'alreadyinvalid',
    alias: '',
    meta: { title: '已接收的病人' },
    component: lazyload('alreadyinvalid/alreadyinvalid')
  }]
}, {
  path: '/refuseinvalid',
  name: 'refuseinvalid',
  meta: {
    title: '被拒绝的病人'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'refuseinvalid',
    alias: '',
    meta: { title: '被拒绝的病人' },
    component: lazyload('refuseinvalid/refuseinvalid')
  }]
}, {
  path: '/cancelinvalid',
  name: 'cancelinvalid',
  meta: {
    title: '已取消的病人'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'cancelinvalid',
    alias: '',
    meta: { title: '已取消的病人' },
    component: lazyload('cancelinvalid/cancelinvalid')
  }]
}, {
  path: '/invaliddetail',
  name: 'invaliddetail',
  meta: {
    title: '已接受详情'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'invaliddetail',
    alias: '',
    meta: { title: '已接受详情' },
    component: lazyload('invaliddetail/invaliddetail')
  }]
}, {
  path: '/leavehosipital',
  name: 'leavehosipital',
  meta: {
    title: '出院病人转诊'
  },
  noDropdown: true,
  component: layout,
  children: [{
    path: 'leavehosipital',
    alias: '',
    meta: { title: '出院病人转诊' },
    component: lazyload('leavehosipital/leavehosipital')
  }, {
    path: 'zzrecord',
    meta: {
      title: '转诊记录'
    },
    component: lazyload('leavehosipital/zzrecord')
  }]
}, {
  path: '/mzzzrecord',
  name: 'mzzzrecord',
  meta: {
    title: '传送管理'
  },
  component: layout,
  children: [{
    path: 'mzzzrecord',
    name: 'mzzzrecord',
    alias: '',
    meta: { title: '门诊转诊记录' },
    component: lazyload('mzzzrecord/mzzzrecord')
  }, {
    path: 'checkrecord',
    name: 'checkrecord',
    alias: '',
    meta: { title: '检查检验记录' },
    component: lazyload('mzzzrecord/checkrecord')
  }]
},
//社区医院
{
  path: '/patients',
  name: 'patients',
  meta: {
    title: '新增转诊',
  },
  component: layout,
  children: [{
    path: 'wait',
    name: 'wait',
    meta: { title: '待转诊' },
    component: lazyload('patients/wait')
  }, {
    path: 'already',
    name: 'already',
    meta: { title: '已接诊' },
    component: lazyload('patients/already')
  }, {
    path: 'refuse',
    name: 'refuse',
    meta: { title: '已拒绝' },
    component: lazyload('patients/refuse')
  },]
}, {
  path: '/turnoutlist',
  name: 'turnoutlist',
  meta: {
    title: '转出',
  },
  component: layout,
  children: [{
    path: 'qyjmlb',
    name: 'qyjmlb',
    meta: { title: '签约居民列表' },
    component: lazyload('turnoutlist/qyjmlb')
  }, {
    path: 'mzzz',
    name: 'mzzz',
    meta: { title: '门诊转诊列表' },
    component: lazyload('turnoutlist/mzzz')
  }, {
    path: 'jyjc',
    name: 'jyjc',
    meta: { title: '检验检查列表' },
    component: lazyload('turnoutlist/jyjc')
  }, {
    path: 'cktz',
    name: 'cktz',
    meta: { title: '查看停诊信息' },
    component: lazyload('turnoutlist/cktz')
  }, {
    path: 'ckpb',
    name: 'ckpb',
    meta: { title: '查看排班信息' },
    component: lazyload('turnoutlist/mzzzyy')
  },]
}, {
  path: '/sign-person-list',
  name: 'sign-person-list',
  meta: {
    title: '签约居民列表',
  },
  component: layout,
  children: [{
    path: 'mzzzsq',
    name: 'mzzzsq',
    meta: { title: '门诊转诊申请' },
    component: lazyload('turnoutlist/mzzzsq')
  }, {
    path: 'mzzzsqsr',
    name: 'mzzzsqsr',
    meta: { title: '门诊转诊申请输入' },
    component: lazyload('turnoutlist/mzzzsqsr')
  }, {
    path: 'mzzzyy',
    name: 'mzzzyy',
    meta: { title: '门诊转诊预约' },
    component: lazyload('turnoutlist/mzzzyy')
  }, {
    path: 'mzzzqr',
    name: 'mzzzqr',
    meta: { title: '门诊转诊确认' },
    component: lazyload('turnoutlist/mzzzqr')
  }, {
    path: 'yyjyjc',
    name: 'yyjyjc',
    meta: { title: '预约检验检查' },
    component: lazyload('turnoutlist/yyjyjc')
  }, {
    path: 'yyjyjcsr',
    name: 'yyjyjcsr',
    meta: { title: '预约检验检查输入' },
    component: lazyload('turnoutlist/yyjyjcsr')
  }, {
    path: 'jyjcyy',
    name: 'jyjcyy',
    meta: { title: '检验检查预约' },
    component: lazyload('turnoutlist/jyjcyy')
  }, {
    path: 'jyjczzqr',
    name: 'jyjczzqr',
    meta: { title: '检验检查转诊确认' },
    component: lazyload('turnoutlist/jyjczzqr')
  }]
}]
const routes = [...routerMap, ...sideRoutes]

export {
  sideRoutes,
  routes
}