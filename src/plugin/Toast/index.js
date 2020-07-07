import Toast from './Toast.vue';
const obj = {};

obj.install = function(Vue) {
  console.log('toast installed');
  const toastConstructor = Vue.extend(Toast);
  const toastInstance = new toastConstructor();
  let oDiv = document.createElement('div');
  document.body.appendChild(oDiv);
  toastInstance.$mount(oDiv);
  Vue.prototype.$toast = toastInstance;
};
export default obj;
