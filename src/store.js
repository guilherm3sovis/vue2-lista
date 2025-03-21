import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
        console.log('call increment() in state')
      state.count++
    }
  },
  getters: {
    getCount(state) {
        return state.count;
    }
  }
})

export default store;
