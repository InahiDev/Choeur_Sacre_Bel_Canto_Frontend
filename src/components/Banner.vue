<template>
  <header>
    <div class="menu">
      <NavComp :privateClass="this.status === 'private' && this.user.role !== 'None' ? '' : 'disabled'" :adminClass="this.status === 'private' && this.user.role === 'Admin' ? '' : 'disabled'"/>
    </div>
    <h1>Choeur Sacré Bel Canto</h1>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import NavComp from '@/components/NavComp.vue'

export default {
  name: "BannerComp",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  components: {
    NavComp
  },
  methods: {
    unlog() {
      this.$store.dispatch('unlog')
        .then(() => {
          this.showUnlog = false
          this.$router.push('/')
        })
    },
    showDisconnect() {
      this.showUnlog = !this.showUnlog
    }
  }
}
</script>

<style lang="scss">
header {
  width: 100%;
  height: auto;
  background-color: #FFF;
  border-bottom-left-radius: $radius-main;
  border-bottom-right-radius: $radius-main;

  .menu {
    width: 100%;

    .disabled {
      color: rgba(35, 35, 35, 0.5)
    }
  }

  h1 {
    margin: 10px 0 25px 0;
    padding-bottom: 10px;
    box-sizing: content-box;
    font-size: 1.8em;
  }

  .unlog {
    width: 40%;
    &:hover {
      opacity: 1;
      transition: opacity 0.5s;
      cursor: pointer;
    }
  }
}
</style>