<template>
  <div class="concerts">
    <p v-if="!this.addMenu">Ajouter un concert : <i class="fa-solid fa-circle-plus" @click.stop.prevent="deployAddMenu()"></i></p>
    <div v-else class="addConcert">
      <p>Réduire le menu : <i @click.stop.prevent="deployAddMenu()" class="fa-solid fa-circle-minus"></i></p>
      <p v-if="!this.addPictureMenu">Ajouter une photo? <i @click.stop.prevent="deployPictureMenu()" class="fa-solid fa-circle-plus"></i></p>
      <div v-else>
        <p>Réduire le menu d'ajout d'une photo? (Si vous avez joint une photo elle sera conservée) <i @click.stop.prevent="deployPictureMenu()" class="fa-solid fa-circle-minus"></i></p>
        <label for="picture">Uploader une photo à joindre au concert: </label>
        <input type="file" id="picture" name="picture" accept="'image/jpeg', 'image/jpg', 'image/png'" v-on:change="modifyPictureField()"/><br/> 
        <input type="text" id="alt" name="alt" v-model.lazy="alt"/>
        <p v-if="this.picture">Image chargée prête à l'envoi: {{ picture.name }} </p>
      </div>
      <label for="city">Ville: </label>
      <input type="text" id="city" name="city" v-model.lazy="city"/><br/>
      <label for="name">Nom: </label>
      <input type="text" id="name" name="name" v-model.lazy="name"/><br/>
      <label for="zip">Code Postal: </label>
      <input type="number" min="1000" max="99999" id="zip" name="zip" v-model.lazy="zip"/><br/>
      <label for="type">Type du Concert: </label>
      <select name="type" id="type" v-model.lazy="type">
        <option value="">--Choisissez une valeur--</option>
        <option value="Récital">Récital</option>
        <option value="Classique">Classique</option>
      </select><br/>
      <label for="price">Prix: </label>
      <input type="number" min="0" max="1500" id="price" name="price" v-model.lazy="price"/>
      <p>Concert gratuit ? <input type="checkbox" name="free"/> </p>
      <p>Participation Libre ? <input type="checkbox" name="participation"/> </p>
      <br/>
      <label for="date">Date: </label>
      <input type="date" id="date" name="date" v-model.lazy="date"/><br/>
      <input type="submit" value="Soumettre"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddConcert",
  data() {
    return {
      addMenu: false,
      addPictureMenu: false,
      picture: undefined,
      alt: "",
      city: "",
      name: "",
      zip: 0,
      date: "",
      type: "",
      price: 0
    }
  },
  methods: {
    deployAddMenu() {
      this.addMenu = !this.addMenu
    },
    deployPictureMenu() {
      this.addPictureMenu = !this.addPictureMenu
    },
    modifyPictureField() {
      this.picture = event.target.files[0]
    },
    addConcert() {

    }
  }
}
</script>


<style lang="scss">
</style>