<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Filters',
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
  inject: ['filterMethod'], // Injeta o método do componente pai
  computed: {
    count() {
      return this.$store.getters.getCount;
    },
    min() { 
      return this.$store.getters.getMin;
    },
    max() { 
      return this.$store.getters.getMax;
    }
  }
})
</script>

<template>
  <div id="filters">
    <input 
      value="min"
      type="number"
      placeholder="Mínimo"
      @change="$store.commit('setMin', $event.target.value)"
    />
    <input
      value="max"
      type="number"
      placeholder="Máximo"
      @change="$store.commit('setMax', $event.target.value)"
    />
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