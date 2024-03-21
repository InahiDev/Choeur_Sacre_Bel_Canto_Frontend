<template>
  <div class="modify__menu modify__menu--piece">
    <form class="modify__menu__text modify__menu__text--piece" :id="'piece' + piece.id">
      <div class="formUnit formUnit--modify formUnit--piece--title">
        <label for="title">Titre: </label>
        <input :placeholder="piece.title" type="text" :id="'pieceTitle' + piece.id" @change="updateTitle(piece.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--piece--composer">
        <label for="composer">Compositeur: </label>
        <input name="composer" :placeholder="piece.composer" type="text" :id="'pieceComposer' + piece.id" @change="updateComposer(piece.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--piece--version">
        <label for="version">Version: </label>
        <input type="text" name="version" :placeholder="piece.version" :id="'pieceVersion' + piece.id" @change="updateVersion(piece.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--piece--arrangement">
        <label for="arrangement">Arrangement: </label>
        <input type="text" name="arrangement" :placeholder="piece.arrangement" :id="'pieceArrangement' + piece.id" @change="updateArrangement(piece.id)"/>
      </div>
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
.modify__menu {
  &.modify__menu--piece {
    top: 28px;
  }
  &__text{
    &--piece {
      .formUnit {
        &--piece {
          &--title {
            input {
              max-width: 170px;
            }
          }
          &--composer {
            input {
              max-width: 115px;
            }
          }
          &--version {
            input {
              max-width: 150px;
            }
          }
          &--arrangement {
            input {
              max-width: 110px;
            }
          }
        }
      }
    }
  }
}
 
</style>