import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS,
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
  GET_LOGIN_INFO
} from 'store/mutations_type'
export default {
  [GET_SELLER](state, seller) {
    state.seller = seller
  },
  [GET_GOODS](state, goods) {
    state.goods = goods
  },
  [GET_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  [GET_ADDRESS](state, addressObj) {
    state.addressObj = addressObj
  },
  [GET_CATEGORIES](state, categories) {
    state.categories = categories
  },
  [GET_SHOPS](state, shops) {
    state.shops = shops
  },
  [GET_LOGIN_INFO](state, data) {
    state.loginData = data
  }
}
