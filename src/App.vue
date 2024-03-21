<template>
  <BannerComp/>
  <router-view/>
  <FooterComp/>
</template>

<script>
import BannerComp from "./components/Banner.vue";
import FooterComp from '@/components/Footer.vue'

export default {
  name: "App",
  components: {
    BannerComp,
    FooterComp
  }
}
</script>

<style lang="scss">
@import './styles/reset.css';

body {
  margin: 0;
}

#app {
  font-family: "Madimi One", Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-primary;
  background-color: $bg-main-color;
}

.parent {
  position: relative;

  .controls {
    box-sizing: border-box;
    position: absolute;
    background-color: $bg-white;
    width: 100%;
    padding: 10px;
    border-radius: $radius-controls;
    box-shadow: $shadow-controls;
    z-index: 1;
  }
}
</style>
