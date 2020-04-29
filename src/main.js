import Vue from 'vue'
import App from './App.vue'
import http from '@/http'
import router from '@/router'
import store from '@/store'
import {
  v4 as uuidv4
} from 'uuid';
import BScroll from "better-scroll";
//引入lodash
import lodash from "lodash"
//引入mock模拟数据库
import '@/mock'
import Icon from 'components/ele-icon/ele-icon.vue'
import Star from 'components/ele-star/ele-star.vue'
//引入过渡样式库
import "common/stylus/transition.styl"
// 注册为全局组件标签
import split from 'components/ele-split/ele-split.vue'
// 注册全局组件头部
import HeaderTop from 'components/Header/Header.vue'
// 定义数据通信总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.uuid = uuidv4
// 将lodash注册成为全局工具
Vue.prototype._ = lodash
Vue.prototype.BScroll = BScroll
Vue.component("ele-icon", Icon)
Vue.component("ele-star", Star)
Vue.component('ele-split', split)
Vue.component('header-top', HeaderTop)
//处理时间的过滤器
import '@/filters'
//处理表单的验证器
import '@/validate'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
