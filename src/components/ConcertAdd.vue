<template>
  <h3 class="admin__title">Ajouter un concert : <i v-if="!this.showAdd" class="fa-solid fa-circle-plus" @click.stop="showAddMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu()"></i></h3>
  <div class="admin__add" v-if="this.showAdd">
    <div class="admin__add__section  admin__add__section--picture">
      <label for="concertNewPicture">Charger une photo <i class="fa-solid fa-circle-plus"></i></label>
      <input class="fileInput" type="file" id="concertNewPicture" name="picture" accept="'image/jpeg', 'image/jpg', 'image/png'" v-on:change="previewPicture()"/>
      <div class="image__container--picture" v-if="this.picturePreview">
        <img :src="this.picturePreview"/>
        <p class="image__container__suppress" @click.stop.prevent="cancelPreview()">Supprimer la photo ? <i class="fa-solid fa-circle-xmark"></i></p>
      </div>
      <div class="image__container--alt" v-if="this.concert.picture.file">
        <label>Description de la photo :</label>
        <input type="text" id="concertNewAlt" name="alt" v-model.lazy="concert.picture.alt" placeholder="Description textuelle"/>
      </div>
      <p class="image__text image__text--static" v-if="this.concert.picture.file">Image chargée :</p>
      <p class="image__text image__text--dynamic" v-if="this.concert.picture.file">{{ concert.picture.name }}</p>
    </div>
    <div class="admin__add__section">
      <form class="admin__add__section--text">
        <div class="formUnit">
          <label for="city">Ville :</label>
          <input type="text" placeholder="Colomiers" id="concertNewCity" name="city" v-model.lazy="concert.city"/>
        </div>
        <div class="formUnit formUnit--zip">
          <label for="zip">Code Postal :</label>
          <input type="text" placeholder="31770" id="concertNewZip" name="zip" v-model.lazy="concert.zip"/>
        </div>
        <div class="formUnit">
          <label for="name">Nom :</label>
          <input type="text" placeholder="Nouveau Concert" id="concertNewName" name="name" v-model.lazy="concert.name"/>
        </div>
        <div class="formUnit formUnit--select">
          <label for="type">Type :</label>
          <select name="type" id="concertNewType" v-model.lazy="concert.type">
            <option value="">--Choisissez une valeur--</option>
            <option value="Récital">Récital</option>
            <option value="Classique">Classique</option>
          </select>
        </div>
        <div class="formUnit formUnit--price">
          <div class="formUnit--price--text">
            <label for="price">Prix :</label>
            <p><input placeholder="10" type="text" id="concertNewPrice" name="price" @change="normalizePrice()"/> €</p>
          </div>
          <p>Concert gratuit ? <input id="concertNewFree" type="checkbox" name="free" @change="setConcertFree()"/></p>
          <p v-if="this.priceErrorMsg">{{ priceErrorMsg }}</p>
        </div>
        <div class="formUnit formUnit--date">
          <label for="date">Date :</label>
          <input type="datetime-local" id="concertNewDate" name="date" @change="normalizeDate()"/>
        </div>
        <input type="submit" value="Ajouter" @click.stop.prevent="addConcert()"/>
      </form>
      <p class="errorMsg" v-if="this.errorMsg">{{ errorMsg }}</p>
    </div>
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
        if (this.concert.picture.file) {
          if (this.concert.picture.alt) {
            const newConcert = this.concert
            this.$store.dispatch('addConcertWithPicture', newConcert)
              .then(() => {
                this.errorMsg = ""
                this.$emit('newConcert')
              })
              .catch((error) => {
                this.errorMsg = "Ajout d'un nouveau concert échoué: " + error.response?.data?.message
              })
          } else {
            this.errorMsg = "Une description alternative de la photo est nécessaire."
          }
        } else {
          const newConcert = {
            city: this.concert.city,
            zip: this.concert.zip,
            name: this.concert.name,
            date: this.concert.date,
            price: this.concert.price,
            type: this.concert.type
          }
          this.$store.dispatch('addConcertTextual', newConcert)
            .then(() => {
              this.errorMSg = ""
              this.$emit('newConcert')
            })
            .catch((error) => {
              this.errorMsg = "Ajout d'un nouveau concert échoué: " + error.response?.data?.message
            })
        }
        //this.$store.dispatch('addConcert', this.concert)
        //  .then(() => {
        //    this.errorMsg = ""
        //    this.$emit('newConcert')
        // })
        //  .catch((error) => {
        //    this.errorMsg = "Ajout d'un nouveau concert échoué: " + error.response?.data?.message
        //  })
      } else {
        this.errorMsg = 'Les champs "Ville", "Code Postal", "Nom", "Date" sont obligatoires.'
      }
    }
  }
}
</script>

<style lang="scss">
.admin {
  &__title {
    margin: 0;
    width: 100%;
  }
        .formUnit {
          @include row(space-between);
          width: 100%;
          gap: 5px;
          input {
            text-align: end;
          }
          select {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          &--zip {
            label {
              min-width: 90px;
            }
            input {
              max-width: 120px;
            }
          }
          &--price {
            flex-direction: column;
            &--text {
              width: 100%;
              @include row(space-between);
              p input {
                max-width: 50px;
              }
            }
          }
          &--date {
            input {
              text-align: unset;
            }
          }
        }

  &__add {
    @include column;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;

    &__section {
      @include column;
      gap: 5px;
      box-sizing: border-box;
      width: 100%;
      border-radius: $radius-small;
      box-shadow: $shadow-controls;
      padding: 15px;

      &--picture {
        position: relative;
        padding: 10px;

        .fileInput {
          width: 0;
          height: 0;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }

        .image {
          &__container {
            &--picture {
              width: 100%;

              img {
                width: 100%;
                border-radius: 10px;
                object-fit: contain;
              }
            }

            &--alt {
              @include column;
              gap: 5px;

              input {
                width: 100%;
              }
            }

            &__suppress {
              font-size: 1.1em;

              i {
                font-size: 0.9em;
              }
            }
          }
          
          &__text {
            width: 100%;

            &--static {
              font-size: 1.1em;
            }

            &--dynamic {
              font-size: 0.9em;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }

      &--text {
        @include column;
        gap: 5px;
        width: 100%;
      }
    }
  }
}

//h3.admin__title {
//  margin: 0;
//}
//
//.admin__section {
//  &__add {
//    @include column;
//    gap: 10px;
//    width: 100%;
//    &__picture, &__textForm {
//      @include column;
//      width: 100%;
//      gap: 5px;
//    }
//    &__picture {
//      .fileInput {
//        width: 100%;
//      }
//      .image__container {
//        width: 100%;
//        img {
//          width: 100%;
//          height: auto;
//          object-fit: contain;
//          border-radius: 5px;
//        }
//        p {
//          font-size: 0.9em
//        }
//      }
//      &__text {
//        @include column;
//        gap: 5px;
//        font-size: 0.9em;
//        &.label, label {
//          font-size: 1.1em;
//        }
//        input {
//          border-radius: 5px;
//        }
//        &--fileName {
//          width: 100%;
//          font-size: 0.9em;
//          width: 100%;
//          overflow: hidden;
//          white-space: nowrap;
//          text-overflow: ellipsis;
//        }
//      }
//    }
//    &__textForm {
//      box-sizing: border-box;
//      input, select {
//        box-sizing: border-box;
//        width: 100%;
//      }
//      &--priceP {
//        width: 100%;
//        input[type="text"] {
//          width: 92%;
//        }
//        input[type="checkbox"] {
//          width: auto;
//        }
//      }
//      input[type="submit"] {
//        width: 65%;
//        padding: 5px;
//        background-color: $color-secondary;
//        color: #FFF;
//        border: none;
//        border-radius: 15px / 50%;
//        margin-top: 5px;
//      }
//    }
//  }
//}

</style>