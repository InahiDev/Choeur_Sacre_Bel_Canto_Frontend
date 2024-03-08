<template>
  <section>
    <ConcertModifyUnit v-for="concert of concerts" :key="concert.id" v-bind:concert="concert" @updated="getConcerts()"/>
    <!--<div v-for="(concert, idx) in concerts" :key="idx">
      <p> {{ concert.name }} {{ concert.city }} {{ concert.date.split('T')[0] }} </p>
    </div>-->
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
    <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="concerts" action="getConcerts" :offset="this.offset"/>
    <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious()" @error="errorCharge($event)" type="concerts" action="getFirstConcerts" :offset="this.offset"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'
import ConcertModifyUnit from '@/components/ConcertModifyUnit.vue'

export default {
  name: "ConcertPreview",
  data() {
    return {
      errorMsg: "",
      offset: 10,
      comparisonConcerts: undefined
    }
  },
  components: {
    ChargeNext,
    ChargePrevious,
    ConcertModifyUnit
  },
  mounted() {
    this.getConcerts()
  },
  computed: {
    ...mapState(['concerts'])
  },
  methods: {
    getConcerts() {
      this.comparisonConcerts = undefined
      this.$store.dispatch('getConcerts', { offset: this.offset })
        .then(() => {
          this.comparisonConcerts = this.concerts
          this.errorMsg = ""
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue lors de l'actualisation des concerts en base de données" + error /* + error.response.data.message*/)
    },
    chargeNext(response) {
      if (this.comparisonConcerts[0].id == response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas de concerts supplémentaires."
      } else {
        this.errorMsg = ""
        this.comparisonConcerts = this.concerts
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.comparisonConcerts = this.concerts
    },
    errorCharge(error) {
      this.errorMsg = error.response.data.message
    }
  }
}
</script>

<style lang="scss">
</style>