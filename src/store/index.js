import Vue from "vue";
import Vuex from "vuex";

import weather from "./weather";
import maps from "./maps";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    maps,
    weather
  }
});
