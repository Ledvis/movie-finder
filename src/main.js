import Vue from "vue";
import VeeValidate from "vee-validate";
import App from "./app/App.vue";
import store from "./app/store";
import router from "./app/router/index";

Vue.use(VeeValidate);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
