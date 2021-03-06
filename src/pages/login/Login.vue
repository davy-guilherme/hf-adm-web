<template>
    <div>
        <form @submit.prevent="fazerLogin()" id="box-login">
            <h1>Acesso</h1>
            <label for="email">E-mail:</label>
            <input required type="email" v-model="email" />

            <label for="senha">Senha:</label>
            <input required type="password" v-model="senha" />
            <button :disabled="loading">
                <template v-if="loading">
                    Entrando
                    <i class="fa fa-spinner fa-spin"></i>
                </template>
                <template v-else>
                    Entrar
                    <i class="fa fa-sign-in-alt"></i>
                </template>
            </button>

        </form>
    </div>

</template>

<script>
export default {
    name: 'Login',
    data: () => {
        return {
            loading: false,
            email: '',
            senha: ''
        }
    },
    methods: {
        async fazerLogin () {
            //console.log('enviou o form')

            this.loading = true

            const { email, senha } = this

            try {
                const res = await this.$firebase.auth().signInWithEmailAndPassword(email, senha);
                //soh consigo usar await in funcoes assincronas
                //console.log(res)
                window.uid = res.user.uid
                //this.$router.push({ name: 'home' })

            } catch (err) {
                console.log(err)
            }

            this.loading = false
        }
    },
    beforeRouteEnter (to, from, next) {
        //nao tem acesso ao this pq a instancia nao foi criada nesse gancho/hook
        //vc eh o this pq this eh resercado
        next(vm => {
            if (window.uid) {
                vm.$router.push({ name : 'home' })
            }
        })
    }
}
</script>

<style scoped lang="scss">
div {

    height: auto;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center; //vertial
    justify-content: center; //horizontal
}

#box-login {
    background-color: var(--dark-low);
    width: 33%;
    height: auto;
    color: white;
    border-radius: 0.7em;
    padding: 1.5em 0.9em;
}


label {
    display: block;
    margin-top: 0.5em;
}

input {
    display: block;
    width: 98%;
    border-radius: 0.3em;
    border: none;
    padding: 1%;

}

button {
    display: block;
    color: var(--ligther);
}

@media (max-width: 1199.98px) {
#box-login {
    width: 40%;
}

}

@media (max-width: 991.98px) {

#box-login {
    width: 50%;
}

}

@media (max-width: 767.98px) {

#box-login {
    width: 65%;
}

}

@media (max-width: 575.98px) {

#box-login {
    width: 80%;
}

}


</style>
