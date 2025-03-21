<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<template>
  <div id="app">
    <img src="@/assets/logo.svg" alt="Vite logo" height="30px" width="30px" />
    <div>
      <router-link to="/">Home</router-link>
      -
      <router-link to="/foo">Go to Foo</router-link>
      -
      <router-link to="/bar">Go to Bar</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  body {
    margin: 0px !important;
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