import Vue from 'vue'
import Vuex from 'vuex'

//基本
import detail from './modules/detail'
//用户登录接口
import index from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        detail,
        index
    },
    strict: process.env.NODE_ENV !== 'production'//进行自动判断严格模式还是非严格模式（开发环境下是严格模式）做这个判断是为了避免不必要的性能损耗
})