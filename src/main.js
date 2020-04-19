import Vue from 'vue'
import App from './App.vue'
import http from '@/http'
import router from '@/router'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid';
//引入mock模拟数据库
import '@/mock'
//引入icon图标组件库
import 'common/stylus/icon.styl'
import Icon from 'components/ele-icon/ele-icon.vue'
//引入过渡样式库
import "common/stylus/transition.styl"

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.uuid = uuidv4
Vue.component("ele-icon",Icon)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
