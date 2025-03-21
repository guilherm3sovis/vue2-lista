import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
// import router from './router'
import store from './store'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const ContatoEditar = { template: '<div>detalhe interno</div>' }

const extrairParametroId = route => ({
    id: +route.params.id
})

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/', component: Home },
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
