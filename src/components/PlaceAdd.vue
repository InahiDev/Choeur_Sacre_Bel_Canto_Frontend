<template>
  <h3 class="admin__title">Ajouter un lieu : <i v-if="!this.showAdd" class="fa-solid fa-circle-plus" @click.stop="showAddMenu"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu"></i></h3>
  <div class="admin__add" v-if="this.showAdd">
    <div class="admin__add__section">
      <form class="admin__add__section--text">
        <div class="formUnit formUnit--city">
          <label for="city">Ville :</label>
          <input type="text" id="newPlaceCity" name="city" v-model.lazy="place.city"/>
        </div>
        <div class="formUnit formUnit--zip">
          <label for="zip">Code postal :</label>
          <input type="text" name="zip" id="newPlaceZip" v-model.lazy="place.zip"/>
        </div>
        <div class="formUnit formUnit--name">
          <label for="name">Nom :</label>
          <input type="text" id="newPlaceName" name="name" v-model.lazy="place.name"/>    
        </div>
        <div class="formUnit formUnit--type">
          <label for="type">Type :</label>
          <input type="text" id="newPlaceType" name="type" v-model.lazy="place.type"/>    
        </div>
        <input type="submit" value="Soumettre" @click.stop.prevent="addPlace()"/>
      </form>
      
    </div>

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