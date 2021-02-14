import axios from "axios";

export const weatherAPI = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.VUE_APP_WEATHER_API_KEY
  }
});
