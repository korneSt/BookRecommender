import Vue from 'vue';
import Main from './app/Main.vue';
import store from './store';


import './index.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueI18n);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Main
      }
    }
  ]
});

Vue.config.lang = 'pl'

var locales = {
  en: {
    header: {
      info: 'Rate books and get great recommendations'
    }
  },
  pl: {
    header: {
      info: 'Oceniaj książki i ciesz się świetnymi rekomendacjami'
    }
  }
};

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang]);
});

export default new Vue({
  el: '#root',
  router,
  store,

  render: h => h('router-view')
});
