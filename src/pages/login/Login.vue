<template>
    <div class="login"><div class="bg-branco">
        <form @submit.prevent="fazerLogin()" id="box-login">
            <h1>Acesso</h1>
            <label for="email">E-mail:</label>
            <input required type="email" id="email" v-model="email" />

            <label for="senha">Senha:</label>
            <input required type="password" id="senha" v-model="senha" />
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
    </div></div>

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
                await this.$firebase.auth().signInWithEmailAndPassword(email, senha);
                //const res = await this.$firebase.auth().signInWithEmailAndPassword(email, senha);
                //soh consigo usar await in funcoes assincronas
                //console.log(res)
                //window.uid = res.user.uid
                //this.$router.push({ name: 'home' })
                this.$root.$emit('Notification::show', {
                    type: 'n-sucesso',
                    title: 'Pronto!',
                    message: 'Login realizado com sucesso.'
                })

            } catch (err) {
                let message = ''
                //tratar 2 principais tipos de erro
                switch (err.code) {
                    case 'auth/user-not-found' :
                        message = 'Não foi possível localizar o usuário.'
                        break
                    case 'auth/wrong-password' :
                        message = 'Senha inválida'
                        break
                    default:
                        message = 'Não foi possível fazer login, tente novamente'
                }

                this.$root.$emit('Notification::show', {
                    type: 'n-erro',
                    message: message,
                    title: 'Ops...'
                })

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
.login {

    height: auto;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center; //vertial
    justify-content: center; //horizontal
    margin: 0;
    padding: 0;
    background-image: url('~@/assets/img/fundo-pera.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
}

.bg-branco {
    height: auto;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center; //vertial
    justify-content: center; //horizontal
    margin: 0;
    padding: 0;
    background-color: rgba($color: #fff, $alpha: 0.25);
}

#box-login {
    background-color: var(--light-low);
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
    margin-top: 0.4em;
}

button {
    display: block;
    color: var(--ligther);
    margin-top: 0.6em;
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
    width: 100%;
    border-radius: 0;
    padding: 1.5em 10%;
}

label {
    margin-top: 1em;
}

button {
    margin-top: 1.2em;

}

}

@media (max-width: 575.98px) {


#box-login {
    padding: 1.5em 6%;
}

}


</style>
