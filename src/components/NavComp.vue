<template>
  <nav class="nav">
    <div class="navLeft">
      <router-link to="/">Accueil</router-link>
      <router-link to="/connexion">Connexion</router-link>
    </div>
    <div class="logo">
      <img src="../assets/Logo_CSBC.png" alt="Logo Choeur Sacré Bel Canto" @click.stop="showDisconnect()" />
    </div>
    <div class="navRight">
      <component :is="this.status === 'private' && this.user.role !== 'None' ? 'router-link' : 'span'" :class="privateClass" to="/account">Infos</component>
      <component :is="this.status === 'private' && this.user.role !== 'None' ? 'router-link' : 'span'" :class="privateClass" to="/search">Rechercher</component>
    </div>
  </nav>
  <nav class="navBottom">
    <p :class="this.status === 'private' ? '' : 'disabled'" @click.stop="unlog()">Se déconnecter <i class="fa-solid fa-circle-xmark"></i></p>
    <component :is="this.status === 'private' && this.user.role === 'Admin' ? 'router-link' : 'span'" :class="adminClass" to="/admin">Administration</component>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavComp',
  props: {
    privateClass: String,
    adminClass: String
  },
  components: {

  },
  computed: {
    ...mapState(['status', 'user'])
  },
  methods: {
    unlog() {
      if (this.status === 'private') {
        this.$store.dispatch('unlog')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
  }
}
</script>

<style lang="scss">
.nav {
  width: 100%;
  @include row(space-between);
  flex-wrap: wrap;

  .navLeft, .navRight {
    width: 37%;
    @include column(space-around);

    a, span {
      width: 80%;
      padding: 30px 0;
    }

    a {
      box-sizing: border-box;
      border-bottom: 1px solid transparent;
      color: $color-primary;
      text-decoration: none;

      &.router-link-exact-active {
        color: $color-quarternary;
      }

      &:hover {
        color: $color-secondary;
        border-color: $color-secondary;
        transition: border-color 0.5s;
      }
    }
  }

  .logo {
    width: 20%;
    height: auto;
    min-width: 65px;
    min-height: 140px;
    padding: 6px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.navBottom {
  @include row(space-evenly);
  width: 100%;
  height: 40px;
  
  a {
    border-bottom: 1px solid transparent;
    color: $color-primary;
    text-decoration: none;

    &.router-link-exact-active {
      color: $color-quarternary;
    }

    &:hover {
      color: $color-secondary;
      border-color: $color-secondary;
      transition: border-color 0.5s;
    }
  }
}
</style>