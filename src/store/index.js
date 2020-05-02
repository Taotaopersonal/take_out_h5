import Vue from 'vue'
import Vuex from 'vuex'
import merchant from 'store/modules/merchant'
import wrap from 'store/modules/wrap'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    merchant,
    wrap
  }
})
