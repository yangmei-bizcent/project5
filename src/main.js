// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import router from './router'


import ts from 'tesla-ui'
// Vue.use(Vuex)
Vue.use(ts)


import 'tesla-ui/dist/index.css'
import '@/assets/sass/sass-index.scss'
// import '@/assets/jquery/jquery.js'
import '@/assets/jquery/jquery-1.4.4.min.js'
import '@/assets/js/jquery.easyui.min.js'
import QRCode from 'qrcodejs2'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// window.$ = jquery;
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})