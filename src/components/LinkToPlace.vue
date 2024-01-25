<template>
  <div class="linkedResearch">
    <p>Rattacher le document à un lieu ?</p>
    <p>Lancer une recherche de lieux:</p>
    <input type="submit" value="Rechercher" @click.stop.prevent="searchPlaces()"/>
    <p v-if="!this.reduce && this.placesArray" class="reduce">Réduire la recherche? <i @click.stop.prevent="reduceSearch()" class="fa-solid fa-circle-minus"></i></p>
    <p v-if="this.reduce">Ré-afficher :<i class="fa-solid fa-circle-plus" @click.stop.prevent="reduceSearch()"></i></p>
  </div>
  <div v-if="this.placesArray && !this.reduce">
    <div v-for="place of this.placesArray" :key="place.id">
      <p>{{ place.name }} | {{ place.city }} | {{ place.zip }} |  {{ place.type }} | <input @click="emitPlaceId(place.id)" type="checkbox" name="place"/></p> 
    </div>
    <p v-if="this.placesArray && this.placesArray.length == 10">Charger les lieux suivants? <i class="fa-solid fa-circle-plus" @click.stop.prevent="chargeNext()"></i></p>
    <p v-if="this.offset > 10">Charger les morceaux précédents? <i @click.stop.prevent="chargePrevious()" class="fa-solid fa-circle-minus"></i></p>
  </div>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
export default {
  name: "PlaceLink",
  data() {
    return {
      placesArray: undefined,
      errorMsg: "",
      offset: 10,
      reduce: false
    }
  },
  methods: {
    searchPlaces() {
      this.offset = 10
      this.$store.dispatch('searchForLinks', { type: "place" })
        .then((response) => {
          this.errorMsg = ""
          this.placesArray = response.data.data
        })
        .catch((error) => {
          this.placesArray = undefined
          this.errorMsg = "Une erreur est survenue, recherche de lieux impossible: " + error.response.data.message
        })
    },
    emitPlaceId(id) {
      if (event.target.hasAttribute('checked')) {
        this.$emit("modifyPlaceId", 0)
        event.target.removeAttribute('checked')
      } else {
        let previousSelected = event.target.parentNode.parentNode.parentNode.querySelector('[checked]')
        if (previousSelected) {
          previousSelected.checked = false
          previousSelected.removeAttribute('checked')
        }
        event.target.setAttribute("checked", "")
        this.$emit("modifyPlaceId", id)
      }
    },
    chargeNext() {
      this.$store.dispatch('searchForLinks', {
        type: 'place',
        offset: this.offset + 10
      })
        .then((response) => {
          if (this.placesArray == response.data.data) {
            this.errorMsg = "Vous êtes arrivés au bout de la liste des lieux enregistrés."
          } else {
            this.errorMsg = ""
            this.offset += 10
            this.placesArray = response.data.data
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant la recherche des prochains lieux: " + error.response.data.message)
    },
    chargePrevious() {
      this.$store.dispatch('searchForLinks', {
        type: 'place',
        offset: this.offset -= 10
      })
        .then((response) => {
          if (this.placesArray == response.data.data) {
            this.errorMsg = `Il n'y a pas de morceaux "précédents".`
          } else {
            this.errorMsg = ""
            this.offset -= 10
            this.placesArray = response.data.data
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant la recherche des précédents lieux: " + error.response.data.message)
    },
    reduceSearch() {
      this.reduce = !this.reduce
    }
  }
}
</script>

<style lang="scss">
</style>