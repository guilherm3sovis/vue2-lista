<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-if="error">Erro: {{ error.message }}</div>
    <div v-if="dados">
      <div v-for="dado in dados">
        <p>{{ dado.id }} - {{ dado.title }} - {{ dado.price }}</p>
        <hr />
      </div>
    </div>
    <button @click="fetchDados">Carregar Dados</button>
  </div>
</template>

<script>
export default {
  computed: {
    dados() {
      return this.$store.state.dados;
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    fetchDados() {
      this.$store.dispatch('fetchDados'); // Dispara a action que faz a requisição
    }
  }
};
</script>
