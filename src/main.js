import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('assets/images/loading.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
