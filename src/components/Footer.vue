<template>
  <footer class="footer">
    <div class="footerNav">
      <nav class="footerNav__public">
        <router-link to="/">Accueil</router-link>
        <router-link to="/connexion">Connexion</router-link>
      </nav>
      <nav class="footerNav__private">
        <component :is="this.status === 'private' ? 'router-link' : 'span'" to="/search">Recherche</component>
        <component :is="this.status === 'private' ? 'router-link' : 'span'" to="/account">Infos</component>
      </nav>
      <nav class="footerNav__extra">
        <component :is="this.status === 'private' && this.user.role === 'Admin' ? 'router-link' : 'span'" :class="this.status === 'private' && this.user.role === 'Admin' ? 'connected admin' : 'unlogged public'" to="/admin">Administration</component>
        <p :class="this.status === 'private' ? '' : 'unlogged'" @click.stop="unlog()">Se déconnecter</p>
      </nav>
    </div>
    <h3 class="presentation">Site développé et designé par Gabriel Delaigue</h3>
    <div class="developper">
      <div class="list list--left">
        <p>Contact:</p>        
        <ol class="list__contact">
          <li><i class="fa-regular fa-envelope"></i> : gabriel.delaigue@gmail.com</li>
          <li><i class="fa-solid fa-phone"></i> : 06.42.26.59.02</li>
          <li><i class="fa-solid fa-location-dot"></i> : Colomiers, Occitanie.</li>
          <li><i class="fa-brands fa-github"></i> : https://github.com/InahiDev</li>
          <li class="longLink"><i class="fa-brands fa-linkedin"></i> : https://www.linkedin.com/in/gabriel-delaigue-180784a5/</li>
        </ol>
      </div>
      <div class="list list--right">
        <p>Site développé sous:</p>
        <ol class="list__stacks">
          <li><i class="fa-brands fa-vuejs"></i> VueJs 3</li>
          <li><i class="fa-brands fa-node-js"></i> NodeJs</li>
          <li><i class="fa-brands fa-sass"></i> Sass</li>
        </ol>        
      </div>

    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "FooterComp",
  data() {
    return {

    }
  },
  created() {
    if (this.status === 'private') {
      this.isConnected = true
    } else {
      this.isConnected = false
    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  methods: {
    unlog() {
      if (this.status === 'private') {
        this.$store.dispatch('unlog')
          .then(() => {
            this.isConnected = false
            this.$router.push('/')
          })
      }
    }
  }
}
</script>

<style lang="scss">
.footer {
  @include column;
  gap: 5px;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: $bg-white;
  padding: 10px;

  .footerNav {
    width: 100%;
    @include row(space-around);
    font-size: 0.8em;

    &__public, &__private, &__extra {
      @include column;

      span, .unlogged  {
        color: rgba(35, 35, 35, 0.5)
      }

      a {
        color: $color-primary;
        text-decoration: none;

        &:hover {
          cursor: pointer;
          color: $color-secondary;
        }
      }
    }
  }
  
  h3 {
    font-size: 1.2em;
    margin: 0;
  }

  .developper {
    @include column;
    gap: 10px;

    .list {
      @include column;
      gap: 5px;
      width: 100%;

      ol {
        width: 100%;

        li {
          width: 100%;
        }
      }

      &--left {
        text-align: left;

        p {
          width: 100%;
          text-align: left;
        }

        .longLink {
          width: 92vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      &--right {
        text-align: right;

        p {
          width: 100%;
          text-align: right;
        }
      }
    }
  }
}
</style>