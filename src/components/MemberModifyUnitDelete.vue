<template>
  <i class="fa-solid fa-circle-xmark" @click.stop="deleteAccount()"></i>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "MemberModifyUnitDelete",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['user'])
  },
  props: {
    member: Object,
  },
  emits: ['accountDelete', 'errorDelete'],
  methods: {
    deleteAccount() {
      if (this.user.id === this.member.id) {
        if (window.confirm("Vous êtes sur le point de supprimer votre compte possédant les droits d'administration du SubmitEvent. Cette opération n'est pas réversible. Souhaitez-vous tout de même procéder à la suppression?")) {
          this.$store.dispatch('deleteOwnAccount', this.id)
            .then(() => {
              this.$router.push('/')
            })
            .catch((error) => {
              this.$emit('errorDelete', error)
            })
        }
      } else {
        if (window.confirm(`Confirmez-vous la suppression du compte de ${this.member.fullName}? Cette action n'est pas réversible.`)) {
          this.$store.dispatch('deleteAccount', this.member.id)
            .then(() => {
              this.$parent.$emit('accountDeleted')
            })
            .catch((error) => {
              this.$emit('errorDelete', error)
            })
        }
      }
    }
  }
}
</script>