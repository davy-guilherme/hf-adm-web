import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
  },
  {
    path: '/entregadores',
    name: 'entregadores',
    component: () => import(/* webpackChunkName: "entregadores" */ '../pages/entregadores/Entregadores')
  },
  {
    path: '/entregador/:id',
    name: 'entregador',
    component: () => import(/* webpackChunkName: "entregador" */ '../pages/entregadores/Entregador')
  },
  {
    path: '/banners',
    name: 'banners',
    component: () => import(/* webpackChunkName: "banners" */ '../pages/banners/Banners')
  },
  {
    path: '/banner/:id',
    name: 'banner',
    component: () => import(/* webpackChunkName: "banner" */ '../pages/banners/Banner')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import(/* webpackChunkName: "produtos" */ '../pages/produtos/Produtos')
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: () => import(/* webpackChunkName: "produto" */ '../pages/produtos/Produto')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "pedidos" */ '../pages/pedidos/Pedidos')
  },
  {
    path: '/pedido/:id',
    name: 'pedido',
    component: () => import(/* webpackChunkName: "pedido" */ '../pages/pedidos/Pedido')
  },
  {
    path: '/paginas',
    name: 'paginas',
    component: () => import(/* webpackChunkName: "paginas" */ '../pages/paginas/Paginas')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import(/* webpackChunkName: "clientes" */ '../pages/clientes/Clientes')
  },
  {
    path: '/cliente/:id',
    name: 'cliente',
    component: () => import(/* webpackChunkName: "cliente" */ '../pages/clientes/Cliente')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!window.uid && to.name != 'login') {
    next({ name : 'login' })
  } else {
    next()
  }
})

export default router
