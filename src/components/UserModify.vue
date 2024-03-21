<template>
  <div class="controls controls--infos__user">
    <form id="userModify">
      <label for="firstName">Prénom : </label>
      <input :placeholder="user.firstName" type="text" id="userModifyFirstName" name="firstName" v-model="userModify.firstName"/>
      <label for="lastName">Nom de famille : </label>
      <input :placeholder="user.lastName" type="text" id="userModifyLastName" name="lastName" v-model="userModify.lastName"/>
      <input class="button button--update" type="submit" value="Mettre à jour" @click.stop.prevent="modifyUser()"/>
    </form>
    <p>Supprimer votre compte? <i class="fa-solid fa-circle-xmark" @click.stop="deleteOwnAccount()"></i></p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "UserModify",
  data() {
    return {
      userModify: {
        firstName: "",
        lastName: ""
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {

  },
  methods: {
    modifyUser() {
      if ((this.userModify.firstName && this.userModify.firstName !== this.user.firstName) || (this.userModify.lastName && this.userModify.lastName !== this.user.lastName)) {
        for (let prop in this.userModify) {
          if (!this.userModify[prop]) {
            this.userModify[prop] = this.user[prop]
          }
        }
        this.$store.dispatch('modifyUser', { modifiedUser: this.userModify, id: this.user.id })
          .then(() => {
            this.errorMsg = ""
            document.getElementById('userModifyFirstName').value = ""
            document.getElementById('userModifyLastName').value = ""
            window.alert('Vos informations ont bien été mise à jour')
          })
          .catch((error) => {
            this.errorMsg = "Nous n'avons pas pu mettre à jour vos informations: " + error.response?.data?.message
          })
      }
    },
    deleteOwnAccount() {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte sur le site de la Chorale Sacré Bel Canto? Cette action ne peut pas être annulée. Vous perdrez tous vos droits de consultation et devrez recréer un nouveau compte? Celui-ci devra de nouveau être avalisé par un administrateur avant que vous puissiez de nouveau avoir accès aux ressources mises à disposition.')) {
        this.$store.dispatch('deleteOwnAccount', this.user.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => this.errorMsg = "La suppression de votre compte a échouée: " + error.response?.data?.message)
      }
    }
  }
}
</script>

<style lang="scss">
.parent {
  .controls--infos__user {
    width: auto;
    top: 180px;
    padding: 10px 20px;
    @include column;
    gap: 10px;

    form {
      @include column;
      gap: 5px;

      .button {

        &--update {
          width: 60%;
          border-radius: $radius-small;
          border: transparent solid 1px;
          box-sizing: border-box;
          background-color: $bg-button;
          border: 1px solid $color-quarternary;
          box-shadow: $shadow-controls;
        }
      }
    }
  }
}

</style>