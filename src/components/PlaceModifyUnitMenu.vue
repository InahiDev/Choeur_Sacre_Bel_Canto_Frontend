<template>
  <div>
    <form :id="'place' + place.id">
      <label for="city">Ville: </label>
      <input name="city" type="text" :placeholder="place.city" :id="'placeCity' + place.id" @change="modifyCity(place.id)"/><br/>
      <label for="zip">Code postal: </label>
      <input name="zip" type="text" :placeholder="place.zip" :id="'placeZip' + place.id" @change="modifyZip(place.id)"/><br/>
      <label for="name">Nom du lieu: </label>
      <input name="name" type="text" :placeholder="place.name" :id="'placeName' + place.id" @change="modifyName(place.id)"/><br/>
      <label for="type">Type de lieu: </label>
      <input name="type" type="text" :placeholder="place.type" :id="'placeType' + place.id" @change="modifyType(place.id)"/><br/>
      <input type="submit" :disabled="!this.updateReady" value="Mettre à jour" @click.stop.prevent="modifyPlace()"/>
    </form>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "PlaceModifyUnitMenu",
  data() {
    return {
      updateReady: false,
      errorMsg: "",
      updatePlace: {
        city: "",
        zip: "",
        name: "",
        type: ""
      }
    }
  },
  props: {
    place: Object
  },
  methods: {
    disableUpdate() {
      if (this.updatePlace.city
      || this.updatePlace.zip
      || this.updatePlace.name
      || this.updatePlace.type) {
        this.updateReady = true
      } else {
        this.updateReady = false
      }
    },
    modifyCity(id) {
      this.updatePlace.city = document.querySelector(`#placeCity${id}`).value
      this.disableUpdate()
    },
    modifyZip(id) {
      this.updatePlace.zip = document.querySelector(`#placeZip${id}`).value
      this.disableUpdate()
    },
    modifyName(id) {
      this.updatePlace.name = document.querySelector(`#placeName${id}`).value
      this.disableUpdate()
    },
    modifyType(id) {
      this.updatePlace.type = document.querySelector(`#placeType${id}`).value
      this.disableUpdate()
    },
    modifyPlace() {
      if (this.updateReady) {
        for (let prop in this.updatePlace) {
          if (!this.updatePlace[prop]) {
            this.updatePlace[prop] = this.place[prop]
          }
        }
        this.$store.dispatch('modifyPlace', { place: this.updatePlace, id: this.place.id })
          .then(() => {
            this.errorMsg = ""
            this.$emit('updated')
            this.$parent.$emit('updated')
          })
          .catch((error) => this.errorMsg = "Une erreur est survenue durant la mise à jour du lieu de représentation: " + error.response?.data?.message)
      } else {
        this.errorMsg = "Il manque des informations pour effectuer une mise à jour du lieu."
      }
    }
  }
}
</script>

<style lang="scss">
</style>