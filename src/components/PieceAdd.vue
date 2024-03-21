<template>
  <h3 class="admin__title">Ajouter un morceau : <i v-if="!this.showAdd" class="fa-solid fa-circle-plus" @click.stop="showAddMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu()"></i></h3> 
  <div class="admin__add" v-if="this.showAdd">
    <div class="admin__add__section">
      <form class="admin__add__section--text">
        <div class="formUnit formUnit--title">
          <label for="title">Titre: </label>
          <input type="text" id="newPieceTitle" name="title" v-model.lazy="piece.title"/>
        </div>
        <div class="formUnit formUnit--composer">
          <label for="composer">Compositeur: </label>
          <input type="text" id="newPieceComposer" name="composer" v-model.lazy="piece.composer"/>
        </div>
        <div class="formUnit formUnit--version">
          <label for="version">Version: </label>
          <input type="text" id="newPieceVersion" name="version" v-model.lazy="piece.version"/>
        </div>
        <div class="formUnit formUnit--arrangement">
          <label for="arrangement">Arrangement: </label>
          <input type="text" id="newPieceArrangement" name="arrangement" v-model.lazy="piece.arrangement"/>
        </div>
        <input type="submit" value="Soumettre" @click.stop.prevent="addPiece()"/>
      </form>
    </div>
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
  </div>
</template>

<script>
export default {
  name: "PieceAdd",
  data() {
    return {
      showAdd: false,
      piece: {
        title: "",
        composer: "",
        version: "",
        arrangement: ""
      },
      errorMsg: ""
    }
  },
  emits: ['newPiece'],
  methods: {
    showAddMenu() {
      this.showAdd = !this.showAdd
    },
    addPiece() {
      if (this.piece.title && this.piece.composer && this.piece.version) {
        let newPiece = {
          title: this.piece.title,
          composer: this.piece.composer,
          version: this.piece.version
        }
        if (this.piece.arrangement) {
          newPiece.arrangement = this.piece.arrangement
        }
        this.$store.dispatch('addPiece', newPiece)
          .then(() => {
            document.querySelector('#newPieceTitle').value = ""
            document.querySelector('#newPieceComposer').value = ""
            document.querySelector('#newPieceVersion').value = ""
            document.querySelector('#newPieceArrangement').value = ""
            this.$emit('newPiece')
            this.errorMsg = ""
          })
          .catch((error)=> this.errorMsg = "Une erreur est survenue durant l'ajout du morceau à la base de données: " + error.response?.data?.message)
      } else {
        this.errorMsg = "Toutes les informations obligatoires n'ont pas été renseignées."
      }
    }
  }
}
</script>

<style lang="scss">
.formUnit {
  &--composer {
    input {
      max-width: 120px;
    }
  }

  &--version {
    input {
      max-width: 155px;
    }
  }

  &--arrangement {
    input {
      max-width: 115px;
    }
  }
}
</style>