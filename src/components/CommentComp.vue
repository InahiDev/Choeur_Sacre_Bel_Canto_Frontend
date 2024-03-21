<template>
  <section class="parent">
    <h3>Ce que vous en avez pensé</h3>
    <CommentUnit @deleted="reloadComments()" v-for="comment of this.comments" :key="comment.id" :comment="comment"/>
    <CommentAdd @newComment="reloadComments()"/>
    <i v-if="this.unvalidatedComments" class="fa-solid fa-triangle-exclamation"></i>
    <CommentValidate @deleted="reloadComments()" ref="CommentValidate" @approved="getComments()" v-if="this.user.role === 'Admin'"/>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </section>
</template>

<script>
import CommentUnit from '@/components/CommentUnit.vue'
import CommentAdd from '@/components/CommentAdd.vue'
import CommentValidate from '@/components/CommentValidate.vue'
import { mapState } from 'vuex'

export default {
  name: "CommentComp",
  data() {
    return {
      errorMsg: ""
    }
  },
  mounted() {
    this.getComments()
  },
  emits: ['deleted'],
  computed: {
    ...mapState(['user', 'comments', 'unvalidatedComments'])
  },
  components: {
    CommentUnit,
    CommentAdd,
    CommentValidate
  },
  methods: {
    getComments() {
      this.$store.dispatch('getComments', 0)
        .then(() => {
          this.errorMsg = ""
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            this.errorMsg = ""
          } else {
            this.errorMsg = "Nous ne pouvons malheureusement pas afficher les commentaires laissés par les visiteurs précédents. Veuillez nous en excuser. Erreur: " + error.response?.data?.message
          }
        })
    },
    reloadComments() {
      Promise.allSettled([
        this.getComments(),
        this.$refs.CommentValidate.getUnvalidatedComments()
      ])
    }
  }
}
</script>

<style lang="scss">
.fa-triangle-exclamation {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 2em;
  color: rgb(255, 0, 0);
}
</style>