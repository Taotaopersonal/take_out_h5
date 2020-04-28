import http from "http"
import {
  GET_SELLER,
  GET_GOODS,
  GET_RATINGS,
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS
} from 'store/mutations_type'
const OK = 0
export default {
  async [GET_SELLER]({ commit }, id) {
    console.log(id,"actions")
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
  },
  async [GET_ADDRESS]({commit}) {
    const { code, data } = await http.wrap.getAddress()
    if (code === OK) {
      commit(GET_ADDRESS,data)
    }
  },
  async [GET_CATEGORIES]({commit}) {
    const { code, data } = await http.wrap.getCategories()
    if (code === OK) {
      commit(GET_CATEGORIES,data)
    }
  },
  async [GET_SHOPS]({commit}) {
    const { code, data } = await http.wrap.getShops()
    if (code === OK) {
      commit(GET_SHOPS,data)
    }
  }
}
