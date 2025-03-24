import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    dados: null, // Aqui você vai armazenar os dados da requisição
    loading: false, // Para controlar o carregamento
    error: null // Para capturar possíveis erros
  },
  mutations: {
    setDados(state, dados) {
      state.dados = dados; // Atualiza o estado com os dados da requisição
    },
    setLoading(state, loading) {
      state.loading = loading; // Atualiza o estado de carregamento
    },
    setError(state, error) {
      state.error = error; // Atualiza o estado com um possível erro
    }
  },
  actions: {
    async fetchDados({ commit }) {
      commit('setLoading', true); // Define o estado como "carregando"
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('setDados', response.data); // Quando a requisição for concluída, chama a mutation
      } catch (error) {
        commit('setError', error); // Em caso de erro, chama a mutation para definir o erro
      } finally {
        commit('setLoading', false); // Termina o estado de carregamento
      }
    }
  }
});

export default store;
