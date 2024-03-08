<template>
  <form>
    <label for="fileAddFile">Sélectionner un fichier :</label>
    <input type="file" if="fileAddFile" accept="'application/pdf','application/x-rar-compressed','application/zip''application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'" v-on:change="modifyFileField()"/><br/>
    <label for="fileAddType">Spécifier le type du document :</label>
    <input type="text" id="fileAddType" v-model.lazy="newFile.type"/><br/>
    <input type="submit" value="Soumettre" @click.stop.prevent="addFile()"/>
  </form>
  <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkTo.place" :file="this.newFile" name="lieu" type="place" :array="this.places"/>
  <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkTo.piece" :file="this.newFile" name="morceau" type="piece" :array="this.pieces"/>
  <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkTo.concert" :file="this.newFile" name="concert" type="concert" :array="this.concerts"/>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
import FileUnitMenuLink from './FileUnitMenuLink.vue'
import { mapState } from 'vuex'

export default {
  name: "FileAdd",
  data() {
    return {
      newFile: {
        id: "New",
        file: undefined,
        type: "",
        placeId: null,
        pieceId: null,
        concertId: null
      },
      linkTo: {
        piece: undefined,
        concert: undefined,
        place: undefined
      },
      errorMsg: ""
    }
  },
  computed: {
    ...mapState(['pieces', 'places', 'concerts'])
  },
  components: {
    FileUnitMenuLink
  },
  props: {

  },
  emits: [],
  methods: {
    modifyFileField() {
      this.newFile.file = event.target.files[0]
    },
    addFile() {
      if (this.newFile.file && this.newFile.type) {
        let file = {
          file: this.newFile.file,
          type: this.newFile.type
        }
        if (this.newFile.concertId) {
          file.concertId = this.newFile.concertId
        }
        if (this.newFile.pieceId) {
          file.pieceId = this.newFile.pieceId
        }
        if (this.newFile.placeId) {
          file.placeId = this.newFile.placeId
        }
        this.$store.dispatch('addFile', file)
          .then(() => {
            this.errorMsg = ""
            window.alert('Document enregistré avec succès.')
          })
          .catch((error) => {
            this.errorMsg = "Echec de l'envoi du fichier: " + error.response?.data?.message
          })
      } else {
        this.errorMsg = "Veuillez sélectionner un fichier et renseigner le type de ce dernier avant de le soumettre."
      }
    },
    updateLink(response) {
      this.newFile[`${response.type}Id`] = response.id
      if (response.id) {
        this.linkTo[`${response.type}`] = true
      } else {
        this.linkTo[`${response.type}`] = false
      }
    }
  }
}
</script>

<style lang="scss">
</style>