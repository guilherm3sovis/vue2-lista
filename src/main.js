import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import AddProduct from './views/Add.vue'
import ListProduct from './views/List.vue'
// import router from './router'
import store from './store'

const InternProduct = { template: '<div>detalhe interno</div>' }

const extrairParametroId = route => ({
    id: +route.params.id
})

const routes = [

    { path: '/', component: Home },
    { path: '/add', component: AddProduct },
    { path: '/list', component: ListProduct },
    { 
      path: '/:id(\\d+)/details', 
      meta: { requerAutenticacao: true },
      beforeEnter(to, from, next) {
        console.log('beforeEnter')
        next()
      },
      component: InternProduct,
      props: extrairParametroId
    },
]
const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.use(VueRouter)

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app')
