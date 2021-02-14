import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import WeatherDetails from "../views/WeatherDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:city/:country/details",
    name: "WeatherDetails",
    props: true,
    component: WeatherDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
