import Vue from 'vue'
import App from './App.vue'
import router from './router'
import G2Up from '../lib/g2-up.umd'
console.log(G2Up)
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
