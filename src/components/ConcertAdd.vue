<template>
  <h3>Ajouter un concert : <i v-if="!this.showAdd" class="fa-solid fa-circle-plus" @click.stop="showAddMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu()"></i></h3>
  <div v-if="this.showAdd">
    <p>Ajouter une photo? <i v-if="!this.showPictureAdd" @click.stop="showPictureAddMenu()" class="fa-solid fa-circle-plus"></i><i v-else @click.stop="showPictureAddMenu()" class="fa-solid fa-circle-minus"></i></p>
    <div v-if="this.showPictureAdd">
      <label for="picture">Uploader une photo à joindre au concert: </label>
      <input type="file" id="concertNewPicture" name="picture" accept="'image/jpeg', 'image/jpg', 'image/png'" v-on:change="previewPicture()"/><br/>
      <div v-if="this.picturePreview">
        <img :src="this.picturePreview"/>
        <p>Supprimer la photo ? <i @click.stop.prevent="cancelPreview()" class="fa-solid fa-circle-minus"></i></p>
      </div>
      <div v-if="this.concert.picture.file">
        <label>Description de la photo (obligatoire) : </label>
        <input type="text" id="concertNewAlt" name="alt" v-model.lazy="concert.picture.alt"/>
      </div>
      <p v-if="this.concert.picture.file">Image chargée prête à l'envoi: {{ concert.picture.name }} </p>
    </div>
    <form>
      <label for="city">Ville: </label>
      <input type="text" placeholder="Colomiers" id="concertNewCity" name="city" v-model.lazy="concert.city"/><br/>
      <label for="zip">Code Postal: </label>
      <input type="text" placeholder="31770" id="concertNewZip" name="zip" v-model.lazy="concert.zip"/><br/>
      <label for="name">Nom: </label>
      <input type="text" placeholder="Nouveau Concert" id="concertNewName" name="name" v-model.lazy="concert.name"/><br/>
      <label for="type">Type du Concert: </label>
      <select name="type" id="concertNewType" v-model.lazy="concert.type">
        <option value="">--Choisissez une valeur--</option>
        <option value="Récital">Récital</option>
        <option value="Classique">Classique</option>
      </select><br/>
      <label for="price">Prix: </label>
      <p><input placeholder="10" type="text" id="concertNewPrice" name="price" @change="normalizePrice()"/> €</p>
      <p v-if="this.priceErrorMsg">{{ priceErrorMsg }}</p>
      <p>Concert gratuit ? <input id="concertNewFree" type="checkbox" name="free" @change="setConcertFree()"/> </p>
      <label for="date">Date: </label>
      <input type="datetime-local" id="concertNewDate" name="date" @change="normalizeDate()"/><br/>
      <input type="submit" value="Soumettre" @click.stop.prevent="addConcert()"/>
    </form>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
const price = /^(\d+){1,}$/

export default {
  name: "ConcertAdd",
  data() {
    return {
      showAdd: false,
      showPictureAdd: false,
      concert: {
        city: "",
        name: "",
        zip: "",
        date: "",
        type: "",
        price: "",
        picture: {
          file: undefined,
          name: "",
          alt: ""
        }
      },
      picturePreview: "",
      errorMsg: "",
      priceErrorMsg: ""
    }
  },
  emits: ['newConcert'],
  methods: {
    showAddMenu() {
      this.showAdd = !this.showAdd
    },
    showPictureAddMenu() {
      this.showPictureAdd = !this.showPictureAdd
    },
    normalizePrice() {
      const priceInput = document.querySelector('#concertNewPrice')
      const freeConcert = document.querySelector('#concertNewFree')
      if (price.test(priceInput.value)) {
        this.priceErrorMsg = ""
        const normalizedPrice = parseInt(priceInput.value) * 100
        if (normalizedPrice > 0) {
          freeConcert.checked = false
          freeConcert.removeAttribute('checked')
          this.concert.price = normalizedPrice.toString()
        } else {
          freeConcert.checked = true
          freeConcert.setAttribute('checked', '')
          priceInput.setAttribute('disabled', '')
          this.concert.price = "000"
        }
      } else {
        this.priceErrorMsg = "Veuillez n'entrer que des chiffres dans le formulaire de saisie précédent."
      }
    },
    normalizeDate() {
      const dateInputValue = document.querySelector('#concertNewDate').value
      this.concert.date = dateInputValue + ":00.000Z"
    },
    setConcertFree() {
      const freeConcert = document.querySelector('#concertNewFree')
      const priceInput = document.querySelector('#concertNewPrice')
      if (freeConcert.hasAttribute('checked')) {
        freeConcert.removeAttribute('checked')
        priceInput.removeAttribute('disabled')
        priceInput.value = '1'
      } else {
        freeConcert.setAttribute('checked', '')
        priceInput.value = '0'
        priceInput.setAttribute('disabled', '')
        this.concert.price = '000'
      }
    },
    previewPicture() {
      let reader = new FileReader
      reader.onload = event => {
        this.picturePreview = event.target.result
      }
      this.concert.picture.file = event.target.files[0]
      reader.readAsDataURL(this.concert.picture.file)
      this.concert.picture.name = event.target.files[0].name
    },
    cancelPreview() {
      this.concert.picture.file = undefined
      this.concert.picture.name = undefined
      this.picturePreview = undefined
      document.querySelector('#concertNewPicture').value = ''
    },
    addConcert() {
      if (this.concert.city && this.concert.zip && this.concert.name && this.concert.type && this.concert.date) {
        this.$store.dispatch('addConcert', this.concert)
          .then(() => {
            this.errorMsg = ""
            this.$emit('newConcert')
         })
          .catch((error) => {
            this.errorMsg = "Ajout d'un nouveau concert échoué: " + error.response?.data?.message
          })
      } else {
        this.errorMsg = 'Les champs "Ville", "Code Postal", "Nom", "Date" sont obligatoires.'
      }
    }
  }
}
</script>

<style lang="scss">
</style>