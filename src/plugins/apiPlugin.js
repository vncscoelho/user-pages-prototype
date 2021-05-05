import API from '@/api';

export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$api = new API();
  },
};
