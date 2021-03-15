<template>
    <div class="banner">
        <h1>{{ this.banner[0] ? this.banner[0].nome : '' }} <span>(Banner)</span></h1>

        <form @submit.prevent="submit()">

            <label class="f-label" for="email">Nome:</label>
            <input class="f-input" required type="text" v-model="formulario.nome" />

            <label class="f-label" for="cpf">Descrição da imagem:</label>

            <textarea class="f-input" rows="3" v-model="formulario.descricao">

            </textarea>

            <label class="f-label" for="cpf">Imagem:</label>
            <input class="f-input" required type="file" accept="image/*" @change="handleFile($event)"/>

            <label class="f-label" for="cpf">Link:</label>
            <input class="f-input" required type="text" v-model="formulario.link" />

            <label class="f-label" for="telefone">Posiçao</label>
            <input class="f-input" required type="text" v-model="formulario.posicao" />


            <div class="os-checks">
                <p>Visibilidade</p>
                <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.visibilidade" />
                <label class="l" for="pedestre"> Ativo</label><br>
            </div>

            <div v-if="formulario.arquivo">
                {{formulario.arquivo.name}}
                <button type="button" @click="formulario.arquivo = ''"><i class="fa fa-trash"></i></button>
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
        bannerId : '',
        banner : [],
        formulario: {
            nome: '',
            descricao: '',
            link: '',
            posicao: '',
            visibilidade: false,
            arquivo: ''
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
            const referencia = this.$firebase.database().ref(`entregadores/${this.bannerId}`)
            const payload = {
                id : this.bannerId,
                nome : this.formulario.nome,
                descricao : this.formulario.descricao,
                posicao: this.formulario.posicao,
                visibilidade: this.formulario.visibilidade,
                arquivo: this.formulario.arquivo
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
        this.bannerId = this.$route.params.id



        this.$firebase.database().ref(`banners/${this.bannerId}`).once('value').then(
            (data) => {
                this.banner.push({
                    key : data.val().id,
                    nome : data.val().nome,
                    descricao : data.val().descricao,
                    posicao: data.val().posicao,
                    visibilidade: data.val().visibilidade,
                    arquivo: data.val().arquivo
                })

                this.formulario.nome = this.banner[0].nome
                this.formulario.descricao = this.banner[0].descricao
                this.formulario.posicao = this.banner[0].posicao
                this.formulario.visibilidade = this.banner[0].visibilidade
                this.formulario.arquivo = this.banner[0].arquivo
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        console.log(this.banner)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

.banner {
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
