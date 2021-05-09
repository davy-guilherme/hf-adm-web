<template>
  <div>
    <h1>Gestão Comercial</h1>
    <!--<div id="pedidos-abertos">
      <p>Você tem 5 pedidos aguardando aprovacao</p>
      <p>Voce tem 5 pedidos aguardando o envio</p>
    </div>-->
    <div id="geral">

      <div class="box-geral box-geral-produtos-cadastrados">
        <p class="rotulo" @click="link_produtos()">Produtos Cadastrados</p>
        <p class="valor">{{ totalProdutosCadastrados }}</p>
      </div>

      <div class="box-geral box-geral-clientes">
        <p class="rotulo" @click="link_clientes()">Clientes Cadastrados</p>
        <p class="valor">{{ totalClientes }}</p>
      </div>

      <div class="box-geral box-geral-pedidos-separacao">
        <p class="rotulo">Pedidos em Separação</p>
        <p class="valor">{{ totalPedidosEmSeparacao }}</p>
      </div>

      <div class="box-geral box-geral-pedidos-transito">
        <p class="rotulo">Pedidos em Transito</p>
        <p class="valor">{{ totalPedidosEmTransito }}</p>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data: () => {
    return {
      totalClientes: '',
      totalPedidosEAbertos: '',
      totalPedidosEmTransito: '',
      totalPedidosEmSeparacao: '',
      totalProdutosCadastrados: '',
      totalProdutosAtivos: ''
    }
  },
  created () {
    this.getEstatisticas()
  },
  methods: {
    getEstatisticas () {
      this.$firebase.database().ref(`estatisticas`).once('value').then(
            (data) => {
                this.totalClientes = data.val().totalClientes
                this.totalPedidosEmAberto = data.val().totalPedidosEmAberto
                this.totalPedidosEmSeparacao = data.val().totalPedidosEmSeparacao
                this.totalPedidosEmTransito = data.val().totalPedidosEmTransito
                this.totalProdutosCadastrados = data.val().totalProdutosCadastrados
                this.totalProdutosAtivos = data.val().totalProdutosAtivos
                //console.log(data)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

    },
    link_clientes() {
      this.$router.push({ name: 'clientes'})
    },
    link_produtos() {
      this.$router.push({ name: 'produtos'})
    }
  }
}
</script>

<style scoped lang="scss">


h1 {
  padding: 0.5em 5%;
  text-align: left;
}
#pedidos-abertos {
  width: 90%;
  padding: 0 5%;

}

#geral {
  width: 90%;
  padding: 1em 5%;
  background-color: var(--light-low);
  display: table;
}

.box-geral {
  position: relative;
  float: left;
  width: calc(20% - 2em);
  margin: 0.5em;
  height: 110px;
  padding: 0.5em;
  background-color: white;
  border-radius: 0.5em;
  .rotulo {
    font-size: 1.1em;
    cursor: pointer;
  }
  .valor {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    font-size: 2em;
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 1199.98px) {



}

@media (max-width: 991.98px) {

.box-geral {
  width: calc(25% - 2em);
  margin: 0.5em;
  height: 115px;
  padding: 0.5em;
  .rotulo {
    font-size: 1.1em;
  }
  .valor {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    font-size: 2em;
  }
}

}

@media (max-width: 767.98px) {

.box-geral {
  width: calc(50% - 2em);
  margin: 0.5em;
  height: 120px;
  padding: 0.5em;
  .rotulo {
    font-size: 1.1em;
  }
  .valor {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    font-size: 2em;
  }
}


}

@media (max-width: 575.98px) {

/* .box-geral {
  position: relative;
  float: left;
  width: calc(100% - 2em);
  margin: 0.5em;
  height: 105px;
  padding: 0.5em;
  background-color: white;
  border-radius: 0.5em;
  .rotulo {
    font-size: 1.1em;
  }
  .valor {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    font-size: 2em;
    margin: 0;
    padding: 0;
  }
} */


}


</style>
