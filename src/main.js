import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import AddProduct from './views/Add.vue'
// import router from './router'
import store from './store'

// const AddProduct = { template: '<div>Add prod</div>' }
// const Bar = { template: '<div>bar</div>' }
const ContatoEditar = { template: '<div>detalhe interno</div>' }

const extrairParametroId = route => ({
    id: +route.params.id
})

const routes = [
    { path: '/', component: Home },
    { path: '/add', component: AddProduct },
    // { path: '/bar', component: Bar },
    { 
      path: '/:id(\\d+)/details', 
      meta: { requerAutenticacao: true },
      beforeEnter(to, from, next) {
        console.log('beforeEnter')
        next()
      },
      components: {
        default: ContatoEditar,
      },
      props: {
        default: extrairParametroId,
      }
    },
]
const router = new VueRouter({
    routes
});

Vue.use(VueRouter)

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app')
