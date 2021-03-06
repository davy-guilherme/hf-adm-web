<template>
    <div>
        <i class="fas fa-grip-lines" id="btn-menu" @click="toogle_menu()"></i>
        <nav class="menu" :class="{ ativo : ativo}">
            <i class="fas fa-arrow-left" id="btn-menu-fechar" @click="toogle_menu()"></i>


            <ul>
                <li @click="this.$router.push({ name: 'login' })">
                    Início
                    <i class="fas fa-home"></i>
                </li>
                <li>
                    Produtos
                    <i class="fas fa-lemon"></i>
                </li>
                <li>
                    Entregadores
                    <!--<i class="fas fa-truck"></i>-->
                    <i class="fas fa-people-arrows"></i>
                </li>
                <li>
                    Banners
                    <i class="fas fa-ad"></i>
                </li>
                <li>
                    Clientes
                    <i class="fas fa-users"></i>
                </li>
                <li>
                    Pedidos
                    <i class="fas fa-box-open"></i>
                </li>
                <li>
                    Páginas
                    <i class="fas fa-laptop-code"></i>
                </li>
                <li>
                    Relatórios
                    <i class="fas fa-chart-bar"></i>
                </li>
                <li class="btn-sair" @click="sair()">
                    Sair
                </li>
            </ul>
        </nav>

    </div>

</template>

<script>
export default {
    name: 'LayoutNavigation',
    data: () => {
        return {
            ativo: false
        }
    },
    methods: {
        toogle_menu() {

            this.ativo = !this.ativo
        },
        async sair () {
            this.$root.$emit('Spinner::show')

            await this.$firebase.auth().signOut()

            this.$router.push({ name: 'login' })

            this.$root.$emit('Spinner::hide')
        }

    }
}
</script>

<style scoped lang="scss">


#btn-menu {
    font-size: 1.7em;
    position: absolute;
    top: 1em;
    left: 5%;
    z-index: 980;
    cursor: pointer;
    padding: 0;
    color: var(--featured-dark);
}

.menu {
    position: fixed;
    top: 0;
    left: -17%;
    width: 17%;
    min-height: calc(100vh - 3.3em);
    background-color: var(--featured);
    color: white;
    transition: .5s;
    padding-top: 3.3em;
    z-index: 990;
}

.ativo {
    left: 0 !important;

}

#btn-menu-fechar {
    font-size: 1.7em;
    position: absolute;
    top: 1em;
    right: 7%;
    z-index: 980;
    cursor: pointer;
}

ul {
    list-style-type: none;
    padding-top: 1.5em;
}

li {
    padding: 5% 7%;
    width: 86%;
    cursor: pointer;
    &:hover {
        background-color: var(--featured-dark);
    }
}

li i {
    position: relative;
    float: right;
}

.btn-sair {
    margin-top: 20%;
    color: var(--dark);
}


@media (max-width: 1199.98px) {

.menu {
    left: -27%;
    width: 27%;

}

}

@media (max-width: 991.98px) {

.menu {
    left: -35%;
    width: 35%;

}

}

@media (max-width: 767.98px) {

.menu {
    left: -55%;
    width: 55%;

}

}

@media (max-width: 575.98px) {

.menu {
    left: -70%;
    width: 70%;

}

}

</style>
