<template>
  <NavPublic/>
  <NavLogged v-if="this.$store.status =='loggedIn'"/> 
  <NavAdmin v-if="this.$store.status == 'loggedIn' && this.$store.role == 'Admin'"/>
  
</template>

<script>
import NavPublic from './NavPublic.vue'
import NavLogged from './NavLogged.vue'
import NavAdmin from './NavAdmin.vue'

export default {
  name: 'NavComp',
  components: {
    NavPublic,
    NavLogged,
    NavAdmin
  }
}
</script>

<style lang="scss">
</style>