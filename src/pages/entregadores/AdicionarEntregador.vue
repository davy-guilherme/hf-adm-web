<template>
    <div>
        <button class="btn-add-entregador" @click="toogle_modal()">Adicionar Entregador</button>

        <div class="adicionar-entregador-fundo" :class="{ ativo : showModal }">
            <form @submit.prevent="submit()" class="box-adicionar-entregador">
                <i class="far fa-times-circle" id="fechar-modal" @click="toogle_modal()"></i>
                <h1>Entregador</h1>
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

                <button class="f-button">Adicionar</button>
                <button type="button" @click="toogle_modal()" class="f-button btn-cancelar">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name : 'AdicionarEntregador',
    data: () => ({
        showModal: false,
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
        toogle_modal() {
            this.showModal = !this.showModal
        },
        submit () {
            this.$root.$emit('Spinner::show')
            //console.log('enviou')
            //colocar o firebase em jogo! (soh na funcao, talvez???)
            //const referencia = this.$firebase.database().ref('entregadores/' + window.uid) // acessa o id de usuario que ja existe OU cria um novo
            const referencia = this.$firebase.database().ref('entregadores')
            const id = referencia.push().key
            const payload = {
                id : id,
                nome : this.formulario.nome,
                cpf : this.formulario.cpf,
                nascimento: this.formulario.nascimento,
                tel: this.formulario.tel,
                ape: this.formulario.ape,
                bicicleta: this.formulario.bicicleta,
                moto: this.formulario.moto,
                carro: this.formulario.carro,
                criadoEm : new Date().getTime()
            }

            referencia.child(id).set(payload, err => {
                if (err) {
                    //chamar a notificacao
                    this.$root.$emit('Notification::show', {
                        type: 'n-erro',
                        message: 'Não foi possível cadastrar o novo entregador. Por favor, tente novamente.'
                    })
                } else {
                    this.$root.$emit('Notification::show', {
                        type: 'n-sucesso',
                        message: 'O novo entregador foi cadastrado com sucesso.'
                    })
                    this.toogle_modal()
                }
            })

            this.$root.$emit('Spinner::hide')

        }
    }

}
</script>

<style scoped lang="scss">

.btn-add-entregador {
    margin:0 auto !important;
    display:block !important;
    color: white;

}

.adicionar-entregador-fundo {
    top: 0;
    right: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    color: white;
    z-index: 900;
    background-color: rgba(255, 255, 255, 0.8);
    display: none;
    overflow: scroll;
}

.box-adicionar-entregador {
    width: 70%;
    height: auto;
    position: absolute;
    left: 13%;
    top: 9%;
    background-color: var(--dark-low);
    color: white;
    border-radius: 0.7em;
    padding: 1.5em 2%;
}

.ativo {
    display: block;
}

#fechar-modal {
    position: absolute;
    right: 2.5%;
    top: 1.1em;
    cursor: pointer;
    font-size: 1.9em;
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

@media (max-width: 1199.98px) {

.box-adicionar-entregador {
    width: 70%;
    left: 13%;
    top: 9%;
    padding: 1.5em 2%;
}

#fechar-modal {
    font-size: 1.7em;
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



}

@media (max-width: 991.98px) {

}

@media (max-width: 767.98px) {


}

@media (max-width: 575.98px) {

}


</style>
