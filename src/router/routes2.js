const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
import layout from '@/pages/layout'

const routerMap = [
{
  path:'/turnout/addtransfer',
  name:'addtransfer',
  meta:{
    title:'新增的病人'
  },
  component: lazyload('turnout/addtransfer'),
},
{
  path:'/waitinvalid/waitinvalid',
  name:'waitinvalid',
  meta:{
    title:'待接收的病人'
  },
  component: lazyload('waitinvalid/waitinvalid'),
},
{
  path:'/zzinstall/zzinstall',
  name:'zzinstall',
  meta:{
    title:'转诊设置'
  },
  component: lazyload('zzinstall/zzinstall')
},
{
  path:'/zzerwm/zzerwm',
  name:'zzerwm',
  meta:{
    title:'转诊二维码'
  },
  component: lazyload('zzerwm/erwmpage')
},
{
  path:'/alreadyinvalid/alreadyinvalid',
  name:'alreadyinvalid',
  meta:{
    title:'已接收的病人'
  },
  component: lazyload('alreadyinvalid/alreadyinvalid')
},
{
  path:'/refuseinvalid/refuseinvalid',
  name:'refuseinvalid',
  meta:{
    title:'被拒绝的病人'
  },
  component: lazyload('refuseinvalid/refuseinvalid')
},
{
  path:'/cancelinvalid/cancelinvalid',
  name:'cancelinvalid',
  meta:{
    title:'已取消的病人'
  },
  component: lazyload('cancelinvalid/cancelinvalid')
},
{
  path:'/invaliddetail/invaliddetail',
  name:'invaliddetail',
  meta:{
    title:'已接受详情'
  },
  component: lazyload('invaliddetail/invaliddetail')
},
{
  path:'/leavehosipital/leavehosipital',
  name:'leavehosipital',
  meta:{
    title:'出院病人转诊'
  },
  component: lazyload('leavehosipital/leavehosipital')
},
{
  path:'/leavehosipital/zzrecord',
  name:'zzrecord',
  meta:{
    title:'转诊记录'
  },
  component: lazyload('leavehosipital/zzrecord')
},
{
  path:'/mzzzrecord/mzzzrecord',
  name:'mzzzrecord',
  meta:{
    title:'门诊转诊记录'
  },
  component: lazyload('mzzzrecord/mzzzrecord')
},
{
  path:'/mzzzrecord/checkrecord',
  name:'checkrecord',
  meta:{
    title:'检查检验记录'
  },
  component: lazyload('mzzzrecord/checkrecord')
},
{
  path: '/patients/wait',
  name: 'wait',
  meta: {
    title: '待接诊',
  },
  component: lazyload('patients/wait')
},
{
  path: '/patients/already',
  name: 'already',
  meta: {
    title: '已接诊',
  },
  component: lazyload('patients/already')
},
{
  path: '/patients/refuse',
  name: 'refuse',
  meta: {
    title: '已拒绝',
  },
  component: lazyload('patients/refuse')
},
{
  path: '/sign-person-list/mzzzsqsr',
  name: 'mzzzsqsr',
  meta: {
    title: '门诊转诊申请',
  },
  component: lazyload('turnoutlist/mzzzsqsr')
},
{
  path: '/sign-person-list/mzzzyy',
  name: 'mzzzyy',
  meta: { title: '门诊转诊预约' },
  component: lazyload('turnoutlist/mzzzyy')
}, 
{
  path: '/sign-person-list/mzzzqr',
  name: 'mzzzqr',
  meta: { title: '门诊转诊确认' },
  component: lazyload('turnoutlist/mzzzqr')
}, 
{
  path: '/turnoutlist/mzzz',
  name: 'mzzz',
  meta: { title: '门诊转诊列表' },
  component: lazyload('turnoutlist/mzzz')
},
{
  path: '/sign-person-list/qyjmlb',
  name: 'qyjmlb',
  meta: { title: '签约居民列表' },
  component: lazyload('turnoutlist/qyjmlb')
},
{
  path: 'df',
  name: 'yyjyjcsr',
  meta: {
    title: '预约检验检查',
  },
  component: lazyload('turnoutlist/yyjyjcsr')
},
{
  path: '/sign-person-list/jyjcyy',
  name: 'jyjcyy',
  meta: { title: '检验检查预约' },
  component: lazyload('turnoutlist/jyjcyy')
},
{
  path: '/sign-person-list/jyjczzqr',
  name: 'jyjczzqr',
  meta: { title: '检验检查转诊确认' },
  component: lazyload('turnoutlist/jyjczzqr')
},
{
  path: '/turnoutlist/jyjc',
  name: 'jyjc',
  meta: { title: '检验检查列表' },
  component: lazyload('turnoutlist/jyjc')
},
{
  path: '/turnoutlist/cktz',
  name: 'cktz',
  meta: { title: '查看停诊信息' },
  component: lazyload('turnoutlist/cktz')
}, {
  path: '/turnoutlist/ckpb',
  name: 'ckpb',
  meta: { title: '查看排班信息' },
  component: lazyload('turnoutlist/mzzzyy')
}
]
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
//社区医院
// {
//   path: '/patients',
//   name: 'patients',
//   meta: {
//     title: '新增转诊',
//   },
//   component: layout,
//   children: [{
//     path: 'wait',
//     name: 'wait',
//     meta: { title: '待转诊' },
//     component: lazyload('patients/wait')
//   }, {
//     path: 'already',
//     name: 'already',
//     meta: { title: '已接诊' },
//     component: lazyload('patients/already')
//   }, {
//     path: 'refuse',
//     name: 'refuse',
//     meta: { title: '已拒绝' },
//     component: lazyload('patients/refuse')
//   },]
// }, 
// {
//   path: '/turnoutlist',
//   name: 'turnoutlist',
//   meta: {
//     title: '转出',
//   },
//   component: layout,
//   children: [
//   {
//     path: 'qyjmlb',
//     name: 'qyjmlb',
//     meta: { title: '签约居民列表' },
//     component: lazyload('turnoutlist/qyjmlb')
//   }, {
//     path: 'mzzz',
//     name: 'mzzz',
//     meta: { title: '门诊转诊列表' },
//     component: lazyload('turnoutlist/mzzz')
//   }, {
//     path: 'jyjc',
//     name: 'jyjc',
//     meta: { title: '检验检查列表' },
//     component: lazyload('turnoutlist/jyjc')
//   }, 
//   {
//     path: 'cktz',
//     name: 'cktz',
//     meta: { title: '查看停诊信息' },
//     component: lazyload('turnoutlist/cktz')
//   }, {
//     path: 'ckpb',
//     name: 'ckpb',
//     meta: { title: '查看排班信息' },
//     component: lazyload('turnoutlist/mzzzyy')
//   },]
// }, 
// {
//   path: '/sign-person-list',
//   name: 'sign-person-list',
//   meta: {
//     title: '签约居民列表',
//   },
//   component: layout,
//   children: [{
//     path: 'mzzzsq',
//     name: 'mzzzsq',
//     meta: { title: '门诊转诊申请' },
//     component: lazyload('turnoutlist/mzzzsq')
//   }, {
//     path: 'mzzzsqsr',
//     name: 'mzzzsqsr',
//     meta: { title: '门诊转诊申请输入' },
//     component: lazyload('turnoutlist/mzzzsqsr')
//   }, {
//     path: 'mzzzyy',
//     name: 'mzzzyy',
//     meta: { title: '门诊转诊预约' },
//     component: lazyload('turnoutlist/mzzzyy')
//   }, {
//     path: 'mzzzqr',
//     name: 'mzzzqr',
//     meta: { title: '门诊转诊确认' },
//     component: lazyload('turnoutlist/mzzzqr')
//   }, {
//     path: 'yyjyjc',
//     name: 'yyjyjc',
//     meta: { title: '预约检验检查' },
//     component: lazyload('turnoutlist/yyjyjc')
//   }, {
//     path: 'yyjyjcsr',
//     name: 'yyjyjcsr',
//     meta: { title: '预约检验检查输入' },
//     component: lazyload('turnoutlist/yyjyjcsr')
//   }, {
//     path: 'jyjcyy',
//     name: 'jyjcyy',
//     meta: { title: '检验检查预约' },
//     component: lazyload('turnoutlist/jyjcyy')
//   }, {
//     path: 'jyjczzqr',
//     name: 'jyjczzqr',
//     meta: { title: '检验检查转诊确认' },
//     component: lazyload('turnoutlist/jyjczzqr')
//   }]
// }
]
const routes = [...routerMap, ...sideRoutes]

export {
  sideRoutes,
  routes
}