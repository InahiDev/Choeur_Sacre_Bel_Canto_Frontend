<template>
  <header>
    <div class="menu">
      <NavComp :privateClass="this.status === 'private' && this.user.role !== 'None' ? '' : 'disabled'" :adminClass="this.status === 'private' && this.user.role === 'Admin' ? '' : 'disabled'"/>
      <!-- <div class="logo">
        <img src="../assets/Logo_CSBC.png" alt="Logo Choeur Sacré Bel Canto" @click.stop="showDisconnect()" />
      </div> -->


      <!--<nav class="navPublic">
        <NavPublic/>
      </nav>
      <div class="logo">
        <img src="../assets/Logo_CSBC.png" alt="Logo Choeur Sacré Bel Canto" @click.stop="showDisconnect()" />
      </div>
      <nav class="navPrivate">
        <NavPrivate :classes="this.status === 'private' ? '' : 'disabled'"/>
      </nav>
      <nav class="navAdmin">
        <NavAdmin :classes="this.status === 'private' && this.user.role === 'Admin' ? '' : 'disabled'"/>
      </nav>
      <p v-if="status === 'private'" class="unlog">Se déconnecter <i class="fa-solid fa-circle-xmark" @click.stop="unlog()"></i></p>-->
    </div>
    <h1>Choeur Sacré Bel Canto</h1>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import NavComp from '@/components/NavComp.vue'
//import NavPublic from '@/components/NavPublic.vue'
//import NavPrivate from '@/components/NavPrivate.vue'
//import NavAdmin from '@/components/NavAdmin.vue'

export default {
  name: "BannerComp",
  data() {
    return {
      //showUnlog: false
    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  components: {
    NavComp
    //NavPublic,
    //NavPrivate,
    //NavAdmin
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


  /*.menu {
    position: relative;
    width: 100%;
    height: 180px;
    @include row(space-between);
    flex-wrap: wrap;

    nav {
      width: 37%;
      height: 160px;
      @include column(space-around);



      a {
        padding: 30px 0;
        width: 80%;
        box-sizing: content-box;
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

    .navAdmin {
      width: 40%;
      height: 15px;

      a {
        padding: 0;
        width: 100%;
        border-bottom: none;

        &:hover {
          border-color: transparent;
          transition: none;
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

  }*/

  h1 {
    margin: 10px 0 25px 0;
    padding-bottom: 10px;
    box-sizing: content-box;
    font-size: 1.8em;
  }

  .unlog {
    /*position: absolute;
    padding: 2px 3px;
    top: 60px;
    right: 4px;*/
    width: 40%;
    /*border-radius: $radius-components;
    box-shadow: $shadow-controls;*/

    &:hover {
      opacity: 1;
      transition: opacity 0.5s;
      cursor: pointer;
    }
  }
}
</style>