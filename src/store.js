import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    min: 0,
    max: 1001,
  },
  mutations: {
    increment (state) {
      console.log('call increment() on state')
      state.count++
    },
    setMin(state, min){
      console.log('call setMin() on state w/ value', min)
      state.min = min
    },
    setMax(state, max){
      console.log('call setMax() on state w/ value', max)
      state.max = max
    },
  },
  getters: {
    getCount(state) {
        return state.count;
    },
    getMin(state) {
      return state.min;
    },
    getMax(state) {
      return state.max;
    },
  }
})

export default store;
