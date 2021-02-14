<template>
  <div class="home">
    <div class="logo-section">
      <img alt="Logo AirApp" class="logo" src="../assets/clouds.svg" />
      <h1>AirApp</h1>
    </div>
    <div class="welcome-section">
      <p>
        Check the weather! Enter a city name or
        <b>leave it empty for geolocation</b>.
      </p>
    </div>
    <div class="input-section">
      <form @submit.prevent="getCurrentWeather(city)">
        <CityInput @input="city = $event" />
        <button type="submit">
          Check
        </button>
      </form>
    </div>
    <div class="data-section">
      <div class="info-box" v-if="error">
        <p>{{ error }}</p>
      </div>
      <template v-else-if="gl_position && weather">
        <WeatherBox :content="weather" />
      </template>
      <div class="info-box" v-else-if="gl_positionStatus === 0">
        <p>You didn't share you localization :C</p>
      </div>
      <div class="info-box" v-else-if="gl_positionStatus === -1">
        <p>An error occured during the geolocating :C</p>
      </div>
      <div class="info-box" v-else>
        <p>We're tracking you right now ;)</p>
      </div>
    </div>
    <pre></pre>
  </div>
</template>

<script>
import CityInput from "@/components/CityInput.vue";
import WeatherBox from "@/components/WeatherBox.vue";
import geolocation from "@/mixins/geolocation";
import gmapsPlacesService from "@/mixins/gmapsPlacesService";
import gmapsLoader from "@/mixins/gmapsLoader";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    CityInput,
    WeatherBox
  },
  mixins: [geolocation, gmapsLoader, gmapsPlacesService],
  data() {
    return {
      city: ""
    };
  },
  computed: {
    ...mapState("weather", ["weather", "error"])
  },
  watch: {
    gmps_city(newVal) {
      if (newVal) {
        this.getCurrentWeather(newVal);
      }
    },
    async gl_position(newVal) {
      if (newVal) {
        await this.gmps_getCity(newVal);
      }
    }
  },
  async mounted() {
    await this.gl_locateMe();
  },
  methods: {
    ...mapActions("weather", ["getCurrentWeather"])
  }
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 48px;
}
.logo {
  width: 96px;
  margin-right: 10px;
  &-section {
    display: flex;
    justify-content: center;
  }
}
.welcome-section {
  p {
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #efefef;
    b {
      color: #fff;
      font-weight: 700;
    }
  }
}
.input-section {
  padding: 25px 0;
  form {
    width: 100%;
    display: flex;
  }
  button {
    border: 0;
    margin-left: 15px;
    background: rgba(255, 255, 255, 0.5);
    color: #fff;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    flex-basis: 35%;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
}
.data-section {
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  padding: 20px 0;
  position: relative;
}
.info-box {
  height: 116px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 21px;
}
</style>
