import Vue from 'vue';
import App from './App';
import router from './router';
import Request from './plugins/request';
import Moment from './plugins/moment';
import store from './store';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7001/blog/v1/'   // base url
axios.defaults.withCredentials = true;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Request);
Vue.use(Moment);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');