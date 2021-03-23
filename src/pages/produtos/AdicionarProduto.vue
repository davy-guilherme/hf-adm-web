<template>
    <div>
        <button class="btn-add" @click="toogle_modal()">Adicionar Produto</button>

        <div class="adicionar-fundo" :class="{ ativo : showModal }">

            <form @submit.prevent="submit()" class="box-adicionar">
                <i class="far fa-times-circle" id="fechar-modal" @click="toogle_modal()"></i>
                <h1>Produto</h1>
                <label class="f-label" for="email">Nome:</label>
                <input class="f-input" type="text" v-model="formulario.nome" @change="$v.formulario.nome.$touch()" />
                <p class="f-erro" v-if="$v.formulario.nome.$error">Este campo é obrigatório</p>

                <label class="f-label" for="categoria">Categoria:</label>
                <select class="f-input" v-model="formulario.categoria">
                    <option value="legume">Legume</option>
                    <option value="verdura">Verdura</option>
                    <option value="fruta">Fruta</option>
                    <option value="especiaria">Especiaria</option>
                </select>


                <!-- PF -->
                <div class="precos p-pf">
                    <h2>Preço para Pessoa Física</h2>

                    <div class="preco">
                        <p>Varejo</p>
                        <div>
                            <label class="f-label">Tipo</label>
                            <select v-model="formulario.precos.pf.varejo.tipo">

                                <option value="un">Unidade</option>
                                <option value="kg">Kilo</option>
                                <option value="gr">Grama</option>
                                <option value="cx">Caixa</option>
                                <option value="dz">Dúzia</option>
                                <option value="md">Meia Dúzia</option>
                                <option value="lt">Litro</option>
                                <option value="ml">Mililitros</option>
                                <option value="pc">Pacote</option>
                                <option value="sc">Saco</option>
                            </select>
                        </div>

                        <div>
                            <label>Comp</label><input type="text" v-model="formulario.precos.pf.varejo.complemento" />
                        </div>

                        <div>
                            <label>Preço</label><input type="text" v-model="formulario.precos.pf.varejo.precoAntigo" @change="$v.formulario.precos.pf.varejo.precoAntigo.$touch()" @blur="calcularPfVarejo()" />
                            <p class="f-erro" v-if="$v.formulario.precos.pf.varejo.precoAntigo.$error">Este campo é obrigatório</p>
                        </div>

                        <div>
                            <label>Desconto %</label><input type="text" v-model="formulario.precos.pf.varejo.desconto" @blur="calcularPfVarejo()" />
                        </div>

                        <div>
                            <label>Preço F</label><input type="text" disabled v-model="pfVarejoAtual" />
                        </div>

                        <div>
                            <label>Limite</label><input type="text" v-model="formulario.precos.pf.varejo.limite" />
                        </div>
                    </div>


                    <div class="preco">
                        <p>Atacado</p>
                        <div>
                            <label class="f-label">Tipo</label>
                            <select v-model="formulario.precos.pf.atacado.tipo">

                                <option value="un">Unidade</option>
                                <option value="kg">Kilo</option>
                                <option value="gr">Grama</option>
                                <option value="cx">Caixa</option>
                                <option value="dz">Dúzia</option>
                                <option value="md">Meia Dúzia</option>
                                <option value="lt">Litro</option>
                                <option value="ml">Mililitros</option>
                                <option value="pc">Pacote</option>
                                <option value="sc">Saco</option>
                            </select>
                        </div>

                        <div>
                            <label>Comp</label><input type="text" v-model="formulario.precos.pf.atacado.complemento" />
                        </div>

                        <div>
                            <label>Preço</label><input type="text" v-model="formulario.precos.pf.atacado.precoAntigo" @change="$v.formulario.precos.pf.atacado.precoAntigo.touch()" @blur="calcularPfAtacado()" />
                            <p class="f-erro" v-if="$v.formulario.precos.pf.atacado.precoAntigo.$error">Este campo é obrigatório</p>
                        </div>

                        <div>
                            <label>Desconto %</label><input type="text" v-model="formulario.precos.pf.atacado.desconto" @blur="calcularPfAtacado()" />
                        </div>

                        <div>
                            <label>Preço F</label><input type="text" disabled v-model="formulario.precos.pf.atacado.precoAtual" />
                        </div>

                        <div>
                            <label>Limite</label><input type="text" v-model="formulario.precos.pf.atacado.limite" />
                        </div>
                    </div>



                </div>


                <!-- PJ -->
                <div class="precos p-pj">
                    <h2>Preço para Pessoa Jurídica</h2>

                    <div class="preco">
                        <p>Varejo</p>
                        <div>
                            <label class="f-label">Tipo</label>
                            <select v-model="formulario.precos.pj.varejo.tipo">

                                <option value="un">Unidade</option>
                                <option value="kg">Kilo</option>
                                <option value="gr">Grama</option>
                                <option value="cx">Caixa</option>
                                <option value="dz">Dúzia</option>
                                <option value="md">Meia Dúzia</option>
                                <option value="lt">Litro</option>
                                <option value="ml">Mililitros</option>
                                <option value="pc">Pacote</option>
                                <option value="sc">Saco</option>
                            </select>
                        </div>

                        <div>
                            <label>Comp</label><input type="text" v-model="formulario.precos.pj.varejo.complemento" />
                        </div>

                        <div>
                            <label>Preço</label><input type="text" v-model="formulario.precos.pj.varejo.precoAntigo" @change="$v.formulario.precos.pj.varejo.precoAntigo.$touch()" @blur="calcularPjVarejo()" />
                            <p class="f-erro" v-if="$v.formulario.precos.pj.varejo.precoAntigo.$error">Este campo é obrigatório</p>
                        </div>

                        <div>
                            <label>Desconto %</label><input type="text" v-model="formulario.precos.pj.varejo.desconto" @blur="calcularPjVarejo()" />
                        </div>

                        <div>
                            <label>Preço F</label><input type="text" disabled v-model="formulario.precos.pj.varejo.precoAtual" />
                        </div>

                        <div>
                            <label>Limite</label><input type="text" v-model="formulario.precos.pj.varejo.limite" />
                        </div>
                    </div>


                    <div class="preco">
                        <p>Atacado</p>
                        <div>
                            <label class="f-label">Tipo</label>
                            <select v-model="formulario.precos.pj.atacado.tipo">

                                <option value="un">Unidade</option>
                                <option value="kg">Kilo</option>
                                <option value="gr">Grama</option>
                                <option value="cx">Caixa</option>
                                <option value="dz">Dúzia</option>
                                <option value="md">Meia Dúzia</option>
                                <option value="lt">Litro</option>
                                <option value="ml">Mililitros</option>
                                <option value="pc">Pacote</option>
                                <option value="sc">Saco</option>
                            </select>
                        </div>

                        <div>
                            <label>Comp</label><input type="text" v-model="formulario.precos.pj.atacado.complemento" />
                        </div>

                        <div>
                            <label>Preço</label><input type="text" v-model="formulario.precos.pj.atacado.precoAntigo" @change="$v.formulario.precos.pj.atacado.precoAntigo.touch()" @blur="calcularPjAtacado()" />
                            <p class="f-erro" v-if="$v.formulario.precos.pj.atacado.precoAntigo.$error">Este campo é obrigatório</p>
                        </div>

                        <div>
                            <label>Desconto %</label><input type="text" v-model="formulario.precos.pj.atacado.desconto" @blur="calcularPjAtacado()" />
                        </div>

                        <div>
                            <label>Preço F</label><input type="text" disabled v-model="formulario.precos.pj.atacado.precoAtual" />
                        </div>

                        <div>
                            <label>Limite</label><input type="text" v-model="formulario.precos.pj.atacado.limite" />
                        </div>
                    </div>


                </div>


                <!-- fim -->


                <label class="f-label" for="cpf">Imagem:</label>
                <input class="f-input" required type="file" accept="image/*" @change="handleFile($event)"/>

                <div v-if="formulario.arquivo">
                    {{formulario.arquivo.name}}
                    <button type="button" @click="formulario.arquivo = ''"><i class="fa fa-trash"></i></button>
                </div>


                <div class="os-checks">
                    <p>Visibilidade</p>
                    <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.visibilidade" />
                    <label class="l" for="pedestre"> Ativo</label><br>
                </div>



                <button class="f-button">Adicionar</button>
                <button type="button" @click="toogle_modal()" class="f-button btn-cancelar">Cancelar</button>

                <!--<pre>
                {{ $v.formulario.nome }}
                </pre>-->

                <div class="margem-final"></div>


            </form>

        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name : 'AdicionarProduto',
    data: () => ({
        showModal: false,
        formulario: {
            nome: '',
            categoria: '',
            precos: {
                pj: {
                    varejo: {
                        tipo : '',
                        complemento: '',
                        precoAntigo: '',
                        desconto: '',
                        precoAtual: '',
                        limitePorCliente: ''
                    },
                    atacado: {
                        tipo : '',
                        complemento: '',
                        precoAntigo: '',
                        desconto: '',
                        precoAtual: '',
                        limitePorCliente: ''
                    }
                },
                pf: {
                    varejo: {
                        tipo : '',
                        complemento: '',
                        precoAntigo: '',
                        desconto: '',
                        precoAtual: '',
                        limitePorCliente: ''
                    },
                    atacado: {
                        tipo : '',
                        complemento: '',
                        precoAntigo: '',
                        desconto: '',
                        precoAtual: '',
                        limitePorCliente: ''
                    }
                },

            },
            posicao: '',
            visibilidade: false,
            arquivo: ''
        }
    }),
    validations : {
        formulario: {
            nome : { required },
            precos : {
                pf : {
                    varejo : {
                        precoAntigo : { required }
                    },
                    atacado : {
                        precoAntigo : { required }
                    }
                },
                pj : {
                    varejo : {
                        precoAntigo : { required }
                    },
                    atacado : {
                        precoAntigo : { required }
                    }
                }
            }
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
        },
        pfVarejoAnterior() {

            return this.formulario.precos.pf.varejo.precoAntigo
        },
        pfVarejoDesconto () {
            return this.formulario.precos.pf.varejo.desconto
        },
        pfVarejoAtual () {
            var valor = this.formulario.precos.pf.varejo.precoAtual
            valor = parseFloat(valor).toFixed(2)
            if (valor >= 0) {
                valor = valor.toString()
                return valor.replace('.', ',')
            } else { return '0,00' }
        }

    },
    watch: {
        pfVarejoAnterior () {
            this.formulario.precos.pf.varejo.precoAntigo = this.formulario.precos.pf.varejo.precoAntigo.replace(/\D+/g, '')
            .replace(/(\d*)(\d{2})/g, '$1,$2')
        },
        pfVarejoDesconto () {
            this.formulario.precos.pf.varejo.desconto = this.formulario.precos.pf.varejo.desconto.replace(/\D+/g, '')
        }
    },
    methods: {
        toogle_modal() {
            this.showModal = !this.showModal
        },
        handleFile(ev) {
            //console.log(ev)
            this.formulario.arquivo = ev.target.files[0]
        },
        async submit () {

            if (!this.$v.$invalid) {
                this.$root.$emit('Spinner::show')
                let url = ''

                try {
                    const referencia = this.$firebase.database().ref('produtos')
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
                        categoria: this.formulario.categoria,
                        precos : {
                            pj: {
                                varejo: {
                                    tipo: this.formulario.precos.pj.varejo.tipo,
                                    complemento : this.formulario.precos.pj.varejo.complemento,
                                    precoAntigo: this.formulario.precos.pj.varejo.precoAntigo,
                                    desconto: this.formulario.precos.pj.varejo.desconto,
                                    precoAtual : this.formulario.precos.pj.varejo.precoAtual,
                                    limitePorCliente: this.formulario.precos.pj.varejo.limitePorCliente
                                },
                                atacado: {
                                    tipo: this.formulario.precos.pj.atacado.tipo,
                                    complemento : this.formulario.precos.pj.atacado.complemento,
                                    precoAntigo: this.formulario.precos.pj.atacado.precoAntigo,
                                    desconto: this.formulario.precos.pj.atacado.desconto,
                                    precoAtual : this.formulario.precos.pj.atacado.precoAtual,
                                    limitePorCliente: this.formulario.precos.pj.atacado.limitePorCliente
                                }
                            },
                            pf : {
                                varejo: {
                                    tipo: this.formulario.precos.pf.varejo.tipo,
                                    complemento : this.formulario.precos.pf.varejo.complemento,
                                    precoAntigo: this.formulario.precos.pf.varejo.precoAntigo,
                                    desconto: this.formulario.precos.pf.varejo.desconto,
                                    precoAtual : this.formulario.precos.pf.varejo.precoAtual,
                                    limitePorCliente: this.formulario.precos.pf.varejo.limitePorCliente
                                },
                                atacado: {
                                    tipo: this.formulario.precos.pf.atacado.tipo,
                                    complemento : this.formulario.precos.pf.atacado.complemento,
                                    precoAntigo: this.formulario.precos.pf.atacado.precoAntigo,
                                    desconto: this.formulario.precos.pf.atacado.desconto,
                                    precoAtual : this.formulario.precos.pf.atacado.precoAtual,
                                    limitePorCliente: this.formulario.precos.pf.atacado.limitePorCliente
                                }
                            }
                        },
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
                                message: 'Não foi possível cadastrar o novo produto. Por favor, tente novamente.'
                            })
                        } else {
                            this.$root.$emit('Notification::show', {
                                type: 'n-sucesso',
                                message: 'O novo produto foi cadastrado com sucesso.'
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
        calcularPfVarejo () {
            this.formulario.precos.pf.varejo.precoAtual = this.formulario.precos.pf.varejo.precoAntigo.replace(',', '.') - ( this.formulario.precos.pf.varejo.precoAntigo.replace(',', '.') * (this.formulario.precos.pf.varejo.desconto / 100))
        },

        calcularPfAtacado () {
            this.formulario.precos.pf.atacado.precoAtual = this.formulario.precos.pf.atacado.precoAntigo - ( this.formulario.precos.pf.atacado.precoAntigo * (this.formulario.precos.pf.atacado.desconto / 100))
        },
        calcularPjVarejo () {
            this.formulario.precos.pj.varejo.precoAtual = this.formulario.precos.pj.varejo.precoAntigo - ( this.formulario.precos.pj.varejo.precoAntigo * (this.formulario.precos.pj.varejo.desconto / 100))
        },
        calcularPjAtacado () {
            this.formulario.precos.pj.atacado.precoAtual = this.formulario.precos.pj.atacado.precoAntigo - ( this.formulario.precos.pj.atacado.precoAntigo * (this.formulario.precos.pj.atacado.desconto / 100))
        }

    }

}
</script>

<style scoped lang="scss">

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

.precos {
    width: 100%;
    height: auto !important;
    position: relative;
    display: inline-block;
    margin: 1em 0;
}


.preco {
    width : 33%;
    height: auto !important;
    position: relative;
    float: left;
}

.preco div {
    display: inline-block;
    width: 90%;
    margin-bottom: 0.3em;
    padding: 0.25em 5%;

}

.preco div label {
    display: inline-block;
    width: 34%;

}

.preco div input {
    display: inline;
    width: 63%;
}

.preco div select {
    display: inline;
    width: 63%;
}

.f-erro {
    color: red;
    font-size: 0.9em;
    padding: 0.3em 0;
    text-align: right;
    width: 100%;
}

.margem-final {
    width: 100%;
    height: 20vh;

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


.preco {
    width : 50%;
    margin-top: 0.4em;
    margin-bottom: 0.6em
}

.preco div {
    width: 90%;
    margin-bottom: 0.3em;
    padding: 0.25em 5%;
}

.preco div label {
    width: 34%;

}

.preco div input {
    width: 64%;
}

.preco div select {
    width: 64%;
}


}

@media (max-width: 991.98px) {



}

@media (max-width: 767.98px) {

.preco {
    width : 100%;
    margin-top: 0.5em;
    margin-bottom: 0.7em;
}


}

@media (max-width: 575.98px) {

}


</style>
