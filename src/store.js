import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    min: 0,
    max: 1001,
    posts: [],
    filteredPosts: [],
  },
  mutations: {
    increment (state) {
      console.log('call increment() on state')
      state.count++
    },
    setMin(state, min) {
      console.log('call setMin() on state w/ value', min)
      state.min = min
    },
    setMax(state, max) {
      console.log('call setMax() on state w/ value', max)
      state.max = max
    },
    filterProducts(min, max) {
      console.log('Filtrando produtos:', min, max)
      // Filtra os produtos baseado nos valores min e max
      this.filteredPosts = this.posts.filter(
          product => product.price >= min && product.price <= max
      )
    },
    productsLoader(state, products) {
      state.filteredPosts = products;
      state.posts = products;
    }
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
    getProducts(state) {
      console.log(state.filteredPosts.products || state.posts.products);
      return state.filteredPosts.products || state.posts.products;
    }
  },
})

export default store;
