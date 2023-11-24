<template>
  <NavPublic v-if="status !== 'private'"/>
  <NavPrivate v-if="status == 'private' && user.role !== 'None'"/> 
  <NavAdmin v-if="connectionStatus == 'logedIn' && user.role == 'Admin'"/>
</template>

<script>
import { mapState } from 'vuex'
import NavPublic from './NavPublic.vue'
import NavPrivate from './NavPrivate.vue'
import NavAdmin from './NavAdmin.vue'

export default {
  name: 'NavComp',
  components: {
    NavPublic,
    NavPrivate,
    NavAdmin
  },
  computed: {
    ...mapState(['status', 'connectionStatus', 'user'])
  }
}
</script>

<style lang="scss">
</style>