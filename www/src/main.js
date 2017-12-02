// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Request from '@/plugins/request';
import axios from 'axios';
import Vuex from 'vuex';

Vue.config.productionTip = false

// axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:7001/blog/v1/';
axios.interceptors.response.use(function (res) {
  // Do something with response data
  if (res && res.data && res.data.code > 0) {
    //resolve(res.data.data);
  } else {
    //
    //this.$Message.error(res.data.msg);
    console.error(res.data.msg);
  }
  return res;
}, function (error) {
  // Do something with response error
  this.$Message.error('请求失败！');
  return Promise.reject(error);
});

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
  template: '<App/>',
  components: { App }
})
