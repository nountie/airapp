import { weatherAPI } from "@/helpers/api";

export default {
  namespaced: true,
  state: {
    forecast: null,
    weather: null,
    error: null
  },
  mutations: {
    SET_WEATHER(state, payload) {
      state.weather = payload;
    },
    SET_FORECAST(state, payload) {
      state.forecast = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    async getWeatherForecast({ commit }, city) {
      try {
        const { data } = await weatherAPI.get("/forecast", {
          params: {
            q: city
          }
        });
        commit("SET_ERROR", null);
        commit("SET_FORECAST", data);
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
      }
    },
    async getCurrentWeather({ commit }, city) {
      try {
        const { data } = await weatherAPI.get("/weather", {
          params: {
            q: city
          }
        });
        commit("SET_ERROR", null);
        commit("SET_WEATHER", data);
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
      }
    }
  }
};
