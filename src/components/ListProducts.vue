<script>
import { ref, defineComponent } from 'vue'
import ProductPhoto from './ProductPhoto.vue'

export default defineComponent({
  name: 'ListProducts',
  components: {
    ProductPhoto,
  },
  props: {
    productsList: {
      type: Array,
      required: true,
    },
    msg: {
      type: String,
      required: false,
    },
  },
})
</script>
<!-- components/ListProducts.vue -->

<template>
  <div id="list-products">
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
