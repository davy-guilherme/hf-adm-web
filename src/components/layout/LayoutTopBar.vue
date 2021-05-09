<template>
    <div class="top-bar">
      <layout-user-info class="user-info" />
      <ul>
        <li><i class="fas fa-pause-circle"></i> {{ pedidos.status1.length }}</li>
        <li><i class="fas fa-check"></i> {{ pedidos.status2.length }}</li>
        <li><i class="fas fa-cubes"></i> {{ pedidos.status3.length }}</li>
        <li><i class="fas fa-shipping-fast"></i> {{ pedidos.status4.length }}</li>
      </ul>

    </div>
</template>

<script>
import LayoutUserInfo from './LayoutUserInfo'
export default {
  components: { LayoutUserInfo },
    name : 'LayoutTopBar',
    data: () => ({
        pedidos: {
          status1: [],
          status2: [],
          status3: [],
          status4: []
        }
    }),
    methods: {
      buscarStatus1() {
        // const ref = this.$firebase.database().ref(`funcionarios/${usuario.uid}`)

        const ref = this.$firebase.database().ref('pedidos')

        ref.orderByChild('statusPedido').equalTo('1').on('value', snapshot => {
          const values = snapshot.val()
          this.pedidos.status1 = Object.keys(values).map(i => values[i])
          // console.log(this.pedidos)
        })

      },
      buscarStatus2() {
        const ref = this.$firebase.database().ref('pedidos')

        ref.orderByChild('statusPedido').equalTo('2').on('value', snapshot => {
          const values = snapshot.val()
          this.pedidos.status2 = Object.keys(values).map(i => values[i])
          // console.log(this.pedidos)
        })
      },
      buscarStatus3() {
        const ref = this.$firebase.database().ref('pedidos')

        ref.orderByChild('statusPedido').equalTo('3').on('value', snapshot => {
          const values = snapshot.val()
          this.pedidos.status3 = Object.keys(values).map(i => values[i])
          // console.log(this.pedidos)
        })
      },
      buscarStatus4() {
        const ref = this.$firebase.database().ref('pedidos')

        ref.orderByChild('statusPedido').equalTo('4').on('value', snapshot => {
          const values = snapshot.val()
          this.pedidos.status4 = Object.keys(values).map(i => values[i])
          // console.log(this.pedidos)
        })
      }
    },
    created () {
      // console.log(this.$firebase.auth().currentUser.uid)

      this.buscarStatus1()
      this.buscarStatus2()
      this.buscarStatus3()
      this.buscarStatus4()

    }
}
</script>

<style scoped lang="scss">
.top-bar {
    position: fixed;
    z-index: 960;
    right: 5%;
    top: 1.8em;
    width: 90%;
    padding: 0;
    font-size: 1em;
    ul {
      position: relative;
      float: right;
      color: #666;
      text-align: right;
      li {
        display: inline;
        margin: 0 0 0 1.6em;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          color: #111;
        }
      }
    }
}

.user-info {
  color: #333;
  position: relative;
  float: right;
  margin-left: 1.6em;
}



@media (max-width: 1199.98px) {


}

@media (max-width: 991.98px) {


}

@media (max-width: 767.98px) {

.top-bar {

    ul {

      li {

        margin: 0 0 0 1.2em;

      }
    }
}

.user-info {
  color: #333;
  position: relative;
  float: right;
  margin-left: 1.2em;
  font-size: 1em;
}



}

@media (max-width: 575.98px) {



}

</style>
