<template>
    <div>
        <i class="fas fa-grip-lines" id="btn-menu" @click="toogle_menu()"></i>
        <nav class="menu" :class="{ ativo : ativo}">
            <i class="fas fa-arrow-left" id="btn-menu-fechar" @click="toogle_menu()"></i>


            <ul>
                <li @click="abrir_inicio()">
                    Início
                    <i class="fas fa-home"></i>
                </li>
                <li @click="abrir_produtos()">
                    Produtos
                    <i class="fas fa-lemon"></i>
                </li>
                <li @click="abrir_entregadores()">
                    Entregadores
                    <!--<i class="fas fa-truck"></i>-->
                    <i class="fas fa-people-arrows"></i>
                </li>
                <li @click="abrir_banners()">
                    Banners
                    <i class="fas fa-ad"></i>
                </li>
                <li>
                    Clientes
                    <i class="fas fa-users"></i>
                </li>
                <li @click="abrir_pedidos()">
                    Pedidos
                    <i class="fas fa-box-open"></i>
                </li>
                <li @click="abrir_paginas()">
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
        <div class="navigation-sobra" :class="{ fundoAtivo : fundoAtivo}" @click="toogle_menu()">

        </div>

    </div>

</template>

<script>
export default {
    name: 'LayoutNavigation',
    data: () => {
        return {
            ativo: false,
            fundoAtivo: false,
        }
    },
    methods: {
        toogle_menu() {
            this.ativo = !this.ativo
            this.fundoAtivo = !this.fundoAtivo
        },
        async sair () {
            this.$root.$emit('Spinner::show')

            await this.$firebase.auth().signOut()

            this.$router.push({ name: 'login' })

            this.$root.$emit('Spinner::hide')
        },
        abrir_inicio() {
            this.$router.push({ name: 'home' })
            this.toogle_menu()
        },
        abrir_entregadores () {
            this.$router.push({ name: 'entregadores' })
            this.toogle_menu()
        },
        abrir_banners() {
            this.$router.push({ name: 'banners' })
            this.toogle_menu()
        },
        abrir_produtos() {
            this.$router.push({ name: 'produtos' })
            this.toogle_menu()
        },
        abrir_pedidos() {
            this.$router.push({ name: 'pedidos' })
            this.toogle_menu()
        },
        abrir_paginas() {
            this.$router.push({ name: 'paginas'})
            this.toogle_menu()
        }

    }
}
</script>

<style scoped lang="scss">



#btn-menu {
    font-size: 1.7em;
    position: fixed;
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

.navigation-sobra {
    position: fixed;
    top: 0;
    right: -83%;
    width: 83%;
    height: 100%;
    background-color: transparent;
    z-index: 990;
}

.ativo {
    left: 0 !important;

}

.fundoAtivo {
    right: 0 !important;
}

#btn-menu-fechar {
    font-size: 1.7em;
    position: absolute;
    top: 1em;
    right: 9%;
    z-index: 980;
    cursor: pointer;

}

ul {
    list-style-type: none;
    padding-top: 1.5em;
}

li {
    padding: 5% 9%;
    width: 82%;
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
    margin-top: 9%;
    color: var(--dark);
}


@media (max-width: 1199.98px) {

.menu {
    left: -27%;
    width: 27%;

}

.navigation-sobra {
    width: 73%;
    right: -73%;
}

}

@media (max-width: 991.98px) {

.menu {
    left: -35%;
    width: 35%;

}

.navigation-sobra {
    width: 65%;
    right: -65%;
}

}

@media (max-width: 767.98px) {

.menu {
    left: -55%;
    width: 55%;

}

.navigation-sobra {
    width: 45%;
    right: -45%;
}

}

@media (max-width: 575.98px) {

.menu {
    left: -70%;
    width: 70%;

}

.navigation-sobra {
    width: 30%;
    right: -30%;
}

}

</style>
