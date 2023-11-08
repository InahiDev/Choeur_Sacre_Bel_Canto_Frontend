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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
