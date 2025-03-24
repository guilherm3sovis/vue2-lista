<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<template>
  <div id="app">
    <div class="menu-contain">
      <router-link to="/">Lista</router-link>
      |
      <router-link to="/add">Add Product</router-link>
    </div>

    <!-- carregamento de rotas -->
    <router-view></router-view>
  </div>
</template>

<style>
  body {
    margin: 0px !important;
  }
  .menu-contain a,
  .menu-contain a:visited {
    text-decoration: underline;
    color: #242424;
  }
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