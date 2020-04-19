import http from "http"
import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS
} from 'store/mutations_type'
const OK = 200
export default {
  async [GET_SELLER]({commit}) {
    const { code, data } = await http.shop.getSeller()
    if (code === OK) {
      commit(GET_SELLER,data)
    }
  },
  async [GET_GOODS]({commit}) {
    const { code, data } = await http.shop.getGoods()
    if (code === OK) {
      commit(GET_GOODS,data)
    }
  },
  async [GET_RATINGS]({commit}) {
    const { code, data } = await http.shop.getRatings()
    if (code === OK) {
      commit(GET_RATINGS,data)
    }
  }
}
