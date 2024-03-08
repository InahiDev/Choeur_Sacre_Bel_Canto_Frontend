<template>
  <component :is="this.status === 'private' && this.user.role === 'Admin' ? 'router-link' : 'span'" :class="classes" to="/admin">Administration</component>
  <!--<router-link to="/admin">Administrateur</router-link>-->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavAdmin',
  props: {
    classes: String
  },
  computed: {
    ...mapState(['status', 'user'])
  }
}
</script>