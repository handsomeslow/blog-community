// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Request from '@/plugins/request';
import lrz from 'lrz'
import client from './plugins/alioss'

Vue.config.productionTip = false

// axios
import axios from 'axios'
axios.defaults.baseURL = 'http://api.grow666.com/blog/v1/'   // base url
axios.defaults.withCredentials = true;
// import css
import './assets/css/material-icons.css'     // material-icons.css
import './assets/css/reset.css'              // reset.css
import 'animate.css'                         // animate.css

//Vue.use(Request);
// muse
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',  
  store,
  router,
  client,
  template: '<App/>',
  components: { App }
})
