<template>
  <section>
    <div v-for="(place, idx) in places" :key="idx">
      <p> {{ place.city }} {{ place.name }} {{ place.type }} </p>
    </div>
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
    <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="lieux" action="getPlaces" :offset="this.offset"/>
    <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious()" @error="errorCharge($event)" type="lieux" action="getPlaces" :offset="this.offset"/>
    <!--<p><i class="fa-solid fa-circle-plus" @click.stop.prevent="chargeNext()"></i> Charger les lieux suivants ?</p>
    <p v-if="this.offset > 10"><i @click.stop.prevent="chargePrevious()" class="fa-solid fa-circle-minus"></i> Charger les lieux précédents ?</p>-->
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'

export default {
  name: "PlacePreview",
  data() {
    return {
      offset: 10,
      errorMsg: "",
      comparisonPlaces: undefined
    }
  },
  components: {
    ChargeNext,
    ChargePrevious
  },
  mounted() {
    this.getPlaces()
  },
  computed: {
    ...mapState(['places'])
  },
  methods: {
    getPlaces() {
      this.$store.dispatch('getPlaces', this.offset)
        .then(() => {
          this.comparisonPlaces = this.places
          this.errorMsg = ""
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue lors de l'actualisation des lieux de concert en base de données" + error.response.data.message)
    },
    chargeNext(response) {
      if (this.comparisonPlaces[0].id == response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas de lieux supplémentaires."
      } else {
        this.errorMsg = ""
        this.comparisonPlaces = this.places
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.comparisonPlaces = this.places
    },
    errorCharge(error) {
      this.errorMsg = error.response.data.message
    }
  }
}
</script>

<style lang="scss">
</style>