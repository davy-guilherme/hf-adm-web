<template>
    <div class="cliente">
        <h1>{{ this.cliente ? this.cliente.nome : '' }} <span>(Cliente)</span></h1>
        <p v-if="pedidos.length > 0" class="c-info">Este cliente realizou {{ this.pedidos.length }} {{ this.pedidos.length === 1 ? 'pedido' : 'pedidos' }}.</p>
        <p v-else class="c-info">Este cliente ainda não realizou nenhum pedido.</p>
        <div class="info">
            <p>E-mail: {{ this.cliente.email }}</p>
            <p>Tipo de Cliente: {{ this.cliente.tipoCliente }}</p>

        <!--<button class="f-button">Salvar alterações</button>-->
            <button type="button" @click="voltar()" class="f-button btn-cancelar">Fechar</button>

        </div>

    </div>
</template>

<script>
// import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponenteCliente',
    data: () => ({
        clienteId : '',
        cliente : [],
        formulario: {

        },
        pedidos: []
    }),
    validations : {

    },
    computed: {
        cpfMask() {
            return this.formulario.cpf
        },
        telMask() {
            return this.formulario.tel
        }
    },
    watch: {
        cpfMask () {
           this.formulario.cpf = this.formulario.cpf.replace(/\D+/g, '')
           .replace(/([0-9]{3})([0-9])/, '$1.$2')
           .replace(/([0-9]{3}).([0-9]{3})([0-9])/, '$1.$2.$3')
           .replace(/([0-9]{3}).([0-9]{3}).([0-9]{3})([0-9])/, '$1.$2.$3-$4')
           .replace(/(-[0-9]{2})[0-9]$/, '$1')

        },
        telMask () {
            this.formulario.tel = this.formulario.tel.replace(/\D+/g, '')
            .replace(/([0-9]{2})([0-9])/, '($1) $2')
            .replace(/([0-9]{4})([0-9])/, '$1-$2')
            .replace(/([0-9]{4})-([0-9])([0-9]{4})/, '$1$2-$3')
            .replace(/(-[0-9]{4})[0-9]$/, '$1')
        }
    },
    methods: {
        voltar () {
            this.$router.go(-1)
        }
        /* submit () {

            if (!this.$v.$invalid) {
                this.$root.$emit('Spinner::show')
                //console.log('enviou')
                //colocar o firebase em jogo! (soh na funcao, talvez???)
                //const referencia = this.$firebase.database().ref('entregadores/' + window.uid) // acessa o id de usuario que ja existe OU cria um novo
                const referencia = this.$firebase.database().ref(`entregadores/${this.entregadorId}`)
                const payload = {
                    id : this.entregadorId,
                    nome : this.formulario.nome,
                    cpf : this.formulario.cpf,
                    nascimento: this.formulario.nascimento,
                    tel: this.formulario.tel,
                    ape: this.formulario.ape,
                    bicicleta: this.formulario.bicicleta,
                    moto: this.formulario.moto,
                    carro: this.formulario.carro,
                }

                console.log(payload)
                console.log(referencia)

                referencia.set(payload, err => {
                    if (err) {
                        //chamar a notificacao
                        this.$root.$emit('Notification::show', {
                            type: 'n-erro',
                            message: 'Não foi possível alterar o entregador'
                        })
                    } else {
                        this.$root.$emit('Notification::show', {
                            type: 'n-sucesso',
                            message: 'O entregador foi alterado com sucesso.'
                        })
                        this.$router.go(-1)
                    }
                })

                this.$root.$emit('Spinner::hide')
            } else {
                this.$v.$touch()
            }
        } */

    },
    created() {
        this.clienteId = this.$route.params.id



        this.$firebase.database().ref(`clientes/${this.clienteId}`).once('value').then(
            (data) => {
                this.cliente = data.val()

                const values = data.val().pedidos
                this.pedidos = Object.keys(values).map(i => values[i])

                console.log(this.pedidos)

            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        //console.log(this.entregador)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

.cliente {
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

.c-info {
  padding: 1em 5%;
}

.info {
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
