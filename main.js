import Vue from 'vue'
import App from './App'
import api from './utils/api'

Vue.prototype.$fly = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
