<template>
  <div>
    <form :id="'piece' + piece.id">
      <label for="title">Titre: </label>
      <input :placeholder="piece.title" type="text" :id="'pieceTitle' + piece.id" @change="updateTitle(piece.id)"/><br/>
      <label for="composer">Compositeur: </label>
      <input name="composer" :placeholder="piece.composer" type="text" :id="'pieceComposer' + piece.id" @change="updateComposer(piece.id)"/><br/>
      <label for="version">Version: </label>
      <input type="text" name="version" :placeholder="piece.version" :id="'pieceVersion' + piece.id" @change="updateVersion(piece.id)"/><br/>
      <label for="arrangement">Arrangement: </label>
      <input type="text" name="arrangement" :placeholder="piece.arrangement" :id="'pieceArrangement' + piece.id" @change="updateArrangement(piece.id)"/><br/>
      <input type="submit" @click.stop.prevent="modifyPiece()" value="Mettre à jour" :disabled="!this.updateReady"/>
    </form>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "PieceModifyMenu",
  data() {
    return {
      updateReady: false,
      errorMsg: "",
      updatePiece: {
        title: "",
        composer: "",
        version: "",
        arrangement: ""
      }
    }
  },
  props: {
    piece: Object
  },
  methods: {
    disableUpdate() {
      if (this.updatePiece.title
      || this.updatePiece.composer
      || this.updatePiece.version
      || this.updatePiece.arrangement) {
        this.updateReady = true
      } else {
        this.updateReady = false
      }
    },
    updateTitle(id) {
      this.updatePiece.title = document.querySelector(`#pieceTitle${id}`).value
      this.disableUpdate()
    },
    updateComposer(id) {
      this.updatePiece.composer = document.querySelector(`#pieceComposer${id}`).value
      this.disableUpdate()
    },
    updateVersion(id) {
      this.updatePiece.version = document.querySelector(`#pieceVersion${id}`).value
      this.disableUpdate()
    },
    updateArrangement(id) {
      this.updatePiece.arrangement = document.querySelector(`#pieceArrangement${id}`).value
      this.disableUpdate()
    },
    modifyPiece() {
      if (this.updateReady) {
        for (let prop in this.updatePiece) {
          if (!this.updatePiece[prop]) {
            this.updatePiece[prop] = this.piece[prop]
          }
        }
        this.$store.dispatch('updatePiece', { piece: this.updatePiece, id: this.piece.id })
          .then(() => {
            this.errorMsg = ""
            this.$emit('updated')
            this.$parent.$emit('updated')
          })
          .catch((error) => this.errorMsg = "Une erreur est survenue durant la mise à jour du morceau: " + error.response?.data?.message )
      } else {
        this.errorMsg = "Il manque des informations pour effectuer la mise à jour du morceau désiré."
      }
    }
  }
}
</script>

<style lang="scss">
</style>