<template>
  <h3 class="admin__title">Modifier un lieu :   <i v-if="!this.showModify" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i>  <i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i></h3>
  <div class="admin__modify__section admin__modify__section--place" v-if="this.showModify">
    <PlaceModifyUnit v-for="place of this.storedPlaces" :key="place.id" v-bind:place="place" @updated="getPlaces()" @deleted="getPlaces()"/>
    <ChargeNext class="admin__modify__controls admin__modify__controls--next" @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="lieux" action="getPlaces" :offset="this.offset"/>
    <ChargePrevious class="admin__modify__controls--previous" v-if="this.offset > 10" @chargePrevious="chargePrevious($event)" @error="errorCharge($event)" type="lieux" action="getPlaces" :offset="this.offset"/>
    <p class="errorMsg" v-if="this.errorMsg"> {{ errorMsg }} </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlaceModifyUnit from '@/components/PlaceModifyUnit.vue'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'

export default {
  name: "PlaceModify",
  data() {
    return {
      showModify: false,
      offset: 10,
      storedPlaces: undefined
    }
  },
  mounted() {
    this.getPlaces()
  },
  computed: {
    ...mapState(['places'])
  },
  components: {
    PlaceModifyUnit,
    ChargeNext,
    ChargePrevious
  },
  methods: {
    showMenu() {
      this.showModify = !this.showModify
    },
    getPlaces() {
      this.storedPlaces = undefined
      this.$store.dispatch('getPlaces', { offset: this.offset })
        .then((response) => {
          this.storedPlaces = response.data.data
          this.errorMsg = ""
        })
        .catch((error) => {
          this.errorMsg = "Une erreur est survenue durant l'actualisation des lieux enregistrés: " + error.response?.data?.message
        })
    },
    chargeNext(response) {
      if (this.storedPlaces[0].id === response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas d'autres lieux à afficher."
      } else {
        this.errorMsg = ""
        this.storedPlaces = this.places
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.storedPlaces = this.places
    },
    errorCharge(error) {
      this.errorMsg = error.response?.data?.message
    }
  }
}
</script>

<style lang="scss">
</style>