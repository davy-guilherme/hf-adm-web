<template>
    <div>
        <h1>Páginas</h1>
        <adicionar-pagina />
        <div class="paginas">
          <div class="pagina" v-for="pagina in paginas" :key="pagina.nome">
            <p class="pagina-nome">{{ pagina.nome }}</p>
            <button type="button" class="btn-editar" @click="ver_pagina(pagina.id)">Editar</button>

          </div>
        </div>
    </div>
</template>

<script>
//import AdicionarPagina from './AdicionarPagina.vue'
export default {
  components: { /* AdicionarPagina*/ },
    name: 'Páginas',
    data: () => ({
      paginas: []
    }),
    created () {
       this.getData()

    },
    methods: {
      getData() {
        const ref = this.$firebase.database().ref('paginas')

        ref.on('value', snapshot => {
          const values = snapshot.val()
          this.paginas = Object.keys(values).map(i => values[i])
        })
      },
      ver_pagina (idPagina) {
        this.$router.push({ name: 'pagina', params: { id: idPagina } })
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

.paginas {
  width: 90%;
  padding: 0.5em 5%;

}

.pagina {
  background-color: #999;
  margin: 1em 0;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
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



</style>
