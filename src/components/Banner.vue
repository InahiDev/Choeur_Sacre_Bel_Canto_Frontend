<template>
  <header>
    <div class="menu" >
      <h2>Menu</h2>
      <i class="fa-solid fa-bars" @click="activateMenu()"></i>
      <NavComp v-if="this.menuActive == true"/>
    </div>
    <div>
      <!--Logo CSBC à insérer-->
      <h1>Choeur Sacré Bel Canto</h1>
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
      if (!this.menuActive) {
        event.stopPropagation()
        this.menuActive = true
      } else {
        event.stopPropagation()
        this.menuActive = false
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