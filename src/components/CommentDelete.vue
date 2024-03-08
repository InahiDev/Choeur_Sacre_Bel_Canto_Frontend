<template>
  <i class="fa-solid fa-xmark" @click.stop="deleteComment()"></i>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
export default {
  name: "CommentDelete",
  data() {
    return {
      errorMsg: ""
    }
  },
  emits: ['deleted'],
  props: {
    id: Number
  },
  methods: {
    deleteComment() {
      this.$store.dispatch('deleteComment', this.id)
        .then(() => {
          window.alert('Commentaire supprimé')
          this.$parent.$emit('deleted')
          this.$parent.$parent.$emit('deleted')
        })
        .catch((error) => this.errorMsg = "Erreur lors de la suppression du commentaire: " + error.response?.data?.message)
    }
  }
}
</script>

<style lang="scss">
</style>