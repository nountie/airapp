import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
import vClickOutside from "v-click-outside";
import Vuex from "vuex";
import store from "@/store";

Vue.use(vClickOutside);
Vue.use(Vuex);

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
