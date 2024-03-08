<template>
  <h3>Modifier un morceau : <i v-if="!this.showModify" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i></h3>
  <div v-if="this.showModify">
    <PieceModifyUnit v-for="piece of pieces" :key="piece.id" v-bind:piece="piece" @updated="getPieces()" @deleted="getPieces()"/>
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
    <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="morceaux" action="getPieces" :offset="this.offset"/>
    <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious($event)" @error="errorCharge($event)" type="morceaux" action="getPieces" :offset="this.offset"/>
  </div>
</template>

<script>
import PieceModifyUnit from '@/components/PieceModifyUnit.vue'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'
import { mapState } from 'vuex'

export default {
  name: "PieceModify",
  data() {
    return {
      showModify: false,
      offset: 10,
      storedPieces: undefined
    }
  },
  mounted() {
    this.getPieces()
  },
  computed: {
    ...mapState(['pieces'])
  },
  components: {
    PieceModifyUnit,
    ChargeNext,
    ChargePrevious
  },
  methods: {
    showMenu() {
      this.showModify = !this.showModify
    },
    getPieces() {
      this.storedPieces = undefined
      this.$store.dispatch('getPieces', { offset: this.offset })
        .then(() => {
          this.storedPieces = this.pieces
          this.errorMsg = ""
        })
        .catch((error) => {
          this.errorMsg = "Une erreur est survenue durant l'actualisation des morceaux enregistrés: " + error.response.data.message
        })
    },
    chargeNext(response) {
      if (this.storedPieces[0].id === response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas de morceaux supplémentaires à afficher."
      } else {
        this.errorMsg = ""
        this.storedPieces = this.pieces
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.storedPieces = this.pieces
    },
    errorCharge(error) {
      this.errorMsg = error.response?.data?.message
    }
  }
}
</script>

<style lang="scss">
</style>