<template>
  <NavPublic />
  | <router-link to="/search">Rechercher</router-link>
</template>

<script>
import NavPublic from './NavPublic.vue'

export default {
  name: 'NavPrivate',
  components: {
    NavPublic
  }
}
</script>

<style lang="scss">
</style>