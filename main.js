import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

const fly = new Fly()
Vue.prototype.$fly = fly
Vue.prototype.$fly.interceptors.request.use((config, promise) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
})