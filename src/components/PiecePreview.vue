<template>
  <section>
    <div v-for="(piece, idx) in pieces" :key="idx">
      <p> {{ piece.title }} {{ piece.composer }} {{ piece.version }} </p>
    </div>
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
    <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="morceaux" action="getPieces" :offset="this.offset"/>
    <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious()" @error="errorCharge($event)" type="morceaux" action="getPieces" :offset="this.offset"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'

export default {
  name: "PiecePreview",
  data() {
    return {
      offset: 10,
      errorMsg: "",
      comparisonPieces: undefined
    }
  },
  components: {
    ChargeNext,
    ChargePrevious
  },
  mounted() {
    this.getPieces()
  },
  computed: {
    ...mapState(['pieces'])
  },
  methods: {
    getPieces() {
      this.$store.dispatch('getPieces', this.offset)
        .then(() => {
          this.comparisonPieces = this.pieces
          this.errorMsg = ""
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue lors de l'actualisation des morceaux en base de données" + error.response.data.message)
    },
    chargeNext(response) {
      if (this.comparisonPieces[0].id == response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas de morceaux supplémentaires."
      } else {
        this.errorMsg = ""
        this.comparisonPieces = this.pieces
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.comparisonPieces = this.pieces
    },
    errorCharge(error) {
      this.errorMsg = error.response.data.message
    }
  }
}
</script>

<style lang="scss">
</style>