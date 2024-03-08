<template>
  <Ajout Concert>
    <div hidden>
      <h3>Ajouter / Modifier un concert : </h3><i v-if="!this.addMenu" class="fa-solid fa-circle-plus" @click.stop.prevent="deployAddMenu()"></i>
      <div v-else>
        <p>Réduire le menu : <i @click.stop.prevent="deployAddMenu()" class="fa-solid fa-circle-minus"></i></p>
        <p v-if="!this.addPictureMenu">Ajouter une photo? <i @click.stop.prevent="deployPictureMenu()" class="fa-solid fa-circle-plus"></i></p>
        <div v-else>
          <p>Réduire le menu d'ajout d'une photo? (Si vous avez joint une photo elle sera conservée) <i @click.stop.prevent="deployPictureMenu()" class="fa-solid fa-circle-minus"></i></p>
          <label for="picture">Uploader une photo à joindre au concert: </label>
          <input type="file" id="picture" name="picture" accept="'image/jpeg', 'image/jpg', 'image/png'" v-on:change="modifyPictureField()"/><br/> 
          <div v-if="this.concert.picture.file">
            <label>Description de la photo (obligatoire)</label>
            <input type="text" id="alt" name="alt" v-model.lazy="concert.picture.alt"/>
          </div>
          <p v-if="this.concert.picture">Image chargée prête à l'envoi: {{ concert.picture.name }} </p>
        </div>
        <label for="city">Ville: </label>
        <input type="text" placeholder="Colomiers" id="city" name="city" v-model.lazy="concert.city"/><br/>
        <label for="zip">Code Postal: </label>
        <input type="text" placeholder="31770" id="zip" name="zip" v-model.lazy="concert.zip"/><br/>
        <label for="name">Nom: </label>
        <input type="text" placeholder="Nouveau Concert" id="name" name="name" v-model.lazy="concert.name"/><br/>
        <label for="type">Type du Concert: </label>
        <select name="type" id="type" v-model.lazy="concert.type">
          <option value="">--Choisissez une valeur--</option>
          <option value="Récital">Récital</option>
          <option value="Classique">Classique</option>
        </select><br/>
        <label for="price">Prix: </label>
        <p><input placeholder="10" type="number" id="price" name="price" @change="normalizePrice()"/>€</p>
        <p v-if="this.priceErrorMsg"> {{ priceErrorMsg }} </p>
        <p>Concert gratuit ? <input id="free" type="checkbox" name="free" @change="setConcertFree()"/> </p>
        <br/>
        <label for="date">Date: </label>
        <input type="datetime-local" id="date" name="date" @change="normalizeDate()"/><br/>
        <input type="submit" value="Soumettre" @click.stop.prevent="addConcert()"/>
        <p v-if="this.errorMsg">{{ errorMsg }}</p>
      </div>
    </div>
  </Ajout>
</template>

<template>
  <!--FileModifyUnit partiie des liens vers concert/place/piece.
    Travail Brut désormais factorisé en FileModifyUnitLink-->
      <div>
        <input type="checkbox" :checked="this.linkedTo.place" name="place" :id="'filePlace' + file.id"/>
        <label for="place">Un lieu.</label>
        <i v-if="!this.showPlaceMenu" class="fa-solid fa-circle-plus" @click.stop="showPlaces()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showPlaces()"></i>
        <div v-if="this.showPlaceMenu">
          <select :id="'file' + file.id + 'PlaceId' ">
            <option value="null">-- Sélectionnez un lieu --</option>
            <FileUnitMenuLinkTo v-for="place of this.places" v-bind:key="place.id" :model="place"/>
          </select>
        </div>
      </div>
      <div>
        <input type="checkbox" :checked="this.linkedTo.piece" name="piece" :id="'filePiece' + file.id"/>
        <label for="piece">Un morceau.</label>
        <i v-if="!this.showPieceMenu" class="fa-solid fa-circle-plus" @click.stop="showPieces()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showPieces()"></i>
        <div v-if="this.showPieceMenu">
          <select :id="'file' + file.id + 'PieceId'">
            <option value="null">-- Sélectionnez un morceau --</option>
            <FileUnitMenuLinkTo v-for="piece of this.pieces" v-bind:key="piece.id" :model="piece"/>
          </select>
        </div>
      </div>
      <div>
        <input type="checkbox" :checked="false" name="concert" :id="'fileConcert' + file.id"/>
        <label for="concert">Un concert.</label>
        <i v-if="!this.showConcertMenu" class="fa-solid fa-circle-plus" @click.stop="showConcerts()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showConcerts()"></i>
        <div v-if="this.showConcertMenu">
          <select :id="'file' + file.id + 'ConcertId'">
            <option value="null">-- Sélectionner un concert --</option>
            <FileUnitMenuLinkTo v-for="concert of this.concerts" v-bind:key="concert.id" :model="concert"/>
          </select>
        </div>
      </div>
</template>



<template>
  <!--Cas d'un concert-->
  <option v-if="model.hasOwnProperty('date')" > {{ model.name.substring(0, 6) }} | {{ model.date.substring(0, 10) }} </option>
  <!--Cas d'un lieu de concert-->
  <option v-if="model.hasOwnPropery('name') && !model.hasOwnProperty('date')" > {{ model.name }} | {{ model.city }} </option>
  <!--Cas d'un morceau-->
  <option v-if="!model.hasOwnProperty('name')" > {{ model.title }} | {{ model.composer }} </option>


  <option @click.stop.prevent="chargeNext()">-- Charger les éléments suivants --</option>
  <option @click.stop.prevent="chargePrevious()">-- Charger les éléments précédents --</option>
</template>

<script>
    chargeNext() {
      this.$emit()
    },
    chargePrevious() {

    }


data() {
  return {
    is: "",
      date: {
        fullDate: "",
        fullTime: "",
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        min: 0
      },
      shortName: "",
      shortCity: "",
      shortTitle: "",
      shortComposer: "",
      limit: 6
  }
}

if (model.hasOwnProperty('date')) {
      this.date.fullDate = this.model.date.split('T')[0]
      this.date.fullTime = this.model.date.split('T')[1]
      this.date.year = this.date.fullDate.split('-')[0]
      this.date.month = this.date.fullDate.split('-')[1]
      this.date.day = this.date.fullDate.split('-')[2]
      this.date.hour = this.date.fullTime.split(':')[0]
      this.date.min = this.date.fullTime.split(':')[1]
    }
    if (model.hasOwnProperty('name')) {
      this.shortName = this.model.name.substring(0, this.limit)
    }
    if (model.hasOwnProperty('city')) {
      this.shortCity = this.model.city.substring(0, this.limit)
    }
    if (model.hasOwnProperty('title')) {
      this.shortTitle = thiis.model.title.substring(0, this.limit)
    }
    if (this.model.hasOwnProperty('composer')) {
      this.shortComposer = this.model.composer.substring(0, this.limit)
    }
</script>