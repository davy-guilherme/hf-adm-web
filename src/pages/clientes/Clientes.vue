<template>
    <div>
        <h1>Clientes</h1>
        <div class="clientes">
          <div class="buscar-clientes">
            <label for="buscar">Buscar em Clientes:</label>
            <input type="text" id="buscar" v-model="busca" @keyup="getData()" />
          </div>

          <div class="cliente" v-for="cliente in clientes_filtrados" :key="cliente.id" @click="ver_cliente(cliente.id)">

              <div class="info">
                <p>{{ cliente.nome }}</p>

              </div>

            <!--<i class="far fa-eye ver" @click="pedido(pedido.id)"></i>-->
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Clientes',
    data: () => ({
      busca: '',
      clientes: [],
      clientes_filtrados: [],
      usuarioAtual: ''
    }),
    created () {
       this.getData()

       window.addEventListener("resize", this.myEventHandler);

       this.myEventHandler()

       //this.usuarioAtual = this.$firebase.auth().currentUser.uid
       //console.log(this.usuarioAtual)

    },
    destroyed() {

      window.removeEventListener("resize", this.myEventHandler);

    },
    methods: {
      getData() {
        const ref = this.$firebase.database().ref('clientes')
        console.log('este')

        ref.on('value', snapshot => {
          const values = snapshot.val()
          this.clientes = Object.keys(values).map(i => values[i])


          //console.log(this.pedidos[1].nome)
          //this.produtos_filtrados = this.produtos.filter(this.produtos.nome)
          this.clientes_filtrados = []
          for (var i = 0; i < this.clientes.length; i++) {
              //if (this.produtos[i].nome == "banan") {
                if (this.clientes[i].nome.toUpperCase().includes(this.busca.toUpperCase())) {
                  this.clientes_filtrados.push(this.clientes[i]);

              }
          }
          console.log(this.clientes)

          //for (n.Object.keys(values) in this.produtos) {
            //if (n.nome == 'banan') {
            //  this.produtos_filtrados.push(n)
            //}
            //console.log(n)
          //}


        })
      },
      ver_cliente (idCliente) {
        this.$router.push({ name: 'cliente', params: { id: idCliente } })
        //console.log(idEntregador)
      },
      myEventHandler() {
        var larguraJanela = window.innerWidth
        if (larguraJanela >= 1199) {
          this.tamanho_img = (larguraJanela * 0.82) / 7
        } else if (larguraJanela >= 992) {
          this.tamanho_img = (larguraJanela * 0.82) / 6
        } else if (larguraJanela >= 768) {
          this.tamanho_img = (larguraJanela * 0.82) / 4
        } else if (larguraJanela >= 558) {
          this.tamanho_img = (larguraJanela * 0.82) / 3
        } else {
          this.tamanho_img = (larguraJanela * 0.82) / 2
        }



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

.clientes {
  width: 90%;
  padding: 1.5em 5%;
  display: table;
}

.buscar-clientes {
  width: 100%;
  display: table;
  margin-bottom: 1.5em;
  position: relative;
}

.buscar-clientes label {
  padding: 1%;
  font-size: 1.2em;

}

.buscar-clientes input {
  font-size: 1.2em !important;
  padding: 0.5em;
  width: calc(100% - 1em);
  margin-top: 0.2em;
}

.cliente {
  background-color: #999;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
  float: left;
  height: auto;
  width: calc(14.28% - 2em);
  cursor: pointer;
}

.info {
  min-height: 80px;
  font-size: 0.9em;
  margin-top: 0.2em;
}


@media (max-width: 1199.98px) {

.cliente {
  width: calc(15.6% - 1em);
  margin: 0.5%;
}



}

@media (max-width: 991.98px) {

.cliente {
  width: calc(24% - 1em);
  margin: 0.5%;
}

.info {
  min-height: 80px;
  font-size: 1em;
}


}

@media (max-width: 767.98px) {

.cliente {
  width: calc(30% - 1em);
  margin: 1%;
}



.info {
  min-height: 80px;
  font-size: 1.1em;
}


}

@media (max-width: 575.98px) {

.cliente {
  width: calc(47% - 1em);
  margin: 1%;
}

.info {
  min-height: 60px;
  font-size: 1.3em;
}

}




</style>
