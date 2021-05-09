<template>
    <div class="info-usuario">
        <small>{{ this.nome[0] + " " + this.nome[this.tamanhoNome - 1] }}</small>
    </div>
</template>

<script>
export default {
    name : 'LayoutUserInfo',
    data: () => ({
        usuarioId: '',
        funcionario: '',
        nome: '',
        tamanhoNome: 0

    }),
    methods: {
      buscarFuncionario(usuario) {
        // const ref = this.$firebase.database().ref(`funcionarios/${usuario.uid}`)

        this.$firebase.database().ref(`funcionarios/${usuario.uid}`).once('value').then(
            (data) => {
              this.funcionario = data.val()
              this.nome = data.val().nome.split(" ")
              this.tamanhoNome = this.nome.length
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
      }
    },
    created () {
      // console.log(this.$firebase.auth().currentUser.uid)
      this.$firebase.auth().onAuthStateChanged(user => {
        //operacao ternaria
        this.usuarioId = user.uid
        this.buscarFuncionario(user)
      })


    }
}
</script>

<style scoped lang="scss">



</style>
