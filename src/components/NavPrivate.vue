<template>
  <component :is="this.status === 'private' && this.user.role !== 'None' ? 'router-link' : 'span'" :class="classes" to="/search">Rechercher</component>
  <component :is="this.status === 'private' && this.user.role !== 'None' ? 'router-link' : 'span'" :class="classes" to="/account">Infos</component>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavPrivate',
  components: {
  },
  props: {
    classes: String
  },
  computed: {
    ...mapState(['status', 'user'])
  }
}
</script>

<style lang="scss">

</style>