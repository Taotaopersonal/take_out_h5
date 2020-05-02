import {
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
  GET_LOGIN_INFO,
  RESET_LOGIN_INFO,
  AUTO_LOGIN
} from 'store/mutation_types'
export default {
  [GET_ADDRESS](state, addressObj) {
    state.addressObj = addressObj
  },
  [GET_CATEGORIES](state, categories) {
    state.categories = categories
  },
  [GET_SHOPS](state, shops) {
    state.shops = shops
  },
  [GET_LOGIN_INFO](state, userInfo) {
    state.loginData = userInfo
    // 每次切换登录时,将仓库中的token替换掉
    state.token = userInfo.token
  },
  [RESET_LOGIN_INFO](state) {
    state.loginData = {}
    state.token = ''
  },
  [AUTO_LOGIN](state, userInfo) {
    state.loginData = userInfo
  }
}
