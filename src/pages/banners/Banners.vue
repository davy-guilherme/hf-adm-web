<template>
    <div>
        <h1>Banners</h1>
        <adicionar-banner />
        <div class="banners">
          <div class="banner" v-for="banner in banners" :key="banner.id">
              <div class="banner-img">
                <img :src="banner.arquivo" />
              </div>
              <div class="banner-txt">
                <p class="banner-titulo">{{ banner.nome }}</p>
                <button type="button" class="btn-editar" @click="ver_banner(banner.id)">Editar</button>
              </div>

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
  width: calc(100% - 1em);
  display: table;
}

.banner-img {
  width: 49%;
  position: relative;
  float: left;
}

img {
  width: 100%;
  z-index: 2;
}

.banner-txt {
  width: 49%;
  position: relative;
  float: right;
}

.banner-titulo {
  font-size: 1.9em;
}

.btn-editar {
  padding: 0.4em 0.8em;
  border-radius: 0.3em;
  margin-top: 1em;
  background-color: var(--light-medium);
  font-size: 1.1em;
  &:hover {
    background-color: var(--dark-low);
  }
}


@media (max-width: 1199.98px) {




}

@media (max-width: 991.98px) {

.banner-img {
  width: 100%;

}


.banner-txt {
  width: 100%;

}

.banner-titulo {
  font-size: 1.6em;
}

.btn-editar {
  font-size: 1em;
}


}

@media (max-width: 767.98px) {




}

@media (max-width: 575.98px) {

.banner-titulo {
  font-size: 1.5em;
}

.btn-editar {
  font-size: 0.9em;
}

}


</style>
