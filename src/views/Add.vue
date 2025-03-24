<template>
  <div class="add-product">
    <h2>Add New Product</h2>
    <form @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="name">Product Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="product.name" 
          required
        >
      </div>
      
      <div class="form-group">
        <label for="price">Price:</label>
        <input 
          type="number" 
          id="price" 
          v-model="product.price" 
          step="0.01" 
          required
        >
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Adding...' : 'Add Product' }}
        </button>
      </div>

      <div v-if="error" class="error">
        {{ error.message }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        price: ''
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    async submitProduct() {
      try {
        await this.$store.dispatch('addProduct', this.product);
        // Reset form after successful submission
        this.product = {
          name: '',
          price: ''
        };
        // Optionally redirect to products list
        this.$router.push('/');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  }
}
</script>

<style scoped>
.add-product {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>