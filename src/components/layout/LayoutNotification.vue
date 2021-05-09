<template>
    <div class="notificacao" v-if="show" :class="`${type}`">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
        <i class="far fa-times-circle" id="fechar-notification" @click="fechar_notification()"></i>
    </div>
</template>

<script>
export default {
    name : 'LayoutNotification',
    data: () => ({
        show: false,
        title: '',
        message: '',
        type: 'n-comum'
    }),
    methods: {
        fechar_notification () {
            this.title = ''
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
            this.title = payload.title

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
    width: 30%;
    min-height: 8vh;
    padding: 1em;
    border-radius: 0.5em;
    //transition: 0.5s;
    box-shadow: 3px 3px 9px gray;
}

.n-comum {
    background-color: rgba(2, 117, 216, 0.9);
}

.n-erro {
    background-color: rgba(217, 83, 79, 0.9);

}

.n-sucesso {
    background-color: rgba(92, 184, 92, 0.9);
}

#fechar-notification {
    position: absolute;
    right: 0.7em;
    top: 0.7em;
    cursor: pointer;
    color: #fff;
    font-size: 1.3em;
}

@media (max-width: 1199.98px) {



}

@media (max-width: 991.98px) {

.notificacao {
    width: 38%;
}

}

@media (max-width: 767.98px) {

.notificacao {
    width: 45%;
}

}

@media (max-width: 575.98px) {

.notificacao {
    width: 55%;
}


}

</style>
