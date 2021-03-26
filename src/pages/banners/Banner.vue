<template>
    <div class="banner">
        <h1>{{ this.banner[0] ? this.banner[0].nome : '' }} <span>(Banner)</span></h1>

        <form @submit.prevent="submit()">
            <!--<pre>
                {{ this.$v }}
            </pre>-->

            <label class="f-label" for="nome">Nome:</label>
            <input class="f-input" type="text" v-model="formulario.nome" @change="$v.formulario.nome.$touch()" />
            <p class="f-erro" v-if="$v.formulario.nome.$error">Este campo é obrigatório</p>

            <label class="f-label" for="desc">Descrição da imagem:</label>
            <textarea class="f-input" rows="3" v-model="formulario.descricao" @change="$v.formulario.descricao.$touch()">
            </textarea>
            <p class="f-erro" v-if="$v.formulario.descricao.$error">Este campo é obrigatório</p>

            <label class="f-label" for="imagem">Imagem:</label>
            <input class="f-input" type="file" id="input-imagem" ref="inputImagem" accept="image/*" @change="handleFile($event)"/>
            <button type="button" @click="openFileDialog()">Escolher imagem</button>
            <div v-if="formulario.arquivo">
                {{formulario.arquivo.name}}
                <button type="button" @click="remover_imagem()"><i class="fa fa-trash"></i></button>
            </div>

            <label class="f-label" for="link">Link:</label>
            <input class="f-input" type="text" v-model="formulario.link" />


            <div class="os-checks">
                <p>Visibilidade</p>
                <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.visibilidade" />
                <label class="l" for="pedestre"> Ativo</label><br>
            </div>


            <button class="f-button">Salvar alterações</button>
            <button type="button" @click="voltar()" class="f-button btn-cancelar">Fechar sem salvar</button>


        </form>


    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponenteBanner',
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
        },
        imagem: ''
    }),
    validations : {
        formulario: {
            nome : { required },
            descricao : { required }

        }
    },
    computed : {
        fileName () {
            const {arquivo} = this.formulario

            if (arquivo) {
                const split = arquivo.name.split('.')
                var tamanho = split.length
                return `${split[0]}-${new Date().getTime()}.${split[tamanho-1]}`
            } else {
                return ''
            }
        }

    },
    methods: {
        voltar () {
            this.$router.go(-1)
        },
        handleFile(ev) {
            //console.log(ev)
            this.formulario.arquivo = ev.target.files[0]
        },
        async submit () {
            if (!this.$v.$invalid) {

                    this.$root.$emit('Spinner::show')
                    let url = ''
                    //console.log('enviou')
                    //colocar o firebase em jogo! (soh na funcao, talvez???)
                    //const referencia = this.$firebase.database().ref('entregadores/' + window.uid) // acessa o id de usuario que ja existe OU cria um novo

                    //VERIFICA SE FOI CARREGADO NOVA IMAGEM
                    if (!this.formulario.arquivo || this.formulario.arquivo == '') {
                        this.formulario.arquivo = this.imagem
                    } else {
                        //subir arquivo
                        if (this.formulario.arquivo) {
                            const snapshot = await this.$firebase.storage()
                                .ref(window.uid)
                                .child(this.fileName)
                                .put(this.formulario.arquivo)

                            url = await snapshot.ref.getDownloadURL()

                            this.formulario.arquivo = url
                        }

                    }
                    const referencia = this.$firebase.database().ref(`banners/${this.bannerId}`)
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
                                message: 'Não foi possível alterar o banner'
                            })
                        } else {
                            this.$root.$emit('Notification::show', {
                                type: 'n-sucesso',
                                message: 'O banner foi alterado com sucesso.'
                            })
                            this.$router.go(-1)
                        }
                    })

                    this.$root.$emit('Spinner::hide')

            } else {
                this.$v.$touch()
            }
        },
        openFileDialog() {
            this.$refs.inputImagem.click()
        },
        remover_imagem() {
            this.formulario.arquivo = ''
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
                this.imagem = this.banner[0].arquivo
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        //console.log(this.banner)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

#input-imagem {
    display: none;
}

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

.f-erro {
    color: red;
    font-size: 0.9em;
    padding: 0.3em 0;
    text-align: left;
    width: 100%;
    margin-bottom: 0.5em;
}

</style>
