<template>
  <div class="newComment">
    <form id="newComment">
      <div class="newComment__firstName">
        <label for="newCommentFirstName">Prénom :</label>
        <input type="text" id="newCommentFirstName" name="newCommentFirstName" v-model="comment.firstName" required/> 
      </div>
      <div class="newComment__lastName">
        <label for="newCommentLastName">Nom de famille :</label>
        <input type="text" id="newCommentLastName" name="newCommentLastName" v-model="comment.lastName" required/>
      </div>
      <div class="newComment__text">
        <label for="newCommentText">Laissez nous un commentaire: </label>
        <textarea id="newCommentText" name="newCommentText" required placeholder="Entrez votre commentaire ici..." v-model="comment.comment"></textarea>
      </div>
      <input type="submit" value="Soumettre" @click.stop.prevent="sendNewComment()" class="submitButton"/>
    </form>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "CommentAdd",
  data() {
    return {
      comment: {
        firstName: "",
        lastName: "",
        comment: ""
      },
      succesMsg: "",
      errorMsg: ""
    }
  },
  emits: ['newComment'],
  methods: {
    sendNewComment() {
      if (this.comment.firstName
      && this.comment.lastName
      && this.comment.comment) {
        this.$store.dispatch('addComment', this.comment)
          .then(() => {
            window.alert("Merci pour votre commentaire! Il sera revu avant d'être approuvé!!!")
            this.errorMsg = ""
            document.querySelector('#newCommentFirstName').value = ""
            document.querySelector('#newCommentLastName').value = ""
            document.querySelector('#newCommentText').value = ""
            this.$emit('newComment')
          })
          .catch((error) => {
            this.errorMsg = "Nous ne pouvons pas enregistrer votre avis, nous en sommes désolés." + error.response?.data?.message
          }) 
      }
    }
  }
}
</script>

<style lang="scss">
.newComment {
  box-sizing: border-box;
  width: 90%;
  padding: 10px;
  border-radius: $radius-components;
  box-shadow: $shadow-components;

  form {
    @include column;
    gap: 10px;
  }

  &__firstName, &__lastName, &__text {
    @include column;
    box-sizing: border-box;
    gap: 5px;
  }

  &__text textarea {
    font-family: "Madimi One", Avenir, Helvetica, Arial, sans-serif;
    width: 98%;
    height: 50px;
  }
}

.submitButton {
  width: 50%;
  height: auto;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 15px / 50%;
  color: $color-white;
  background-color: $color-secondary;
  border: none;
  box-shadow: $shadow-controls;
}
</style>