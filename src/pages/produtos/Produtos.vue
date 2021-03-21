<template>
    <div>
        <h1>Produtos</h1>
        <adicionar-produto />
        <div class="produtos">
          <div class="buscar-produtos">
            <label for="buscar">Buscar</label>
            <input type="text" id="buscar" v-model="busca" @keyup="getData()" />
          </div>

          <div class="produto" v-for="produto in produtos_filtrados" :key="produto.id" @click="ver_produto(produto.id)">

              <img :src="produto.arquivo" />

              <div class="info">
                <p>{{ produto.nome }}</p>
                <!--<p>{{ produto.precos.pf.varejo.descricao }}</p>-->
                <p>{{ produto.precos.pf.varejo.precoAtual }}</p>
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
      produtos_filtrados: []
    }),
    created () {
       this.getData()

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

}

.buscar-produtos {
  width: 100%;
  margin-bottom: 1.5em;
}

.buscar-produtos input {
  width: 100%;
}

.produto {
  background-color: #999;
  margin: 1em 0;
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
  float: left;
  height: auto;
  width: 13.1%;
  margin: 0.5%;
  cursor: pointer;
}

img {
  width: 100%;
  border-radius: 0.3em;
}


@media (max-width: 1199.98px) {

.produto {
  width: calc(16% - 1em);
  margin: 0.5%;
}



}

@media (max-width: 991.98px) {

.produto {
  width: calc(24% - 1em);
  margin: 0.5%;
}

}

@media (max-width: 767.98px) {

.produto {
  width: calc(32% - 1em);
  margin: 0.5%;
}


}

@media (max-width: 575.98px) {

.produto {
  width: calc(49% - 1em);
  margin: 0.5%;
}

}




</style>
