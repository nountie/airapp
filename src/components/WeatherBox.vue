<template>
  <div class="weather-box">
    <div class="temperature">
      <span> {{ kelvinToCelsius(content.main.temp) }} °C </span>
    </div>
    <div class="details">
      <ul>
        <li><b>Date:</b> {{ date(content.dt) }}</li>
        <li>
          <b>Location:</b> {{ `${content.name}, ${content.sys.country}` }}
        </li>
        <li><b>Description:</b> {{ description }}</li>
      </ul>
      <router-link
        :to="{
          name: 'WeatherDetails',
          params: { city: content.name, country: content.sys.country }
        }"
        class="more"
        >More</router-link
      >
    </div>
  </div>
</template>

<script>
import { kelvinToCelsius, date } from "@/helpers/formatters";

export default {
  name: "WeatherBox",
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    description() {
      return this.content.weather[0].description;
    }
  },
  methods: {
    kelvinToCelsius,
    date
  }
};
</script>

<style lang="scss" scoped>
.weather-box {
  display: flex;
  width: 100%;
  .temperature {
    flex-basis: 38%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 55px;
      font-weight: 800;
    }
  }
  .details {
    flex-basis: 62%;
    display: flex;
    justify-content: flex-start;
    ul {
      margin: 10px 0;
      padding-left: 15px;
      li {
        margin: 0 0 10px;
        font-size: 18px;
        b {
          font-weight: 800;
          display: inline-block;
          margin-right: 8px;
        }
      }
      list-style: none;
    }
    .more {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
      text-decoration: none;
      position: absolute;
      padding: 10px 14px 14px 10px;
      bottom: 0px;
      right: 0px;
    }
  }
}
</style>
