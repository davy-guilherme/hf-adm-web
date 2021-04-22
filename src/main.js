import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta' //talvez remover?

import Vuelidate from 'vuelidate'

import FirebaseVue from './firebase'
import './assets/scss/app.scss'

import './utils/directives'



Vue.use(VueMeta)
Vue.use(Vuelidate)

Vue.use(FirebaseVue)
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
