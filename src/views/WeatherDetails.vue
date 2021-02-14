<template>
  <div class="forecast">
    <div class="logo-section">
      <img alt="Logo AirApp" class="logo" src="../assets/clouds.svg" />
      <h1>AirApp</h1>
    </div>
    <header class="forecast-header">
      <div class="cell">
        <b>Date:</b> {{ date(new Date().getTime() / 1000) }}
      </div>
      <div class="cell"><b>Location:</b> {{ city }}, {{ country }}</div>
    </header>
    <div class="forecast-main">
      <table class="forecast-list" v-if="upcomingHoursForecast.length">
        <th>Hour</th>
        <th>Temperature</th>
        <th>Description</th>
        <tr v-for="(item, i) in upcomingHoursForecast" :key="i">
          <td>{{ retrieveHours(item.dt_txt) }}</td>
          <td>{{ kelvinToCelsius(item.main.temp) }} °C</td>
          <td>{{ item.weather[0].description }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueStore from "@/store";
import { kelvinToCelsius, retrieveHours, date } from "@/helpers/formatters";

export default {
  name: "WeatherDetails",
  props: {
    city: {
      required: true,
      type: String
    },
    country: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState("weather", ["forecast"]),
    upcomingHoursForecast() {
      let forecastList;
      if (this.forecast) {
        forecastList = [...this.forecast.list];
        return forecastList.splice(0, 6);
      } else return [];
    }
  },
  async beforeRouteEnter(to, from, next) {
    await VueStore.dispatch("weather/getWeatherForecast", to.params.city);
    next();
  },
  methods: {
    kelvinToCelsius,
    retrieveHours,
    date
  }
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 40px;
}
.logo {
  width: 86px;
  margin-right: 10px;
  &-section {
    display: flex;
  }
}
.forecast {
  font-size: 18px;
  &-loading {
    background: rgba(255, 255, 255, 0.2);
    padding: 30px 20px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  &-header {
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    padding: 20px;
    .cell {
      justify-content: center;
      display: flex;
      flex-basis: 50%;
      b {
        margin-right: 6px;
        font-weight: 800;
      }
    }
  }
  &-main {
    margin-left: -7px;
    margin-right: -7px;
  }
  &-list {
    border-spacing: 7px;
    width: 100%;
    margin-top: 25px;
    th {
      letter-spacing: 0.5px;
      padding: 10px;
      font-weight: 800;
    }
    td {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px 0;
      width: 33.333%;
      text-align: center;
    }
  }
}
</style>
