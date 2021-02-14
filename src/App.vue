<template>
  <div id="app">
    <div class="container">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import gmapsLoader from "@/mixins/gmapsLoader";
export default {
  mixins: [gmapsLoader]
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  pading: 0;
  margin: 0;
  height: 100%;
  background-image: url("./assets/bg.jpg");
  background-size: cover;
  background-position: center;
  font-family: "Lato", sans-serif;
}
h1 {
  color: #fff;
  font-weight: 800;
  margin: 20px 0 0;
}
.container {
  width: 560px;
  margin-left: auto;
  margin-right: auto;
}
#app {
  -webkit-font-smoothing: antialiased;
  background: rgba(53, 53, 53, 0.35);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
