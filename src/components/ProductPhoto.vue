<!-- components/ProductPhoto.vue -->
<template>
  <div id="image-container">
    <img :src="image" alt="Imagem externa" width="220px" />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductPhoto',
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.image) // Verifique se a URL está correta
  },
})
</script>

<style scoped>
#image-container {}
</style>
