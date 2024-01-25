<template>
  <div class="archives">
    <p v-if="!this.addMenu">Ajouter un fichier : <i class="fa-solid fa-circle-plus" @click.stop.prevent="deployAddMenu()"></i></p>
    <div v-else class="addFile">
      <p>Réduire le menu : <i @click.stop.prevent="deployAddMenu()" class="fa-solid fa-circle-minus"></i></p>
      <label for="file">Ajouter un fichier à la base de données ? </label>
      <input type="file" id="file" name="file" accept="'application/pdf','application/x-rar-compressed','application/zip''application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'" v-on:change="modifyFileField()"/><br/>
      <label for="fileType">Spécifier le type du document ajouté (obligatoire):</label>
      <input type="text" id="fileType" name="fileType" v-model.lazy="fileType"/>
      <input type="submit" value="Envoyer" @click.stop.prevent="addFile()"/>
      <p v-if="this.addErrorMsg">{{ addErrorMsg }}</p>
      <PieceLink @modifyPieceId="setPieceId"/><br/>
      <ConcertLink @modifyConcertId="setConcertId"/><br/>
      <PlaceLink @modifyPlaceId="setPlaceId"/>
    </div>
  </div>
</template>

<script>
import PieceLink from "@/components/LinkToPiece.vue"
import ConcertLink from "@/components/LinkToConcert.vue"
import PlaceLink from "@/components/LinkToPlace.vue"

export default {
  name: "AddFile",
  data() {
    return {
      addMenu: false,
      file: undefined,
      fileType: '',
      placeId: 0,
      pieceId: 0,
      concertId: 0,
      addErrorMsg: ""
    }
  },
  components: {
    PieceLink,
    ConcertLink,
    PlaceLink
  },
  methods: {
    deployAddMenu() {
      this.addMenu = !this.addMenu 
    },
    modifyFileField() {
      this.file = event.target.files[0]
    },
    addFile() {
      if (this.file && this.fileType) {
        let file = {
          file: this.file,
          type: this.fileType
        }
        if (this.concertId) {
          file.concertId = this.concertId
        }
        if (this.placeId) {
          file.placeId = this.placeId
        }
        if (this.pieceId) {
          file.pieceId = this.pieceId
        }
        this.$store.dispatch('addFile', file)
          .then(() => {
            this.addErrorMsg = ""
          })
          .catch((error) => this.addErrorMsg = "Echec de l'envoi du fichier: " + error.response.data.message)
      } else {
        this.fileErrorMsg = "Veuillez sélectionner un fichier et spécifier le type (classification) de celui-ci avant de soumettre son envoi, merci!"
      }
    },
    setPlaceId(id) {
      this.placeId = id
    },
    setConcertId(id) {
      this.concertId = id
    },
    setPieceId(id) {
      this.pieceId = id
    }
  }
}
</script>

<style lang="scss">
</style>