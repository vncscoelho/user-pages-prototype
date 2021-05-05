import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apiPugin from './plugins/apiPlugin';

Vue.config.productionTip = false;
Vue.use(apiPugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
