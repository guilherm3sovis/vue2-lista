import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const baseUrl = "http://localhost:8080/api" // API Java
const baseProductsUrl = `${baseUrl}/products`

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
        const response = await axios.get(baseProductsUrl);
        commit('setDados', response.data); // Quando a requisição for concluída, chama a mutation
      } catch (error) {
        commit('setError', error); // Em caso de erro, chama a mutation para definir o erro
      } finally {
        commit('setLoading', false); // Termina o estado de carregamento
      }
    },
    async addProduct({ commit }, product) {
      commit('setLoading', true);
      commit('setError', null);
      
      try {
        const response = await axios.post(baseProductsUrl, product);
        commit('setDados', response.data);
        return response.data;
      } catch (error) {
        commit('setError', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    async updateProduct({ commit, dispatch }, { id, product }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        await axios.put(`${baseProductsUrl}/${id}`, product);
        // Fetch fresh data after update
        await dispatch('fetchDados');
      } catch (error) {
        commit('setError', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    async deleteProduct({ commit, dispatch }, id) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        await axios.delete(`${baseProductsUrl}/${id}`);
        // Fetch fresh data after deletion
        await dispatch('fetchDados');
      } catch (error) {
        commit('setError', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    }
  }
});

export default store;
