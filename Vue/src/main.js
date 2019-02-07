import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync';

import '../node_modules/bootstrap/dist/css/bootstrap.css'


//import BootstrapVue from 'bootstrap-vue'
//Vue.use(BootstrapVue);

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})


import {createStore} from './store/';
import {createRouter} from './router.js';
export function createApp(){
  const store = createStore();
  const router = createRouter(store);

  sync(store,router)

  const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  });

  return {app,router,store};
}

