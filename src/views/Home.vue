
<script>
    import Filters from "../components/Filters.vue"
    import ListProducts from "../components/ListProducts.vue"

    export default {
        name: "Home",
        components: {
            Filters,
            ListProducts,
        },
        computed: {
            count() {
                return this.$store.getters.getCount;
            }
        }
    }
</script>

<template>
    <div>
        <Filters />
        <button @click="$store.commit('increment')">call vuex store {{ count }}</button>
        <ListProducts /> 
    </div>
</template>