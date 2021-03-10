<template>
    <div class="entregador">
        <h1>{{ this.entregador[0] ? this.entregador[0].nome : '' }} <span>(Entregador)</span></h1>

        <form @submit.prevent="submit()">
            <label class="f-label" for="email">Nome:</label>
            <input class="f-input" required type="text" v-model="formulario.nome" />

            <label class="f-label" for="cpf">CPF:</label>
            <input class="f-input" required type="text" v-model="formulario.cpf" />

            <label class="f-label" for="cpf">Nascimento:</label>
            <input class="f-input" required type="date" v-model="formulario.nascimento" />

            <label class="f-label" for="telefone">Telefone:</label>
            <input class="f-input" required type="text" v-model="formulario.tel" />

            <div class="os-checks">
                <p>Modalidades</p>
                <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.ape" />
                <label class="l" for="pedestre"> Pedestre</label><br>
                <input type="checkbox" id="bicicleta" name="bicicleta" v-model="formulario.bicicleta" />
                <label for="bicicleta"> Bicicleta</label><br>
                <input type="checkbox" id="moto" name="moto" v-model="formulario.moto" />
                <label for="moto"> Moto</label><br>
                <input type="checkbox" id="carro" name="carro" v-model="formulario.carro" />
                <label for="carro"> Carro</label><br>
            </div>

            <button class="f-button">Salvar alterações</button>
            <button type="button" @click="voltar()" class="f-button btn-cancelar">Fechar</button>

        </form>

    </div>
</template>

<script>
export default {
    name: 'ComponenteEntregador',
    data: () => ({
        entregadorId : '',
        entregador : [],
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
        }

    },
    created() {
        this.entregadorId = this.$route.params.id



        this.$firebase.database().ref(`entregadores/${this.entregadorId}`).once('value').then(
            (data) => {
                this.entregador.push({
                    key : data.val().key,
                    nome : data.val().nome,
                    cpf : data.val().cpf,
                    nascimento : data.val().nascimento,
                    tel : data.val().tel,
                    ape : data.val().ape,
                    bicicleta: data.val().bicicleta,
                    moto: data.val().moto,
                    carro: data.val().carro
                })

                this.formulario.nome = this.entregador[0].nome
                this.formulario.cpf = this.entregador[0].cpf
                this.formulario.nascimento = this.entregador[0].nascimento
                this.formulario.tel = this.entregador[0].tel
                this.formulario.ape = this.entregador[0].ape
                this.formulario.bicicleta = this.entregador[0].bicicleta
                this.formulario.moto = this.entregador[0].moto
                this.formulario.carro = this.entregador[0].carro
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        console.log(this.entregador)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

.entregador {
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

</style>
