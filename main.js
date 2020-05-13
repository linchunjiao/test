import Vue from 'vue'
import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
import App from './App'

Vue.component('chunLei-modal',chunLeiModal);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
