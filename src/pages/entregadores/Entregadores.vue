<template>
    <div>
        <h1>Entregadores</h1>
        <adicionar-entregador />
        <div class="entregadores">
          <div class="entregador" v-for="entregador in entregadores" :key="entregador.id">
            <p class="entregador-nome">{{ entregador.nome }}</p>
            <p class="entregador-telefone"></p>
            <div class="entregador-mod">
                <i v-if="entregador.ape == true" class="fas fa-walking"></i>
                <i v-if="entregador.bicicleta == true" class="fas fa-bicycle"></i>
                <i v-if="entregador.moto == true" class="fas fa-motorcycle"></i>
                <i v-if="entregador.carro == true" class="fas fa-car"></i>
            </div>
            <i class="far fa-eye ver" @click="ver_entregador(entregador.id)"></i>
          </div>
        </div>
    </div>
</template>

<script>
import AdicionarEntregador from './AdicionarEntregador.vue'
export default {
  components: { AdicionarEntregador },
    name: 'Entregadores',
    data: () => ({
      entregadores: []
    }),
    created () {
       this.getData()

    },
    methods: {
      getData() {
        const ref = this.$firebase.database().ref('entregadores')

        ref.on('value', snapshot => {
          const values = snapshot.val()
          this.entregadores = Object.keys(values).map(i => values[i])
        })
      },
      ver_entregador (idEntregador) {
        this.$router.push({ name: 'entregador', params: { id: idEntregador } })
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

.entregadores {
  width: 90%;
  padding: 0.5em 5%;

}

.entregador {
  background-color: #999;
  margin: 1em 0;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
}

.entregador-mod i {
  font-size: 1.8em;
  margin-right: 0.5em;
  color: #fff;

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
