import Vue from 'vue'

Vue.directive('money-format', (el, { value }) => {
    //console.log(value)
    //console.log(el)
    el.innerHTML = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
        minimumFractionDigits: 2
    }).format(value || 0)
})
