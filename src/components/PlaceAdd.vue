<template>
  <h3>Ajouter un lieu de concert : <i v-if="!this.showAdd" class="fa-solid fa-circle-plus" @click.stop="showAddMenu"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu"></i></h3>
  <div v-if="this.showAdd">
    <p>Réduire le menu: <i class="fa-solid fa-circle-minus" @click.stop="showAddMenu()"></i></p>
    <label for="city">Ville: </label>
    <input type="text" id="newPlaceCity" name="city" v-model.lazy="place.city"/><br/>
    <label for="zip">Code postal: </label>
    <input type="text" name="zip" id="newPlaceZip" v-model.lazy="place.zip"/><br/>
    <label for="name">Nom du lieu: </label>
    <input type="text" id="newPlaceName" name="name" v-model.lazy="place.name"/><br/>
    <label for="type">Type de lieu (facultatif): </label>
    <input type="text" id="newPlaceType" name="type" v-model.lazy="place.type"/><br/>
    <input type="submit" value="Soumettre" @click.stop.prevent="addPlace()"/>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "PlaceAdd",
  data() {
    return {
      showAdd: false,
      place: {
        city: "",
        zip: "",
        name: "",
        type: ""
      },
      errorMsg: ""
    }
  },
  emits: ['newPlace'],
  methods: {
    showAddMenu() {
      this.showAdd = !this.showAdd
    },
    addPlace() {
      if (this.place.city && this.place.zip && this.place.name) {
        this.$store.dispatch('addPlace', this.place)
          .then(() => {
            document.querySelector('#newPlaceCity').value = ""
            document.querySelector('#newPlaceZip').value = ""
            document.querySelector('#newPlaceName').value = ""
            document.querySelector('#newPlaceType').value = ""
            this.errorMsg = ""
            this.$emit('newPlace')
          })
      }
    }
  }
}
</script>

<style lang="scss">
</style>