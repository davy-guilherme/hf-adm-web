<template>
    <div>
        <h1>Produtos</h1>
        <adicionar-produto />
        <div class="produtos">
          <div class="buscar-produtos">
            <label for="buscar">Buscar em Produtos:</label>
            <input type="text" id="buscar" v-model="busca" @keyup="getData()" />
          </div>

          <div class="produto" v-for="produto in produtos_filtrados" :key="produto.id" @click="ver_produto(produto.id)">

              <div class="imagem-do-produto" :style="largura_img">
                <img :src="produto.arquivo" />
              </div>

              <div class="info">
                <p>{{ produto.nome }} ({{ produto.precos.pf.varejo.tipo }})</p>
                <!--<p>{{ produto.precos.pf.varejo.descricao }}</p>-->
                <!--<p>{{ produto.precos.pf.varejo.precoAtual }}</p>-->
                <p v-money-format="produto.precos.pf.varejo.precoAtual"></p>
              </div>

            <!--<i class="far fa-eye ver" @click="ver_produto(produto.id)"></i>-->
          </div>
        </div>
    </div>
</template>

<script>
import AdicionarProduto from './AdicionarProduto.vue'
export default {
    components: { AdicionarProduto },
    name: 'Produtos',
    data: () => ({
      busca: '',
      produtos: [],
      produtos_filtrados: [],
      tamanho_img: 200
    }),
    computed: {
      largura_img () {
        //return 'width: ' + this.tamanho_img + 'px';
        return 'height: ' + this.tamanho_img + 'px';
      }
    },
    created () {
       this.getData()

       window.addEventListener("resize", this.myEventHandler);

       this.myEventHandler()

    },
    destroyed() {

      window.removeEventListener("resize", this.myEventHandler);

    },
    methods: {
      getData() {
        const ref = this.$firebase.database().ref('produtos')

        ref.on('value', snapshot => {
          const values = snapshot.val()
          this.produtos = Object.keys(values).map(i => values[i])

          //console.log(this.produtos[1].nome)
          //this.produtos_filtrados = this.produtos.filter(this.produtos.nome)
          this.produtos_filtrados = []
          for (var i = 0; i < this.produtos.length; i++) {
              //if (this.produtos[i].nome == "banan") {
                if (this.produtos[i].nome.toUpperCase().includes(this.busca.toUpperCase())) {
                  this.produtos_filtrados.push(this.produtos[i]);

              }
          }
          //console.log(this.produtos_filtrados)

          //for (n.Object.keys(values) in this.produtos) {
            //if (n.nome == 'banan') {
            //  this.produtos_filtrados.push(n)
            //}
            //console.log(n)
          //}


        })
      },
      ver_produto (idProduto) {
        this.$router.push({ name: 'produto', params: { id: idProduto } })
        //console.log(idEntregador)
      },
      myEventHandler() {
        var larguraJanela = window.innerWidth
        if (larguraJanela >= 1199) {
          this.tamanho_img = (larguraJanela * 0.82) / 7
        } else if (larguraJanela >= 992) {
          this.tamanho_img = (larguraJanela * 0.82) / 6
        } else if (larguraJanela >= 768) {
          this.tamanho_img = (larguraJanela * 0.82) / 4
        } else if (larguraJanela >= 558) {
          this.tamanho_img = (larguraJanela * 0.82) / 3
        } else {
          this.tamanho_img = (larguraJanela * 0.82) / 2
        }



      }

    }


}
</script>

<style scoped lang="scss">
/*
button {
    position: relative !important;
    margin: 0 auto !important;

}*/

h1 {
  padding: 0.5em 5%;
  text-align: left;
}

.produtos {
  width: 90%;
  padding: 1.5em 5%;
  display: table;
}

.buscar-produtos {
  width: 100%;
  display: table;
  margin-bottom: 1.5em;
  position: relative;
}

.buscar-produtos label {
  padding: 1%;
  font-size: 1.2em;

}

.buscar-produtos input {
  font-size: 1.2em !important;
  padding: 0.5em;
  width: calc(100% - 1em);
  margin-top: 0.2em;
}

.produto {
  background-color: #999;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
  float: left;
  height: auto;
  width: calc(14.28% - 2em);
  cursor: pointer;
}

.imagem-do-produto {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.imagem-do-produto img {
  width: 100%;
  border-radius: 0.3em;
}

.info {
  min-height: 80px;
  font-size: 0.9em;
  margin-top: 0.2em;
}


@media (max-width: 1199.98px) {

.produto {
  width: calc(15.6% - 1em);
  margin: 0.5%;
}



}

@media (max-width: 991.98px) {

.produto {
  width: calc(24% - 1em);
  margin: 0.5%;
}

.info {
  min-height: 80px;
  font-size: 1em;
}


}

@media (max-width: 767.98px) {

.produto {
  width: calc(30% - 1em);
  margin: 1%;
}



.info {
  min-height: 80px;
  font-size: 1.1em;
}


}

@media (max-width: 575.98px) {

.produto {
  width: calc(47% - 1em);
  margin: 1%;
}

.info {
  min-height: 60px;
  font-size: 1.3em;
}

}




</style>
