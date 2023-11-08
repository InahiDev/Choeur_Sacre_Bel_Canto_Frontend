<template>
  <header>
    <div>
      <!--Logo CSBC à insérer-->
      <h1>Choeur Sacré Bel Canto</h1>
    </div>
    <div class="menu" @click="activateMenu()">
      <h2>Menu</h2>
      <i class="fa-solid fa-bars"></i>
      <NavComp/>
      <router-view v-if="this.menuActive"/>
    </div>
  </header>
</template>

<script>
import NavComp from './NavComp.vue';

export default {
  name: "BannerComp",
  data() {
    return {
      menuActive: false
    }
  },
  components: {
    NavComp
  },
  methods: {
    activateMenu() {
      if (!this.activeMenu) {
        this.activeMenu = true
      } else {
        this.activeMenu = false
      }
    }
  }
}
</script>

<style lang="scss">
header, .menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>