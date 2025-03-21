
<script>
    import Filters from "../components/Filters.vue";
    import ListProducts from "../components/ListProducts.vue";
    import axios from 'axios'

    export default {
        name: "Home",
        components: {
            Filters,
            ListProducts,
        },
        data() {
            return {
                minValue: 0,
                maxValue: 100,
                posts: [],
                filteredPosts: [],
                maxPrice: 1000,
            };
        },
        methods: {
            async getPosts() {
                try {
                    // Fazendo a requisição à API
                    const response = await axios.get('https://fakestoreapi.com/products')
                    // Atribuindo os dados à variável posts
                    this.posts = response.data
                    this.filteredPosts = response.data
                    
                    // Encontrar o maior preço para definir o max inicial
                    if (this.posts.length > 0) {
                        const maxPrice = Math.max(...this.posts.map(product => product.price))
                        this.maxPrice = Math.ceil(maxPrice)
                    }
                } catch (error) {
                    console.error('Erro ao buscar posts:', error)
                }
            },
            filterProducts(min, max) {
                console.log('Filtrando produtos:', min, max)
                // Filtra os produtos baseado nos valores min e max
                this.filteredPosts = this.posts.filter(
                    product => product.price >= min && product.price <= max
                )
            },
            applyFilter(min, max) {
                console.log('Filtros aplicados:', min, max);
            },
        },
        provide() {
            // Fornece o método filterProducts para componentes filhos
            return {
                filterMethod: this.filterProducts
            }
        },
        mounted() {
            // Chama o método assim que o componente é montado
            this.getPosts()
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
        <Filters 
            ref="filtersComponent"
        />

        <button @click="$store.commit('increment')">call vuex store</button>
        <p>{{ count }}</p>
        
        <ListProducts :productsList="filteredPosts" /> 
    </div>
</template>