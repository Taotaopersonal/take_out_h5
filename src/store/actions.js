import http from "http"
import Router from '@/router'
import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS,
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
  GET_LOGIN_INFO
} from 'store/mutations_type'
import {
  Toast
} from 'vant'
const OK = 0
const ERROR = 1

function LoginSuccess(commit, data, loginWay, tapChangeImg) {
  commit(GET_LOGIN_INFO, data)
  if (loginWay === "password") tapChangeImg()
  Toast.success({
    message: "登录成功",
    duration: 2000
  })
  Router.replace('/profile')
}

function LoginFail(loginWay, tapChangeImg) {
  if (loginWay === "password") tapChangeImg()
  Toast.fail({
    message: "登录失败，请重新登录！",
    duration: 2000
  })
}
export default {
  async [GET_SELLER]({
    commit
  }, id) {
    console.log(id, "actions")
    const {
      code,
      data
    } = await http.shop.getSeller()
    if (code === OK)
      commit(GET_SELLER, data)
  },
  async [GET_GOODS]({
    commit
  }) {
    const {
      code,
      data
    } = await http.shop.getGoods()
    if (code === OK)
      commit(GET_GOODS, data)
  },
  async [GET_RATINGS]({
    commit
  }) {
    const {
      code,
      data
    } = await http.shop.getRatings()
    if (code === OK)
      commit(GET_RATINGS, data)
  },
  async [GET_ADDRESS]({
    commit
  }) {
    const {
      code,
      data
    } = await http.wrap.getAddress()
    if (code === OK)
      commit(GET_ADDRESS, data)
  },
  async [GET_CATEGORIES]({
    commit
  }) {
    const {
      code,
      data
    } = await http.wrap.getCategories()
    if (code === OK)
      commit(GET_CATEGORIES, data)
  },
  async [GET_SHOPS]({
    commit
  }) {
    const {
      code,
      data
    } = await http.wrap.getShops()
    if (code === OK)
      commit(GET_SHOPS, data)
  },
  async [GET_LOGIN_INFO]({
    commit
  }, {
    loginWay,
    phone,
    code,
    name,
    pwd,
    captcha,
    tapChangeImg
  }) {
    let body = ''
    if (loginWay === "message") {
      body = await http.wrap.getLoginInfoBySms({
        phone,
        code
      })
    } else if (loginWay === "password") {
      body = await http.wrap.getLoginInfoByPwd({
        name,
        pwd,
        captcha
      })
    }
    if (body.code === OK) LoginSuccess(commit, body.data, loginWay, tapChangeImg)
    if (body.code === ERROR) LoginFail(loginWay, tapChangeImg)
  }
}
