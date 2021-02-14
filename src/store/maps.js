export default {
  namespaced: true,
  state: {
    container: null,
    resolver: null
  },
  mutations: {
    SET_CONTAINER(state, payload) {
      state.container = payload;
    },
    SET_RESOLVER(state, payload) {
      state.resolver = payload;
    }
  },
  actions: {
    async setContainer({ commit }, container) {
      commit("SET_CONTAINER", container);
    },
    async getGmaps({ commit }) {
      if (!window.google || !window.google.maps) {
        return new Promise(resolve => {
          commit("SET_RESOLVER", resolve);
        });
      } else return Promise.resolve(window.google.maps);
    }
  }
};
