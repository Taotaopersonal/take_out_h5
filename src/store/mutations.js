import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS,
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS
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
  }
}
