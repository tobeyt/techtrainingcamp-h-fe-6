import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './style.css'

Vue.config.productionTip = false;

import http from "./http";
import './plugins/element.js'
// 所有网络请求通过 this.$http 调用
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
