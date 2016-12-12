import Vue from 'vue';
import Main from './app/Main.vue';
import store from './store';

import './index.css';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

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

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
