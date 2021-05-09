<template>
  <div id="app">
    <base-spinner />
    <layout-notification />
    <layout v-if="isLogged">
      <layout-navigation />
      <layout-top-bar />
      <router-view id="conteudo" />
    </layout>

    <!--<button @click="mostrarSpinner()">Mostrar Spinner</button>-->
    <router-view  v-else />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutNotification from './components/layout/LayoutNotification'
import LayoutTopBar from './components/layout/LayoutTopBar'


export default {
  name: 'AppComponente',
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification,
    LayoutTopBar
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

      /* if (!window.uid) {
        this.$router.push({ name : 'login' })

      }*/

      if (window.uid) {
        this.$router.push({ name : 'home' })

      } else {
        this.$router.push({ name : 'login' })
      }

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)


    })
  },
  /*metaInfo() {
    return {
      meta:
      {
        name: 'description',
        content: 'teste'
      }
    }
  }*/

}
</script>

<style lang="scss">


#conteudo {
  padding-top: 2.7em;
}

</style>
