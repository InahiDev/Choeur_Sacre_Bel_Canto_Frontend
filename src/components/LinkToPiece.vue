<template>
  <div class="linkedResearch">
    <p>Rattacher le document à un morceau ?</p>
    <p>Lancer une recherche de morceaux:</p>
    <input type="submit" value="Rechercher" @click.stop.prevent="searchPieces()"/>
    <p v-if="!this.reduce && this.piecesArray" class="reduce">Réduire la recherche? <i @click.stop.prevent="reduceSearch()" class="fa-solid fa-circle-minus"></i></p>
    <p v-if="this.reduce">Ré-afficher :<i class="fa-solid fa-circle-plus" @click.stop.prevent="reduceSearch()"></i></p>
  </div>
  <div v-if="this.piecesArray && !this.reduce">
    <div v-for="piece of this.piecesArray" :key="piece.id">
      <p>{{ piece.title }} | {{ piece.composer  }} | {{ piece.version  }} |<span v-if="piece.arrangement"> {{ piece.arrangement }} |</span> <input @click.stop="emitPieceId(piece.id)" type="checkbox" name="piece"/></p>
    </div>
    <p v-if="this.piecesArray && this.piecesArray.length == 10">Charger les morceaux suivants? <i class="fa-solid fa-circle-plus" @click.stop.prevent="chargeNext()"></i></p>
    <p v-if="this.offset > 10">Charger les morceaux précédents? <i @click.stop.prevent="chargePrevious()" class="fa-solid fa-circle-minus"></i></p>
  </div>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
export default {
  name: "PieceLink",
  data() {
    return {
      piecesArray: undefined,
      errorMsg: '',
      offset: 10,
      reduce: false
    }
  },
  methods: {
    searchPieces() {
      this.offset = 10
      this.$store.dispatch('searchForLinks', { type: 'piece' })
        .then((response) => {
          this.errorMsg = ""
          this.piecesArray = response.data.data
        })
        .catch((error) => {
          this.piecesArray = undefined
          this.errorMsg = "Une erreur est survenue, recherche de morceaux impossible: " + error.response.data.message
        })
    },
    emitPieceId(id) {
      if (event.target.hasAttribute('checked')) {
        this.$emit('modifyPieceId', 0)
        event.target.removeAttribute('checked')
      } else {
        let previouslySelected = event.target.parentNode.parentNode.parentNode.querySelector('[checked]')
        if (previouslySelected) {
          previouslySelected.checked = false
          previouslySelected.removeAttribute('checked')
        }
        event.target.setAttribute('checked', '')
        this.$emit('modifyPieceId', id)
      }
    },
    chargeNext() {
      this.$store.dispatch('searchForLinks', {
        type: 'piece',
        offset: this.offset + 10
      })
        .then((response) => {
          if (this.piecesArray == response.data.data) {
            this.errorMsg = "Vous êtes arrivés au bout des morceaux enregistrés."
          } else {
            this.errorMsg = ""
            this.offset += 10
            this.piecesArray = response.data.data
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant la recherche de morceaux supplémentaires: " + error.response.data.message)
    },
    chargePrevious() {
      this.$store.dispatch('searchForLinks', {
        type: 'piece',
        offset: this.offset -10
      })
        .then((response) => {
          if (this.piecesArray == response.data.data) {
            this.errorMsg = `Il n'y a pas de morceaux "précédents".`
          } else {
            this.errorMsg = ""
            this.offset -= 10
            this.piecesArray = response.data.data
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant le chargement des morceaux précédents: " + error.response.data.message )
    },
    reduceSearch() {
      this.reduce = !this.reduce
    }
  }
}
</script>

<style lang="scss">
</style>