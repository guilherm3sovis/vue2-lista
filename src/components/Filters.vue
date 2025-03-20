<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Filters',
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localMax: this.max,
      localMin: this.min
    }
  },
  beforeCreate: function() {

  },
  created: function() {

  },
  beforeMount: function() {

  },
  mounted: function() {
    this.localMin = this.min
    this.localMax = this.max
  },
  beforeDestroy: function () {

  },
  destroyed: function() {

  },
  beforeUpdate: function() {

  },
  updated: function() {

  },
  methods: {
    applyFilter() {
      // Acessa o método do pai usando a inject API
      if (this.filterMethod) {
        this.filterMethod(this.localMin, this.localMax);
      }
    }
  },
  watch: {
    max(newValue) {
      this.localMax = newValue
    },
    min(newValue) {
      this.localMin = newValue
    }
  },
  inject: ['filterMethod'] // Injeta o método do componente pai
})
</script>

<template>
  <div id="filters">
    <input type="number" placeholder="Mínimo" v-model.number="localMin" />
    <input type="number" placeholder="Máximo" v-model.number="localMax" />
    <button @click="applyFilter">Aplicar</button>
  </div>
</template>

<style scoped>
#filters {
  display: flex;
  gap: 1em;
  justify-content: center;
  margin: 1em 0px;
}
</style>