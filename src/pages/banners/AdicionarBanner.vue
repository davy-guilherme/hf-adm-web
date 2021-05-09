<template>
    <div>
        <button class="btn-add" @click="toogle_modal()">Adicionar Banner</button>

        <div class="adicionar-fundo" :class="{ ativo : showModal }">
            <form @submit.prevent="submit()" class="box-adicionar">
                <i class="far fa-times-circle" id="fechar-modal" @click="toogle_modal()"></i>
                <h1>Novo Banner</h1>
                <label class="f-label" for="nome">Nome:</label>
                <input class="f-input" type="text" v-model="formulario.nome" @change="$v.formulario.nome.$touch()" />
                <p class="f-erro" v-if="$v.formulario.nome.$error">Este campo é obrigatório</p>

                <label class="f-label" for="cpf">Descrição da imagem:</label>

                <textarea class="f-input" rows="3" v-model="formulario.descricao" @change="$v.formulario.descricao.$touch()">

                </textarea>
                <p class="f-erro" v-if="$v.formulario.descricao.$error">Este campo é obrigatório</p>

                <label class="f-label" for="cpf">Imagem:</label>
                <input class="f-input" type="file" id="input-imagem" ref="inputImagem" accept="image/*" @change="handleFile($event)"/>
                <button type="button" @click="openFileDialog()">Escolher imagem</button>
                <div v-if="formulario.arquivo">
                    {{formulario.arquivo.name}}
                    <button type="button" @click="remover_imagem()"><i class="fa fa-trash"></i></button>
                </div>
                <p class="f-erro" v-if="$v.formulario.arquivo.$error">Este campo é obrigatório</p>

                <label class="f-label" for="cpf">Link:</label>
                <input class="f-input" type="text" v-model="formulario.link" />


                <div class="os-checks">
                    <p>Visibilidade</p>
                    <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.visibilidade" />
                    <label class="l" for="pedestre"> Ativo</label><br>
                </div>


                <button class="f-button">Adicionar</button>
                <button type="button" @click="toogle_modal()" class="f-button btn-cancelar">Cancelar</button>

                <div class="margem-final"></div>
            </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name : 'AdicionarBanner',
    data: () => ({
        showModal: false,
        formulario: {
            nome: '',
            descricao: '',
            link: '',
            visibilidade: false,
            arquivo: '',
            posicao: ''
        }
    }),
    validations : {
        formulario: {
            nome : { required },
            descricao : { required },
            arquivo: { required },

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
        toogle_modal() {
            this.showModal = !this.showModal
        },
        handleFile(ev) {
            //console.log(ev)
            this.formulario.arquivo = ev.target.files[0]
            this.$v.formulario.arquivo.$touch()
        },
        async submit () {
            if (!this.$v.$invalid) {
                this.$root.$emit('Spinner::show')
                let url = ''

                try {
                    const referencia = this.$firebase.database().ref('banners')
                    const id = referencia.push().key

                    //subir arquivo
                    if (this.formulario.arquivo) {
                        const snapshot = await this.$firebase.storage()
                            .ref(window.uid)
                            .child(this.fileName)
                            .put(this.formulario.arquivo)

                        url = await snapshot.ref.getDownloadURL()
                    }

                    const payload = {
                        id : id,
                        nome: this.formulario.nome,
                        descricao: this.formulario.descricao,
                        link: this.formulario.link,
                        posicao: this.formulario.posicao,
                        visibilidade: this.formulario.visibilidade,
                        arquivo: url,
                        criadoEm : new Date().getTime()
                    }

                    referencia.child(id).set(payload, err => {
                        if (err) {
                            //chamar a notificacao
                            this.$root.$emit('Notification::show', {
                                type: 'n-erro',
                                title: 'Algo deu errado',
                                message: 'Não foi possível cadastrar o novo banner. Por favor, tente novamente.'
                            })
                        } else {
                            this.$root.$emit('Notification::show', {
                                type: 'n-sucesso',
                                title: 'Tudo certo',
                                message: 'O novo banner foi cadastrado com sucesso.'
                            })
                            this.toogle_modal()
                        }
                    })
                } catch (err) {
                    console.error(err)
                } finally {
                    this.$root.$emit('Spinner::hide')
                }
                //console.log('enviou')
                //colocar o firebase em jogo! (soh na funcao, talvez???)
                //const referencia = this.$firebase.database().ref('entregadores/' + window.uid) // acessa o id de usuario que ja existe OU cria um novo

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

    }


}
</script>

<style scoped lang="scss">

#input-imagem {
    display: none;
}

.btn-add {
    margin:0 auto !important;
    display:block !important;
    color: white;

}

.adicionar-fundo {
    top: 0;
    right: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    color: white;
    z-index: 900;
    background-color: #999;
    display: none;
    overflow: scroll;
}

.box-adicionar {
    width: 90%;
    height: auto;
    position: absolute;
    left: 5%;
    top: 3.8em;
    color: white;
    padding: 0;
}

.ativo {
    display: block;
}

#fechar-modal {
    position: absolute;
    right: 0;
    top: 0.6em;
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

.margem-final {
    width: 100%;
    height: 20vh;

}

.f-erro {
    color: red;
    font-size: 0.9em;
    padding: 0.3em 0;
    text-align: left;
    width: 100%;
    margin-bottom: 0.5em;
}

@media (max-width: 1199.98px) {

/*.box-adicionar-entregador {
    width: 70%;
    left: 13%;
    top: 9%;
    padding: 1.5em 2%;
}*/

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
