<template>
    <div class="produto">
        <h1>{{ this.produto[0] ? this.produto[0].nome : '' }} <span>(Produto)</span></h1>


    </div>
</template>

<script>
//import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponenteProduto',
    data: () => ({
        produtoId : '',
        produto : [],
        formulario: {
            nome: '',
            cpf: '',
            nascimento: '',
            tel: '',
            ape: false,
            bicicleta: false,
            moto: false,
            carro: false
        }
    }),
    methods: {
        voltar () {
            this.$router.go(-1)
        },
        submit () {

            if (!this.$v.$invalid) {
                this.$root.$emit('Spinner::show')
                //console.log('enviou')
                //colocar o firebase em jogo! (soh na funcao, talvez???)
                //const referencia = this.$firebase.database().ref('entregadores/' + window.uid) // acessa o id de usuario que ja existe OU cria um novo
                const referencia = this.$firebase.database().ref(`produtos/${this.produtoId}`)
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
                            message: 'Não foi possível alterar o produto'
                        })
                    } else {
                        this.$root.$emit('Notification::show', {
                            type: 'n-sucesso',
                            message: 'O produto foi alterado com sucesso.'
                        })
                        this.$router.go(-1)
                    }
                })

                this.$root.$emit('Spinner::hide')
            } else {
                this.$v.$touch()
            }
        }

    },
    created() {
        this.produtoId = this.$route.params.id



        this.$firebase.database().ref(`produtos/${this.produtoId}`).once('value').then(
            (data) => {
                this.produto.push({
                    key : data.val().key,
                    nome : data.val().nome

                })

                this.formulario.nome = this.produto[0].nome
                //this.formulario.cpf = this.entregador[0].cpf
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        console.log(this.produto)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

.produto {
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
