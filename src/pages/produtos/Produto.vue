<template>
    <div class="produto">
        <h1>{{ this.produto[0] ? this.produto[0].nome : '' }} <span>(Produto)</span></h1>

        <form @submit.prevent="submit()">
            <!--<pre>
                {{ this.$v }}
            </pre>-->

            <label class="f-label" for="nome">Nome:</label>
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
                        <label>Preço F</label><input type="text" disabled v-model="pfAtacadoAtual" />
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
                        <label>Preço F</label><input type="text" disabled v-model="pjVarejoAtual" />
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
                        <label>Preço F</label><input type="text" disabled v-model="pjAtacadoAtual" />
                    </div>

                    <div>
                        <label>Limite</label><input type="text" v-model="formulario.precos.pj.atacado.limite" />
                    </div>
                </div>


            </div>

            <label class="f-label" for="imagem">Imagem:</label>
            <input class="f-input" type="file" id="input-imagem" ref="inputImagem" accept="image/*" @change="handleFile($event)"/>
            <button type="button" @click="openFileDialog()">Escolher imagem</button>
            <div v-if="formulario.arquivo">
                {{formulario.arquivo.name}}
                <button type="button" @click="remover_imagem()"><i class="fa fa-trash"></i></button>
            </div>


            <div class="os-checks">
                <p>Visibilidade</p>
                <input type="checkbox" id="pedestre" name="pedestre" v-model="formulario.visibilidade" />
                <label class="l" for="pedestre"> Ativo</label><br>
            </div>



            <button class="f-button">Salvar alterações</button>
            <button type="button" @click="voltar()" class="f-button btn-cancelar">Fechar sem salvar</button>


        </form>

        <div class="margem-final"></div>

    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ComponenteProduto',
    data: () => ({
        produtoId : '',
        produto : [],
        formulario: {
            nome: '',
            categoria: '',
            precos: {
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
                }

            },
            posicao: '',
            visibilidade: false,
            arquivo: ''
        },
        imagem: ''
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
        //PJ - VAREJO
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
        },

        //PF - ATACADO
        pfAtacadoAnterior() {

            return this.formulario.precos.pf.atacado.precoAntigo
        },
        pfAtacadoDesconto () {
            return this.formulario.precos.pf.atacado.desconto
        },
        pfAtacadoAtual () {
            var valor = this.formulario.precos.pf.atacado.precoAtual
            valor = parseFloat(valor).toFixed(2)
            if (valor >= 0) {
                valor = valor.toString()
                return valor.replace('.', ',')
            } else { return '0,00' }
        },

        //PJ - VAREJO
        pjVarejoAnterior() {

            return this.formulario.precos.pj.varejo.precoAntigo
        },
        pjVarejoDesconto () {
            return this.formulario.precos.pj.varejo.desconto
        },
        pjVarejoAtual () {
            var valor = this.formulario.precos.pj.varejo.precoAtual
            valor = parseFloat(valor).toFixed(2)
            if (valor >= 0) {
                valor = valor.toString()
                return valor.replace('.', ',')
            } else { return '0,00' }
        },

        //PJ - VAREJO
        pjAtacadoAnterior() {

            return this.formulario.precos.pj.atacado.precoAntigo
        },
        pjAtacadoDesconto () {
            return this.formulario.precos.pj.atacado.desconto
        },
        pjAtacadoAtual () {
            var valor = this.formulario.precos.pj.atacado.precoAtual
            valor = parseFloat(valor).toFixed(2)
            if (valor >= 0) {
                valor = valor.toString()
                return valor.replace('.', ',')
            } else { return '0,00' }
        },



    },
    watch: {
        //PF - VAREJO
        pfVarejoAnterior () {
            this.formulario.precos.pf.varejo.precoAntigo = this.formulario.precos.pf.varejo.precoAntigo.replace(/\D+/g, '')
            .replace(/(\d*)(\d{2})/g, '$1,$2')
        },
        pfVarejoDesconto () {
            this.formulario.precos.pf.varejo.desconto = this.formulario.precos.pf.varejo.desconto.replace(/\D+/g, '')
        },

        //PF - Atacado
        pfAtacadoAnterior () {
            this.formulario.precos.pf.atacado.precoAntigo = this.formulario.precos.pf.atacado.precoAntigo.replace(/\D+/g, '')
            .replace(/(\d*)(\d{2})/g, '$1,$2')
        },
        pfAtacadoDesconto () {
            this.formulario.precos.pf.atacado.desconto = this.formulario.precos.pf.atacado.desconto.replace(/\D+/g, '')
        },

        //PJ - VAREJO
        pjVarejoAnterior () {
            this.formulario.precos.pj.varejo.precoAntigo = this.formulario.precos.pj.varejo.precoAntigo.replace(/\D+/g, '')
            .replace(/(\d*)(\d{2})/g, '$1,$2')
        },
        pjVarejoDesconto () {
            this.formulario.precos.pj.varejo.desconto = this.formulario.precos.pj.varejo.desconto.replace(/\D+/g, '')
        },

        //PJ - ATACADO
        pjAtacadoAnterior () {
            this.formulario.precos.pj.atacado.precoAntigo = this.formulario.precos.pj.atacado.precoAntigo.replace(/\D+/g, '')
            .replace(/(\d*)(\d{2})/g, '$1,$2')
        },
        pjAtacadoDesconto () {
            this.formulario.precos.pj.atacado.desconto = this.formulario.precos.pj.atacado.desconto.replace(/\D+/g, '')
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
                    const referencia = this.$firebase.database().ref(`produtos/${this.produtoId}`)
                    const payload = {
                        id : this.produtoId,
                        nome: this.formulario.nome,
                        categoria: this.formulario.categoria,
                        precos : {
                            pf : {
                                varejo: {
                                    tipo: this.formulario.precos.pf.varejo.tipo,
                                    complemento : this.formulario.precos.pf.varejo.complemento,
                                    precoAntigo: this.formulario.precos.pf.varejo.precoAntigo.replace(',','.'),
                                    desconto: this.formulario.precos.pf.varejo.desconto,
                                    precoAtual : this.formulario.precos.pf.varejo.precoAtual,
                                    limitePorCliente: this.formulario.precos.pf.varejo.limitePorCliente
                                },
                                atacado: {
                                    tipo: this.formulario.precos.pf.atacado.tipo,
                                    complemento : this.formulario.precos.pf.atacado.complemento,
                                    precoAntigo: this.formulario.precos.pf.atacado.precoAntigo.replace(',', '.'),
                                    desconto: this.formulario.precos.pf.atacado.desconto,
                                    precoAtual : this.formulario.precos.pf.atacado.precoAtual,
                                    limitePorCliente: this.formulario.precos.pf.atacado.limitePorCliente
                                }
                            },
                            pj: {
                                varejo: {
                                    tipo: this.formulario.precos.pj.varejo.tipo,
                                    complemento : this.formulario.precos.pj.varejo.complemento,
                                    precoAntigo: this.formulario.precos.pj.varejo.precoAntigo.replace(',', '.'),
                                    desconto: this.formulario.precos.pj.varejo.desconto,
                                    precoAtual : this.formulario.precos.pj.varejo.precoAtual,
                                    limitePorCliente: this.formulario.precos.pj.varejo.limitePorCliente
                                },
                                atacado: {
                                    tipo: this.formulario.precos.pj.atacado.tipo,
                                    complemento : this.formulario.precos.pj.atacado.complemento,
                                    precoAntigo: this.formulario.precos.pj.atacado.precoAntigo.replace(',', '.'),
                                    desconto: this.formulario.precos.pj.atacado.desconto,
                                    precoAtual : this.formulario.precos.pj.atacado.precoAtual,
                                    limitePorCliente: this.formulario.precos.pj.atacado.limitePorCliente
                                }
                            }
                        },
                        posicao: this.formulario.posicao,
                        visibilidade: this.formulario.visibilidade,
                        arquivo: this.formulario.arquivo,
                        //criadoEm : new Date().getTime()
                    }

                    //console.log(payload)
                    //console.log(referencia)

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
        },
        openFileDialog() {
            this.$refs.inputImagem.click()
        },
        remover_imagem() {
            this.formulario.arquivo = ''
        },
        calcularPfVarejo () {
            this.formulario.precos.pf.varejo.precoAtual = this.formulario.precos.pf.varejo.precoAntigo.replace(',', '.') - ( this.formulario.precos.pf.varejo.precoAntigo.replace(',', '.') * (this.formulario.precos.pf.varejo.desconto / 100))
        },

        calcularPfAtacado () {
            this.formulario.precos.pf.atacado.precoAtual = this.formulario.precos.pf.atacado.precoAntigo.replace(',', '.') - ( this.formulario.precos.pf.atacado.precoAntigo.replace(',', '.') * (this.formulario.precos.pf.atacado.desconto / 100))
        },
        calcularPjVarejo () {
            this.formulario.precos.pj.varejo.precoAtual = this.formulario.precos.pj.varejo.precoAntigo.replace(',', '.') - ( this.formulario.precos.pj.varejo.precoAntigo.replace(',', '.') * (this.formulario.precos.pj.varejo.desconto / 100))
        },
        calcularPjAtacado () {
            this.formulario.precos.pj.atacado.precoAtual = this.formulario.precos.pj.atacado.precoAntigo.replace(',', '.') - ( this.formulario.precos.pj.atacado.precoAntigo.replace(',', '.') * (this.formulario.precos.pj.atacado.desconto / 100))
        }

    },
    created() {
        this.produtoId = this.$route.params.id



        this.$firebase.database().ref(`produtos/${this.produtoId}`).once('value').then(
            (data) => {
                this.produto.push({
                    key : data.val().id,
                    nome : data.val().nome,
                    categoria : data.val().categoria,
                    precos : {
                        pf: {
                            varejo : {
                                tipo : data.val().precos.pf.varejo.tipo,
                                complemento : data.val().precos.pf.varejo.complemento,
                                precoAntigo : data.val().precos.pf.varejo.precoAntigo,
                                desconto : data.val().precos.pf.varejo.desconto,
                                precoAtual : data.val().precos.pf.varejo.precoAtual,
                                limitePorCliente : data.val().precos.pf.varejo.limitePorCliente
                            },
                            atacado : {
                                tipo : data.val().precos.pf.atacado.tipo,
                                complemento : data.val().precos.pf.atacado.complemento,
                                precoAntigo : data.val().precos.pf.atacado.precoAntigo,
                                desconto : data.val().precos.pf.atacado.desconto,
                                precoAtual : data.val().precos.pf.atacado.precoAtual,
                                limitePorCliente : data.val().precos.pf.atacado.limitePorCliente
                            }
                        },
                        pj : {
                            varejo : {
                                tipo : data.val().precos.pj.varejo.tipo,
                                complemento : data.val().precos.pj.varejo.complemento,
                                precoAntigo : data.val().precos.pj.varejo.precoAntigo,
                                desconto : data.val().precos.pj.varejo.desconto,
                                precoAtual : data.val().precos.pj.varejo.precoAtual,
                                limitePorCliente : data.val().precos.pj.varejo.limitePorCliente
                            },
                            atacado : {
                                tipo : data.val().precos.pj.atacado.tipo,
                                complemento : data.val().precos.pj.atacado.complemento,
                                precoAntigo : data.val().precos.pj.atacado.precoAntigo,
                                desconto : data.val().precos.pj.atacado.desconto,
                                precoAtual : data.val().precos.pj.atacado.precoAtual,
                                limitePorCliente : data.val().precos.pj.atacado.limitePorCliente
                            }
                        }
                    },

                    /*descricao : data.val().descricao,
                    posicao: data.val().posicao,*/
                    visibilidade: data.val().visibilidade,
                    arquivo: data.val().arquivo


                })

                this.formulario.nome = this.produto[0].nome
                this.formulario.categoria = this.produto[0].categoria

                this.formulario.precos.pf.varejo.tipo = this.produto[0].precos.pf.varejo.tipo,
                this.formulario.precos.pf.varejo.complemento = this.produto[0].precos.pf.varejo.complemento,
                this.formulario.precos.pf.varejo.precoAntigo = this.produto[0].precos.pf.varejo.precoAntigo,
                this.formulario.precos.pf.varejo.desconto = this.produto[0].precos.pf.varejo.desconto,
                this.formulario.precos.pf.varejo.precoAtual = this.produto[0].precos.pf.varejo.precoAtual,
                this.formulario.precos.pf.varejo.limitePorCliente = this.produto[0].precos.pf.varejo.limitePorCliente,

                this.formulario.precos.pf.atacado.tipo = this.produto[0].precos.pf.atacado.tipo,
                this.formulario.precos.pf.atacado.complemento = this.produto[0].precos.pf.atacado.complemento,
                this.formulario.precos.pf.atacado.precoAntigo = this.produto[0].precos.pf.atacado.precoAntigo,
                this.formulario.precos.pf.atacado.desconto = this.produto[0].precos.pf.atacado.desconto,
                this.formulario.precos.pf.atacado.precoAtual = this.produto[0].precos.pf.atacado.precoAtual,
                this.formulario.precos.pf.atacado.limitePorCliente = this.produto[0].precos.pf.atacado.limitePorCliente,

                this.formulario.precos.pj.varejo.tipo = this.produto[0].precos.pj.varejo.tipo,
                this.formulario.precos.pj.varejo.complemento = this.produto[0].precos.pj.varejo.complemento,
                this.formulario.precos.pj.varejo.precoAntigo = this.produto[0].precos.pj.varejo.precoAntigo,
                this.formulario.precos.pj.varejo.desconto = this.produto[0].precos.pj.varejo.desconto,
                this.formulario.precos.pj.varejo.precoAtual = this.produto[0].precos.pj.varejo.precoAtual,
                this.formulario.precos.pj.varejo.limitePorCliente = this.produto[0].precos.pj.varejo.limitePorCliente,

                this.formulario.precos.pj.atacado.tipo = this.produto[0].precos.pj.atacado.tipo,
                this.formulario.precos.pj.atacado.complemento = this.produto[0].precos.pj.atacado.complemento,
                this.formulario.precos.pj.atacado.precoAntigo = this.produto[0].precos.pj.atacado.precoAntigo,
                this.formulario.precos.pj.atacado.desconto = this.produto[0].precos.pj.atacado.desconto,
                this.formulario.precos.pj.atacado.precoAtual = this.produto[0].precos.pj.atacado.precoAtual,
                this.formulario.precos.pj.atacado.limitePorCliente = this.produto[0].precos.pj.atacado.limitePorCliente,

                /*this.formulario.descricao = this.banner[0].descricao
                this.formulario.posicao = this.banner[0].posicao*/
                this.formulario.visibilidade = this.produto[0].visibilidade
                this.imagem = this.produto[0].arquivo


            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
        //console.log(this.produto)

    },
    mounted() {


    }
}
</script>

<style scoped lang="scss">

#input-imagem {
    display: none;
}

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
    text-align: left;
    width: 100%;
    margin-bottom: 0.5em;
}

.margem-final {
    width: 100%;
    height: 20vh;

}

</style>
