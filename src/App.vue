<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import Filters from './components/Filters.vue'
import ListProducts from './components/ListProducts.vue'

export default defineComponent({
  name: 'App',
  components: {
    Filters,
    ListProducts,
  },
  methods: {
    async getPosts() {
      try {
        // Fazendo a requisição à API
        const response = await axios.get('https://fakestoreapi.com/products')
        // Atribuindo os dados à variável posts
        this.posts = response.data
        this.filteredPosts = response.data
        
        // Encontrar o maior preço para definir o max inicial
        if (this.posts.length > 0) {
          const maxPrice = Math.max(...this.posts.map(product => product.price))
          this.maxPrice = Math.ceil(maxPrice)
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      }
    },
    filterProducts(min, max) {
      console.log('Filtrando produtos:', min, max)
      // Filtra os produtos baseado nos valores min e max
      this.filteredPosts = this.posts.filter(
        product => product.price >= min && product.price <= max
      )
    }
  },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      maxPrice: 1000, // valor padrão que será atualizado após carregar os produtos
    }
  },
  mounted() {
    // Chama o método assim que o componente é montado
    this.getPosts()
  },
  provide() {
    // Fornece o método filterProducts para componentes filhos
    return {
      filterMethod: this.filterProducts
    }
  }
})
</script>

<template>
  <div id="app">
    <img src="@/assets/logo.svg" alt="Vite logo" height="30px" width="30px" />
    <Filters 
      :min="0" 
      :max="maxPrice" 
      ref="filtersComponent"
    />
    <ListProducts :productsList="filteredPosts" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
  padding: 24px;
}
</style>