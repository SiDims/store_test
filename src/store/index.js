import Vue from 'vue'
import Vuex from 'vuex'

import producrs from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    producrs
  }
})
