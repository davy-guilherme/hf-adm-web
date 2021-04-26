<template>
  <div>
    <h1>Gestão Comercial</h1>
    <!--<div id="pedidos-abertos">
      <p>Você tem 5 pedidos aguardando aprovacao</p>
      <p>Voce tem 5 pedidos aguardando o envio</p>
    </div>-->
    <div id="geral">
      <div class="box-geral box-geral-clientes">
        <p class="rotulo">Clientes Cadastrados</p>
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
      totalPedidosEmSeparacao: ''
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
                //console.log(data)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

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
  width: calc(20% - 1em);
  margin: 0.5em;
  padding: 0.5em;
  background-color: white;
  border-radius: 0.5em;
  .rotulo {
    height: 70px;
  }
}


</style>
