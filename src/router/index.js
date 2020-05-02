import Vue from 'vue'
import Router from 'vue-router'
import {
  Toast
} from 'vant'
import routes from '@/routes'
import store from 'store'
import {
  AUTO_LOGIN
} from "store/mutation_types";
Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}


let router = new Router({
  // mode: "history",
  routes,
  linkActiveClass: "active"
})


// 全局前置守卫判断登录状态,进行相关路由选择
router.beforeEach(async (to, from, next) => {
  // 这样写效率很低,每次路由切换都要去验证token是否过期,或者token是否正确
  await store.dispatch(AUTO_LOGIN)
  if (to.path !== '/login') {
    if (store.state.wrap.loginData._id) {
      next()
    } else {
      Toast.fail({
        message: '请先登录',
        duration: 2000,
        onClose() {
          next('/login')
        }
      })
    }
  } else {
    next()
  }
})

export default router
