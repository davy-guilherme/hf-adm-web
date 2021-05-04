<template>
    <div class="pedido">
        <h1>{{ this.pedido ? this.pedido.id : '' }} <span>(Pedido)</span></h1>

        <div class="gerenciar margem">
            <p>Status do Pedido: {{ this.pedido.statusPedido }}</p>
        </div>

        <div class="info_cliente margem">
            <p class="titulo">Cliente</p>
            <p @click="mostrarCliente(pedido.cliente.id)">{{ this.pedido.cliente.nome }}</p>
        </div>

        <div class="info_entrega margem">
            <p class="titulo">Entrega</p>
            <p>{{ this.pedido.entrega.endereco }}, {{ this.pedido.entrega.numero }} - {{ this.pedido.entrega.bairro }} - {{ this.pedido.entrega.cidade }} - {{ this.pedido.entrega.estado }}</p>
            <p>CEP: {{ this.pedido.entrega.cep }}</p>
        </div>

        <div class="info_itens margem">
            <p class="titulo">Itens</p>
            <div class="item" v-for="item in pedido.itens" :key="item.id">
                {{ item.id }} - {{ item.nome}} - {{ item.qtd }}
            </div>
        </div>

    </div>
</template>

<script>
// import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponentePedido',
    data: () => ({
        pedidoId : '',
        pedido : '',
        formulario: {

        }
    }),
    validations : {

    },
    computed: {

    },
    watch: {

    },
    methods: {
        mostrarCliente(idCliente) {
            console.log('foi')
            this.$router.push({ name: 'cliente', params: { id: idCliente } })
        },
        voltar () {
            this.$router.go(-1)
        }

    },
    created() {
        this.pedidoId = this.$route.params.id

        console.log(this.produtos)


        this.$firebase.database().ref(`pedidos/${this.pedidoId}`).once('value').then(
            (data) => {
              console.log(data.val().id)
              this.pedido = data.val()
                /*this.pedido.push({


                    key : data.val().key,
                    cliente: {
                        nome: data.val().cliente.nome,
                        id: data.val().cliente.id
                    }



                this.formulario.nome = this.pedido[0].nome
                this.formulario.cpf = this.pedido[0].cpf
                this.formulario.nascimento = this.pedido[0].nascimento
                this.formulario.tel = this.pedido[0].tel
                this.formulario.ape = this.pedido[0].ape
                this.formulario.bicicleta = this.pedido[0].bicicleta
                this.formulario.moto = this.pedido[0].moto
                this.formulario.carro = this.pedido[0].carro })*/
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        //console.log(this.pedido)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

.pedido {
    background-color: #ddd;
    width: 100% !important;
    min-height: 100vh; //nao ta muito bacana
}

h1 {
  padding: 0.5em 5%;
  text-align: left;
}

h1 span {
    font-size: 70%;
}

.margem {
    padding: 1em 5%;
}

.f-label {
    display: block;
    margin-top: 0.5em;
}

.f-input {
    display: block;
    width: 98%;
    border-radius: 0.3em;
    border: none;
    padding: 1%;

}

.f-button {
    color: var(--ligther);
    margin-top: 0.6em;
    margin-left: 1.5em;
    float: right;
}

.os-checks {
    margin-top: 1em;
}

.f-erro {
    color: red;
    font-size: 0.9em;
    padding: 0.3em 0;
    text-align: left;
    width: 100%;
    margin-bottom: 0.5em;
}

</style>
