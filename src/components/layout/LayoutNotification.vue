<template>
    <div class="notificacao" v-if="show" :class="`${type}`">
        <h4>Notificacao</h4>
        <p>{{ message }}</p>
        <i class="far fa-times-circle" id="fechar-notification" @click="fechar_notification()"></i>
    </div>
</template>

<script>
export default {
    name : 'LayoutNotification',
    data: () => ({
        show: false,
        message: '',
        type: 'n-comum'
    }),
    methods: {
        fechar_notification () {
            this.message = '',
            this.type = 'n-comun',
            this.show = false
        }
    },
    created () {
        //this.$root.$on('Notification::show'), () => { //sem payload
        this.$root.$on('Notification::show', payload => {
            this.show = true
            this.type = payload.type
            this.message = payload.message

            //fechar apos algum tempo
            setTimeout(() => {
                this.fechar_notification ()
            }, payload.timeout || 10000)

        })
    }
}
</script>

<style scoped lang="scss">
.notificacao {
    position: fixed;
    z-index: 970;
    right: 5%;
    top: 2.5em;
    max-width: 35%;
    padding: 0.5em;
    border-radius: 0.5em;
    //transition: 0.5s;
}

.n-comum {
    background-color: blue;
}

.n-erro {
    background-color: red;

}

.n-sucesso {
    background-color: green;
}

#fechar-notification {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    cursor: pointer;
}

</style>
