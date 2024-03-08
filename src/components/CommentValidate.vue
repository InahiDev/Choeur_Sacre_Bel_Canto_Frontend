<template>
  <CommentUnit @approved="getUnvalidatedComments()" v-for="comment of this.unvalidatedComments" :comment="comment" :key="comment.id"/>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
import CommentUnit from '@/components/CommentUnit.vue'
import { mapState } from 'vuex'

export default {
  name: "CommentValidate",
  data() {
    return {
      errorMsg: ""
    }
  },
  components: {
    CommentUnit
  },
  emits: ['approved', 'deleted'],
  computed: {
    ...mapState(['unvalidatedComments'])
  },
  mounted() {
    this.getUnvalidatedComments()
  },
  methods: {
    getUnvalidatedComments() {
      this.$store.dispatch('getUnvalidatedComments')
        .then(() => this.errorMsg = "")
        .catch((error) => {
          if (error.response?.status === 404) {
            this.errorMsg = "Aucun commentaire en attente de modération."
          } else {
            this.errorMsg = "Il n'est pas possible d'obtenir les commentaires nécessitant une validation: " + error.response?.data?.message
          }
        })
    }
  }
}
</script>

<style langg="scss">
</style>