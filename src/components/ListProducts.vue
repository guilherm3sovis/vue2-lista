<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-if="error">Erro: {{ error.message }}</div>
    <div v-if="dados" class="products-grid">
      <div class="product-link" v-for="dado in dados">
        <a v-bind:href="'/' + dado.id + '/details'" class="product-container">
          <!-- <img :src="'https://picsum.photos/id/' + dado.id + '/220'" /> -->
          <img :src="'https://via.assets.so/furniture.png?id=' + dado.id + '&q=95&w=360&h=360&fit=fill'" />
          <div class="product-info">
            <div class="product-name">{{ dado.name }}</div>
            <div class="product-price">{{ dado.price }}</div>
          </div>
        </a>
      </div>
    </div>
    <button @click="fetchDados">Carregar Dados</button>
  </div>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-link {
  margin-bottom: 0;
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.product-container {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: white;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-container:hover .product-info {
  opacity: 1;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

.product-name, .product-price {
  padding: 5px;
  text-align: center;
}
</style>

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
  },
  mounted() {
    this.fetchDados(); // Chama a função para buscar os dados quando o componente é montado
  }
};
</script>
