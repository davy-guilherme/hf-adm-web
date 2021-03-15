<template>
    <div>
        <h1>Banners</h1>
        <adicionar-banner />
        <div class="banners">
          <div class="banner" v-for="banner in banners" :key="banner.id">
              <img :src="banner.arquivo" />

            <i class="far fa-eye ver" @click="ver_banner(banner.id)"></i>
          </div>
        </div>
    </div>
</template>

<script>
import AdicionarBanner from './AdicionarBanner.vue'
export default {
  components: { AdicionarBanner },
    name: 'Banners',
    data: () => ({
      banners: []
    }),
    created () {
       this.getData()

    },
    methods: {
      getData() {
        const ref = this.$firebase.database().ref('banners')

        ref.on('value', snapshot => {
          const values = snapshot.val()
          this.banners = Object.keys(values).map(i => values[i])
        })
      },
      ver_banner (idBanner) {
        this.$router.push({ name: 'banner', params: { id: idBanner } })
        //console.log(idEntregador)
      }
    }


}
</script>

<style scoped lang="scss">
/*
button {
    position: relative !important;
    margin: 0 auto !important;

}*/

h1 {
  padding: 0.5em 5%;
  text-align: left;
}

.banners {
  width: 90%;
  padding: 0.5em 5%;

}

.banner {
  background-color: #999;
  margin: 1em 0;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
  height: auto;
}

img {
  width: 90%;
}

.ver {
  position: absolute;
  right: 2%;
  top: 27%;
  font-size: 2.1em;
  cursor: pointer;
  color: white;
  &:hover {
    color: var(--dark-medium);
  }
}


</style>
