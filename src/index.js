import Vue from 'vue';
import Main from './app/Main.vue';
import BookList from './app/BookList.vue';
import store from './store';
import MyBooksList from './app/MyBooksList.vue';

import './index.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueI18n);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Main
      },
      children: [
        {
          path: 'books',
          component: BookList
        },
        {
          path: 'mybooks',
          component: MyBooksList
        }
      ]
    }
  ]
});


Vue.config.lang = 'en'

var locales = {
  en: {
    header: {
      title: 'Books recommendations',
      books: 'Books',
      myBooks: 'My Books',
      allBooks: 'All Books',
      rec: 'Quick recommendations',
      info: 'Rate books and get great recommendations',
      acc: 'Account'
    }
  },
  pl: {
    header: {
      title: 'Rekomendacje książek',
      books: 'Książki',
      allBooks: 'Wszystkie książki',
      myBooks: 'Moje książki',
      rec: 'Szybkie polecenie',
      info: 'Oceniaj książki i ciesz się świetnymi rekomendacjami',
      acc: 'Account'
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
