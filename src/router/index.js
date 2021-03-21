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
