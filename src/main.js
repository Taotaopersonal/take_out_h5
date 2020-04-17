import Vue from 'vue'
import App from './App.vue'
import http from '@/http'
import router from '@/router'
import store from '@/store'
import '@/mock'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')