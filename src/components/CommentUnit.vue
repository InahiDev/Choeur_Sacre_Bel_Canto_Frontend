<template>
  <div :id="'comment' + comment.id" :class="cardsClass">
    <div class="comment parent" @click.stop="showMenu()">
      <p class="identity"> {{ comment.firstName }} {{ comment.lastName }}</p>
      <p class="text">{{ comment.comment }}</p>
      <div v-if="this.user.role === 'Admin' && this.showControls" class="controls controls__comments">
        <i v-if="comment.hasBeenApproved === false" @click.stop="approveComment()" class="fa-solid fa-thumbs-up"></i>
        <CommentDelete :id="comment.id"/>
        <p v-if="this.errorMsg">{{ errorMsg }}</p>
      </div>
    </div>
    <!--<i v-if="!this.showControls && this.user.role === 'Admin'" @click.stop="showMenu()" class="fa-solid fa-circle-plus"></i><i v-if="this.showControls && this.user.role === 'Admin'" @click.stop="showMenu()" class="fa-solid fa-circle-minus"></i>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentDelete from '@/components/CommentDelete.vue'

export default {
  name: "CommentUnit",
  data() {
    return {
      showControls: false,
      errorMsg: "",
      cardsClass: 'commentCard',
      approved: 'unapproved'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    CommentDelete
  },
  emits: ['approved', 'deleted'],
  props: {
    comment: Object
  },
  mounted() {
    if (!this.comment.hasBeenApproved) {
      this.cardsClass = 'commentCard commentCard--unapproved'
    }
  },
  methods: {
    showMenu() {
      if (this.user.role === "Admin") {
        this.showControls = !this.showControls
      }

    },
    approveComment() {
      this.$store.dispatch('validateComment', this.comment.id)
        .then(() => {
          document.getElementById(`comment${this.comment.id}`).classList.remove('commentCard--unapproved')
          this.$emit('approved')
          this.$parent.$emit('approved')
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant l'approbation du commentaire: " + error.response?.data?.message)
    }
  }
}
</script>

<style lang="scss">
.commentCard {
  box-sizing: border-box;
  padding: 20px;
  width: 90%;
  border-radius: $radius-components;
  box-shadow: $shadow-components;
  @include column;
  gap: 10px;

  &--unapproved {
    box-shadow: 2px 2px 4px 2px rgb(255, 0, 0);
  }

  .comment {
    @include column;
    gap: 10px;
    width: 100%;

    .identity {
      width: 100%;
      font-size: 1em;
      text-align: left;
    }

    .text {
      width: 100%;
      font-size: 0.9em;
      text-align: right;
    }
  }

  .controls__comments {
    width: auto;
    @include row;
    gap: 10px;
    right: -20px;
    top: -20px;
    background-color: $color-secondary;
    color: $color-white;

    .fa-thumbs-up {
      color: rgb(0, 200, 245)
    }
    
  }
}


</style>