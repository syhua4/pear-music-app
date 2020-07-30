import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import './assets/css/base.scss';
import VueLazyLoad from 'vue-lazyload';
import Toast from 'plugin/Toast/index';
import VueClipboard from 'vue-clipboard2';

fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  loading: require('assets/images/loading.png')
});
Vue.use(Toast);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
