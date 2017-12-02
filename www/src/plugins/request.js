/* eslint-disable */
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:7001/blog/v1/';
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('re')
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
// const host = process.env.host;
// const MyPlugin = {};
// const ajax = axios.create({
//   baseURL: 'http://localhost:7001/blog/v1/',
//   timeout: 30000
// });
// const createRequestFuc = (name) => {
//   return function (resource, params, showError = true) {
//     return new Promise((resolve, reject) => {
//       //
//       //this.$Loading.start();
//       params = name === 'get' ? { params } : params;
//       ajax[name](resource, params)
//         .then(res => {
//           if (res && res.data && res.data.code > 0) {
//             resolve(res.data.data);
//           } else {
//             //
//             showError && this.$Message.error(res.data.msg);
//             reject(res.data.msg);
//           }
//           //
//           //this.$Loading.finish();
//         })
//         .catch((err) => {
//           //
//           this.$Message.error('请求失败！');
//           reject(err);
//         });
//     });
//   }
// }
// MyPlugin.install = function install(Vue) {
//   Vue.prototype.$get = createRequestFuc('get');
//   Vue.prototype.$put = createRequestFuc('put');
//   Vue.prototype.$post = createRequestFuc('post');
//   Vue.prototype.$patch = createRequestFuc('patch');
//   Vue.prototype.$delete = createRequestFuc('delete');
// };
// export default MyPlugin;
/* eslint-enable */
