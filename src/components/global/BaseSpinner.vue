<template>
    <div class="base-spinner fa-3x" v-if="visible">
        <i class="fas fa-circle-notch fa-spin"></i>
    </div>
</template>

<script>
export default {
    name: 'Spinner',
    data () {
        return {
            visible: true
        }
    },
    created () {
        //console.log('Componente criado')
        //console.log(this)
        this.$root.$on('Spinner::show', () => {
            this.visible = true
        })

        this.$root.$on('Spinner::hide', () => {
            this.visible = false
        })
    }
}
</script>

<style scoped lang="scss">
/* @import '../../assets/scss/variables'; */

.base-spinner {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center; //vertial
    justify-content: center; //horizontal
    //background-color: $dark;
    //color: $featured;
    background-color: var(--featured);
    color: white;
    z-index: 1000;

}
</style>
