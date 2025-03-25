<template>
  <div class="products-table">
    <div v-if="loading">Carregando...</div>
    <div v-if="error" class="error">{{ error.message }}</div>
    
    <table v-if="dados">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dados" :key="item.id">
          <td>#{{ item.id }}</td>
          <td>
            <input
              v-if="editingId === item.id"
              v-model="editedProduct.name"
              type="text"
            >
            <span v-else>{{ item.name }}</span>
          </td>
          <td>
            <input
              v-if="editingId === item.id"
              v-model="editedProduct.price"
              type="number"
              step="0.01"
            >
            <span v-else>{{ item.price }}</span>
          </td>
          <td>
            <div class="actions">
              <template v-if="editingId === item.id">
                <button @click="saveEdit(item.id)" class="save">Save</button>
                <button @click="cancelEdit" class="cancel">Cancel</button>
              </template>
              <template v-else>
                <button @click="startEdit(item)" class="edit">Edit</button>
                <button @click="removeProduct(item.id)" class="delete">Delete</button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editingId: null,
      editedProduct: {
        name: '',
        price: ''
      }
    }
  },
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
    startEdit(product) {
      this.editingId = product.id;
      this.editedProduct = { ...product };
    },
    cancelEdit() {
      this.editingId = null;
      this.editedProduct = { name: '', price: '' };
    },
    async saveEdit(id) {
      try {
        await this.$store.dispatch('updateProduct', {
          id,
          product: this.editedProduct
        });
        this.editingId = null;
        this.editedProduct = { name: '', price: '' };
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async removeProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await this.$store.dispatch('deleteProduct', id);
          // Refresh the data after deletion
          await this.$store.dispatch('fetchDados');
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    }
  },
  created() {
    this.$store.dispatch('fetchDados');
  }
}
</script>

<style scoped>
.products-table {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit {
  background-color: #4CAF50;
  color: white;
}

.delete {
  background-color: #f44336;
  color: white;
}

.save {
  background-color: #2196F3;
  color: white;
}

.cancel {
  background-color: #607D8B;
  color: white;
}

.error {
  color: red;
  margin: 10px 0;
}
</style>