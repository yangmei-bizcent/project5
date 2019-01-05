const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
import layout from '@/pages/layout'

const routerMap = [{
    path: '/ArchivesCenter/archivesPage',
    name: 'ArchivesPage',
    meta: {
      title: '居民管理'
    },
      component: lazyload('ArchivesCenter/archivesPage'),
    },
    {
      path: '/ArchivesCenter/archivesmaink',
      name: 'ArchivesMainK',
      meta: {
        title: '档案中心'
      },
        component: lazyload('ArchivesCenter/archivesmaink'),
        children:[
            {
                path: '/ReferralRecord/ReferralRecord',
                name: 'ReferralRecord',
                meta: {
                    title: '转诊记录'
                },
                component: lazyload('ReferralRecord/ReferralRecord')
            },
        ]
    },
    {
        path: '/ArchivesCenter/groupServicePage',
        name: 'GroupServicePage',
        meta: {
          title: '群发服务提醒'
        },
          component: lazyload('ArchivesCenter/groupServicePage'),
    },
    {
        path: '/statistics/initialstatistic',
        name: 'InitialStatistic',
        meta: {
            title: '初始统计数据'
        },
        component: lazyload('statistics/initialstatistic'),
    },
    {
        path: '/statistics/renewstatistic',
        name: 'RenewStatistic',
        meta: {
            title: '续约指标统计'
        },
        component: lazyload('statistics/renewstatistic'),
    },
    {
        path: '/statistics/coststatistic',
        name: 'CostStatistic',
        meta: {
            title: '费用统计'
        },
        component: lazyload('statistics/coststatistic'),
    },
    {
        path: '/statistics/servicestatistic',
        name: 'ServiceStatistic',
        meta: {
            title: '服务包指标统计'
        },
        component: lazyload('statistics/servicestatistic'),
    },
    {
        path: '/statistics/qianyuestatistic',
        name: 'QianyueStatistic',
        meta: {
            title: '签约指标统计'
        },
        component: lazyload('statistics/qianyuestatistic'),
    },
    {
        path: '/statistics/messsetup',
        name: 'MessSetUp',
        meta: {
            title: '签约短信发送设定'
        },
        component: lazyload('statistics/messsetup'),
    },
    {
        path: '/qianyueagreement/agreementpage',
        name: 'AgreementPage',
        meta: {
            title: '签约协议'
        },
        component: lazyload('qianyueagreement/agreementpage'),
    },

    {
        path: '/qianyueagreement/agreementpageEdit',
        name: 'agreementpageEdit',
        meta: {
            title: '编辑签约协议'
        },
        component: lazyload('qianyueagreement/agreementpageEdit'),
    }, {
        path: '/livebroadcast/livepage',
        name: 'LivePage',
        meta: {
            title: '直播列表页'
        },
        component: lazyload('livebroadcast/livepage'),
    },
    {
        path: '/livebroadcast/livepageLook',
        name: 'LivepageLook',
        meta: {
            title: '直播查看页'
        },
        component: lazyload('livebroadcast/livepageLook'),
    },
    {
        path: '/livebroadcast/livepageAddAndEdit',
        name: 'LivepageAddAndEdit',
        meta: {
            title: '直播编辑页'
        },
        component: lazyload('livebroadcast/livepageAddAndEdit'),
    },
    {
        path: '/Service/Servicepackage',
        name: 'Servicepackage',
        meta: {
            title: '服务包管理'
        },
        component: lazyload('Service/Servicepackage'),
    },
    {
        path: '/turnout/addtransfer',
        name: 'addtransfer',
        meta: {
            title: '新增的病人'
        },
        component: lazyload('turnout/addtransfer'),
    },
    {
        path: '/waitinvalid/waitinvalid',
        name: 'waitinvalid',
        meta: {
            title: '待接收的病人'
        },
        component: lazyload('waitinvalid/waitinvalid'),
    },
    {
        path: '/zzinstall/zzinstall',
        name: 'zzinstall',
        meta: {
            title: '转诊设置'
        },
        component: lazyload('zzinstall/zzinstall')
    },
    {
        path: '/zzerwm/zzerwm',
        name: 'zzerwm',
        meta: {
            title: '转诊二维码'
        },
        component: lazyload('zzerwm/erwmpage')
    },
    {
        path: '/alreadyinvalid/alreadyinvalid',
        name: 'alreadyinvalid',
        meta: {
            title: '已接收的病人'
        },
        component: lazyload('alreadyinvalid/alreadyinvalid')
    },
    {
        path: '/refuseinvalid/refuseinvalid',
        name: 'refuseinvalid',
        meta: {
            title: '被拒绝的病人'
        },
        component: lazyload('refuseinvalid/refuseinvalid')
    },
    {
        path: '/cancelinvalid/cancelinvalid',
        name: 'cancelinvalid',
        meta: {
            title: '已取消的病人'
        },
        component: lazyload('cancelinvalid/cancelinvalid')
    },
    {
        path: '/invaliddetail/invaliddetail',
        name: 'invaliddetail',
        meta: {
            title: '已接受详情'
        },
        component: lazyload('invaliddetail/invaliddetail')
    },
    {
        path: '/leavehosipital/leavehosipital',
        name: 'leavehosipital',
        meta: {
            title: '出院病人转诊'
        },
        component: lazyload('leavehosipital/leavehosipital')
    },
    {
        path: '/leavehosipital/zzrecord',
        name: 'zzrecord',
        meta: {
            title: '转诊记录'
        },
        component: lazyload('leavehosipital/zzrecord')
    },
    {
        path: '/mzzzrecord/mzzzrecord',
        name: 'mzzzrecord',
        meta: {
            title: '门诊转诊记录'
        },
        component: lazyload('mzzzrecord/mzzzrecord')
    },
    {
        path: '/mzzzrecord/checkrecord',
        name: 'checkrecord',
        meta: {
            title: '检查检验记录'
        },
        component: lazyload('mzzzrecord/checkrecord')
    },
    {
        path: '/patients/wait',
        name: 'wait',
        meta: {
            title: '待转诊',
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
        path: '/turnoutlist/hospitalone',
        name: 'hospitalone',
        meta: {
            title: '住院转诊申请',
        },
        component: lazyload('turnoutlist/hospitalone')
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
        path: '/zhuanZhenInfo/zhuanzhendetail',
        name: 'zhuanzhendetail',
        meta: {
            title: '门诊转诊申请',
        },
        component: lazyload('zhuanZhenInfo/zhuanzhendetail')
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
        path: '/sign-person-list/yyjyjcsr',
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
    }, {
        path: '/carouselManage/lbtgl',
        name: 'lbtgl',
        meta: { title: '轮播图管理' },
        component: lazyload('carouselManage/lbtgl')
    }, {
        path: '/carouselManage/lbtck',
        name: 'lbtck',
        meta: { title: '轮播图查看' },
        component: lazyload('carouselManage/lbtck')
    }, {
        path: '/carouselManage/lbtxq',
        name: 'lbtxq',
        meta: { title: '轮播图详情' },
        component: lazyload('carouselManage/lbtxq')
    }, {
        path: '/newsManage/xwzx',
        name: 'xwzx',
        meta: { title: '新闻资讯' },
        component: lazyload('newsManage/xwzx')
    },
    {
        path: '/newsManage/xwck',
        name: 'xwck',
        meta: { title: '新闻资讯查看' },
        component: lazyload('newsManage/xwck')
    },
    {
        path: '/newsManage/xwxq',
        name: 'xwxq',
        meta: { title: '新闻资讯详情' },
        component: lazyload('newsManage/xwxq')
    },
    {
        path: '/sqzhuanzhen/changeInTo',
        name: 'changeInTo',
        meta: { title: '社区转诊列表(转入)' },
        component: lazyload('sqzhuanzhen/changeInTo.vue')
    },
    {
        path: '/sqzhuanzhen/turnOut',
        name: 'turnOut',
        meta: { title: '社区转诊列表(转出)' },
        component: lazyload('sqzhuanzhen/turnOut')
    }, {
        path: '/zhuanZhenInfo/zhuanzhenHop',
        name: 'zhuanzhenHop',
        meta: {
            title: '门诊转诊申请',
        },
        component: lazyload('zhuanZhenInfo/zhuanzhenHop')
    }, {
        path: '/zhuanZhenInfo/zhuanzhenZhuyuan',
        name: 'zhuanzhenZhuyuan',
        meta: {
            title: '打印住院转诊详情',
        },
        component: lazyload('zhuanZhenInfo/zhuanzhenZhuyuan')
    }, {
        path: '/zhuanZhenInfo/zhuanzhenShequ',
        name: 'zhuanzhenShequ',
        meta: {
            title: '打印社区转诊详情',
        },
        component: lazyload('zhuanZhenInfo/zhuanzhenShequ')
    }, {
        path: '/turnoutlist/hosptlrefrrapply',
        name: 'hosptlrefrrapply',
        meta: {
            title: '住院转诊申请',
        },
        component: lazyload('turnoutlist/hosptlrefrrapply')
    }, {
        path: '/turnoutlist/writehosptlrefrrinfo',
        name: 'writehosptlrefrrinfo',
        meta: {
            title: '填写转诊信息',
        },
        component: lazyload('turnoutlist/writehosptlrefrrinfo')
    }, {
        path: '/turnoutlist/hosptlrefrrconfirm',
        name: 'hosptlrefrrconfirm',
        meta: {
            title: '确认申请',
        },
        component: lazyload('turnoutlist/hosptlrefrrconfirm')
    },
    {
        path: '/referral/referralList',
        name: 'referralList',
        meta: {
            title: '住院转诊列表'
        },
        component: lazyload('referral/referralList'),
    },
    {
        path: '/zzinstall/zzyypz',
        name: 'zzyypz',
        meta: {
            title: '转诊医院配置'
        },
        component: lazyload('zzinstall/zzyypz')
    },
    
    
]

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
}, ]
const routes = [...routerMap, ...sideRoutes]

export {
    sideRoutes,
    routes
}