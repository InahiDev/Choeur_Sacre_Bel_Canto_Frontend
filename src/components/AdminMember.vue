<template>
  <section class="admin__section">
    <MemberModify/>
  </section>

</template>

<script>
import MemberModify from '@/components/MemberModify.vue'

export default {
  name: "AdminMember",
  data() {
    return {
      showMenu: false
    }
  },
  components: {
    MemberModify
  },
  methods: {
    deployMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss">
</style>