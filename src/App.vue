<template>
  <div id="app">
    <base-spinner />
    <layout v-if="isLogged">
      <layout-navigation />
      <router-view id="conteudo" />
    </layout>

    <!--<button @click="mostrarSpinner()">Mostrar Spinner</button>-->
    <router-view  v-else />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'

export default {
  name: 'AppComponente',
  components: {
    BaseSpinner,
    LayoutNavigation
  },
  data: () => ({
    isLogged: false
  }),
  methods: {
    //mostrarSpinner() {
     // this.$root.$emit('Spinner::show')
    //}

  },
  mounted () {
    //console.log(this.$firebase)
    this.$firebase.auth().onAuthStateChanged(user => {
      //operacao ternaria
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      if (window.uid) {
        this.$router.push({ name : 'home' })

      } else {
        this.$router.push({ name : 'login' })
      }
      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)


    })
  }

}
</script>

<style lang="scss">

#conteudo {
  margin-top: 2.7em;
}

</style>
