<template>
  <!--<nav>
    <router-link to="/">Page d'Accueil</router-link> |
    <router-link to="/search">Recherche</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/connexion">Connexion</router-link>
  </nav>
  <router-view/>-->
  <BannerComp/>
  <router-view/>
</template>

<script>
import BannerComp from "./components/Banner.vue";

export default {
  name: "App",
  components: {
    BannerComp
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
</style>
