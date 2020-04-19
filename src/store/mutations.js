import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS
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
  }
}
