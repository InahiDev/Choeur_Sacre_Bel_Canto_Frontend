<template>
  <div class="modify__menu modify__menu--concert">
    <form class="modify__menu__text modify__menu__text--concert" :id="'concert' + concert.id">
      <div class="formUnit formUnit--modify formUnit--modify--city">
        <label for="city">Ville: </label>
        <input :placeholder="concert.city" name="city" type="text" :id="'concertCity' + concert.id" @change="updateCity(concert.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--modify--zip">
        <label for="zip">Code postal:</label>
        <input :placeholder="concert.zip" name="zip" type="text" :id="'concertZip' + concert.id" @change="updateZip(concert.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--modify--name">
        <label for="name">Nom:</label>
        <input :placeholder="concert.name" name="name" type="text" :id="'concertName' + concert.id" @change="updateName(concert.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--modify--date">
        <label for="date">Date:</label>
        <input :value="concert.date.split('.')[0]" name="date" type="datetime-local" :id="'concertDate' + concert.id" @change="updateDate(concert.id)"/>
      </div>
      <div class="formUnit formUnit--modify formUnit--modify--type">
        <label for="type">Type:</label>
        <select name="type" :placeholder="concert.type" :id="'concertType' + concert.id" @change="updateType(concert.id)">
          <option value="Récital">Récital</option>
          <option value="Classique">Classique</option>
        </select>        
      </div>
      <div class="formUnit formUnit--modify formUnit--modify--price">
        <label for="price">Prix:</label>
        <input :placeholder="concert.price" name="price" type="number" :id="'concertPrice' + concert.id" @change="updatePrice(concert.id)"/>
      </div>
      <input type="submit" :disabled="!this.updateTextReady" :id="'concertSubmit' + concert.id" value="Mettre à jour" @click.stop.prevent="modifyText()"/>
      <p v-if="this.textErrorMsg">{{ textErrorMsg }}</p>
    </form>
    <p class="modify__menu__picture--show" v-if="!this.showPictureMenu"><span v-if="concert.picture">Modifier la photo? </span><span v-else>Rajouter une photo? </span><i @click.stop.prevent="pictureMenu()" class="fa-solid fa-circle-plus"></i></p>
    <div class="modify__menu__picture" v-else>
      <p class="modify__menu__picture--show">Réduire le menu photo ? <i @click.stop.prevent="pictureMenu()" class="fa-solid fa-circle-minus"></i></p>
      <form class="modify__menu__picture__form">
        <label :for="'concertPicture' + concert.id">Télécharger une photo <i class="fa-solid fa-circle-plus"></i></label>
        <input type="file" accept="'image/jpeg', 'image/jpg', 'image/png'" :id="'concertPicture' + concert.id" name="picture" @change="updatePicture(concert.id)"/>
        <div class="modify__menu__picture__form__container" v-if="this.imagePreview">
          <img :src="this.imagePreview" />
          <p>Supprimer la photo? <i fa-solid class="fa-solid fa-circle-minus" @click.stop="cancelPreview(concert.id)"></i></p>
        </div>
        <label for="alt">Légende :</label>
        <input v-if="concert.picture?.alt" :placeholder="concert.picture.alt" :id="'concertPictureAlt' + concert.id" name="alt" @change="updateAlt(concert.id)"/>
        <input v-else type="text" :id="'concertPictureAlt' + concert.id" name="alt" @change="updateAlt(concert.id)"/>
        <input type="submit" :disabled="!this.updateImageReady" value="Mettre à jour la photo" @click.stop.prevent="modifyPicture()"/>
        <p v-if="this.pictureErrorMsg">{{ pictureErrorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConcertModifyUnitMenu",
  data() {
    return {
      updateTextReady: false,
      updateImageReady: false,
      textErrorMsg: "",
      pictureErrorMsg: "",
      updateConcert: {
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
      updateImage: {
        file: undefined,
        name: "",
        alt: ""
      },
      showPictureMenu: false,
      imagePreview: undefined
    }
  },
  components: {
  },
  props: {
    concert: Object
  },
  methods: {
    disableTextUpdate() {
      if (this.updateConcert.city
      || this.updateConcert.name
      || this.updateConcert.zip
      || this.updateConcert.date
      || this.updateConcert.type
      || this.updateConcert.price) {
        this.updateTextReady = true
      } else {
        this.updateTextReady = false
      }
    },
    disablePictureUpdate() {
      if (this.concert.picture?.path) {
        if (this.updateImage.file || this.updateImage.alt) {
          this.updateImageReady = true
        } else {
          this.updateImageReady = false
        }
      } else {
        if (this.updateImage.file && this.updateImage.alt) {
          this.updateImageReady = true
        } else {
          this.updateImageReady = false
        }
      }
    },
    updateCity(id) {
      this.updateConcert.city = document.querySelector(`#concertCity${id}`).value
      this.disableTextUpdate()
    },
    updateName(id) {
      this.updateConcert.name = document.querySelector(`#concertName${id}`).value
      this.disableTextUpdate()
    },
    updateZip(id) {
      this.updateConcert.zip = document.querySelector(`#concertZip${id}`).value
      this.disableTextUpdate()
    },
    updateDate(id) {
      this.updateConcert.date = document.querySelector(`#concertDate${id}`).value + ':00.000Z'
      this.disableTextUpdate()
    },
    updateType(id) {
      this.updateConcert.type = document.querySelector(`#concertType${id}`).value
      this.disableTextUpdate()
    },
    updatePrice(id) {
      this.updateConcert.price = document.querySelector(`#concertPrice${id}`).value
      this.disableTextUpdate()
    },
    updatePicture() {
      let reader = new FileReader
      reader.onload = event => {
        this.imagePreview = event.target.result
      }
      this.updateImage.file = event.target.files[0]
      reader.readAsDataURL(this.updateImage.file)
      this.updateImage.name = event.target.files[0].filename
      this.disablePictureUpdate()
    },
    updateAlt(id) {
      this.updateImage.alt = document.querySelector(`#concertPictureAlt${id}`).value
      this.disablePictureUpdate()
    },
    cancelPreview(id) {
      this.updateImage.file = undefined
      this.updateImage.name = undefined
      this.imagePreview = undefined
      document.querySelector(`#concertPicture${id}`).value = ''
      this.disablePictureUpdate()
    },
    pictureMenu() {
      this.showPictureMenu = !this.showPictureMenu
    },
    modifyPicture() {
      if (this.updateImageReady) {
        this.$store.dispatch('updatePicture', {
          picture: this.updateImage,
          id: this.concert.id
        })
          .then(() => {
            this.pictureErrorMsg = ""
            this.$emit('updated')
            this.$parent.$emit('updated')
          })
          .catch((error) => this.pictureErrorMsg = "Une erreur est survenue durant la mise à jour: " + error.response?.data?.message)
      } else {
        this.errorMsg = "Il manque des informations pour effectuer la mise à jour de l'image."
      }
    },
    modifyText() {
      if (this.updateTextReady) {
        for (let prop in this.updateConcert) {
          if (!this.updateConcert[prop]) {
            this.updateConcert[prop] = this.concert[prop]
          }
        }
        this.$store.dispatch('updateTextConcert', {
          concert: this.updateConcert,
          id: this.concert.id
        })
          .then(() => {
            this.textErrorMsg = ""
            this.$emit('updated')
            this.$parent.$emit('updated')
          })
          .catch((error) => this.textErrorMsg = "Une erreur est survenue: " + error.response?.data?.message)
      } else {
        this.textErrorMsg = "Il manque des informations pour effectuer la mise à jour des informatiions textuelles."
      }
    }
  }
}
</script>

<style lang="scss">


.modify__menu {
  &.modify__menu--concert {
    width: 120%;
    top: 15px;
  }

  &__text {
    @include column;
    gap: 5px;
    width: 100%;
  }
  
  .formUnit {
    &--modify {
      &--zip {
        input {
          max-width: 140px;
        }
      }

      &--date {
        input {
          text-align: justify;
        }
      }
    }
  }
  &__picture {
    @include column;
    width: 100%;
    box-sizing: border-box;

    &--show {
      margin: 5px 0;
      width: 100%;
      box-sizing: border-box;
    }

    &__form {
      width: 100%;
      @include column;
      gap: 5px;

      input[type="file"] {
        width: 0;
        height: 0;
        position:absolute;
      }

      &__container {
        width: 100%;
        @include column;
        gap: 5px;


        img {
          width: 100%;
          object-fit: contain;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>