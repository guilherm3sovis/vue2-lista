<script>
import { ref, defineComponent } from 'vue'
import axios from 'axios'

import ProductPhoto from './ProductPhoto.vue'

export default defineComponent({
  name: 'ListProducts',
  components: {
    ProductPhoto,
  },
  computed: {
    productsList() {
      return this.$store.getters.getProducts;
    }
  },
  methods: {
    async getPosts() {
        try {
            // Fazendo a requisição à API
            const response = await axios.get('https://fakestoreapi.com/products')
            // Atribuindo os dados à variável posts
            
            this.$store.commit('productsLoader', {products: response.data})
            // this.posts = response.data
            // this.filteredPosts = response.data
        } catch (error) {
            console.error('Erro ao buscar posts:', error)
        }
    },
  },
  mounted() {
    // Chama o método assim que o componente é montado
    console.log('mounted')
    this.getPosts()
  },
})
</script>
<!-- components/ListProducts.vue -->

<template>
  <div id="list-products">
    <!-- <pre>{{ productsList }}</pre> -->
    <div class="item-container" v-for="product in productsList" :key="product.id">
      <p>{{ product.title }}</p>
      <ProductPhoto :image="product.image" />
      <p>{{ product.price }}</p>
    </div>
  </div>
</template>

<style scoped>
  #list-products {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 600px;
    justify-self: center;
    margin-top: 24px;
  }

  .item-container {
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    justify-items: center;
    justify-self: center;
    border-radius: 1em;
    padding: 1em;
  }
</style>
