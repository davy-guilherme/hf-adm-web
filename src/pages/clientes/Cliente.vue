<template>
    <div class="cliente">
        <h1>{{ this.cliente[0] ? this.cliente[0].nome : '' }} <span>(Cliente)</span></h1>
        <p class="c-info">Este cliente ainda não realizou nenhuma compra</p>
        <form>
            <label class="f-label" for="email">Nome:</label>
            <input class="f-input" required type="text" v-model="formulario.nome" @change="$v.formulario.nome.$touch()" />
            <p class="f-erro" v-if="$v.formulario.nome.$error">Este campo é obrigatório</p>

            <label class="f-label" for="cpf">CPF:</label>
            <input class="f-input" required type="text" v-model="formulario.cpf" @change="$v.formulario.cpf.$touch()" />
            <p class="f-erro" v-if="$v.formulario.cpf.$error">Este campo é obrigatório</p>


            <label class="f-label" for="cpf">Nascimento:</label>
            <input class="f-input" required type="date" v-model="formulario.nascimento" @change="$v.formulario.nascimento.$touch()" />
            <p class="f-erro" v-if="$v.formulario.nascimento.$error">Este campo é obrigatório</p>

            <label class="f-label" for="telefone">Telefone:</label>
            <input class="f-input" required type="text" v-model="formulario.tel" @change="$v.formulario.tel.$touch()" />
            <p class="f-erro" v-if="$v.formulario.tel.$error">Este campo é obrigatório</p>



            <!--<button class="f-button">Salvar alterações</button>-->
            <button type="button" @click="voltar()" class="f-button btn-cancelar">Fechar</button>

        </form>

    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponenteCliente',
    data: () => ({
        clienteId : '',
        cliente : [],
        formulario: {
            nome: '',
            cpf: '',
            nascimento: '',
            tel: ''
        }
    }),
    validations : {
        formulario: {
            nome : { required },
            cpf : { required },
            nascimento : { required },
            tel: { required },
        }
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
                this.cliente.push({
                    key : data.val().key,
                    nome : data.val().nome,
                    cpf : data.val().cpf,
                    nascimento : data.val().nascimento,
                    tel : data.val().tel
                    /* ape : data.val().ape,
                    bicicleta: data.val().bicicleta,
                    moto: data.val().moto,
                    carro: data.val().carro */
                })

                this.formulario.nome = this.cliente[0].nome
                this.formulario.cpf = this.cliente[0].cpf
                this.formulario.nascimento = this.cliente[0].nascimento
                this.formulario.tel = this.cliente[0].tel
                /* this.formulario.ape = this.entregador[0].ape
                this.formulario.bicicleta = this.entregador[0].bicicleta
                this.formulario.moto = this.entregador[0].moto
                this.formulario.carro = this.entregador[0].carro */
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

form {
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
