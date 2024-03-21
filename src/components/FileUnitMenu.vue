<template>
  <form :id="'file' + file.id">
    <label for="file">Document: </label>
    <input class="fileInput" type="file" name="file" :id="'fileFile' + file.id" accept="'application/pdf','application/x-rar-compressed','application/zip''application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'" v-on:change="modifyFileField()"/>
    <label for="type">Type de document:</label>
    <input type="text" :placeholder="file.type" name="type" :id="'fileType' + file.id" v-model="this.updatedFile.type"/>
    <legend>Relié à:</legend>
    <FileUnitMenuLink class="parent parent--link" @linkedId="updateLink($event)" :checked="this.linkedTo.place" :file="file" name="lieu" type="place" action="getPlaces"/>
    <FileUnitMenuLink class="parent parent--link" @linkedId="updateLink($event)" :checked="this.linkedTo.piece" :file="file" name="morceau" type="piece" action="getPieces"/>
    <FileUnitMenuLink class="parent parent--link" @linkedId="updateLink($event)" :checked="this.linkedTo.concert" :file="file" name="concert" type="concert" action="getConcerts"/>
    <input type="submit" value="Mettre à jour" @click.stop.prevent="modifyFile()"/>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script>
import FileUnitMenuLink from './FileUnitMenuLink.vue'
import { mapState } from 'vuex'

export default {
  name: "FileUnitMenu",
  data() {
    return {
      linkedTo: {
        concert: undefined,
        place: undefined,
        piece: undefined
      },
      updatedFile: {
        file: {
          data: undefined,
          originalName: ""
        },
        type: "",
        placeId: null,
        pieceId: null,
        concertId: null
      },
      errorMsg: ""
    }
  },
  components: {
    FileUnitMenuLink,
  },
  beforeMount() {
    if (this.file.placeId) {
      this.linkedTo.place = true
    } else {
      this.linkedTo.place = false
    }
    if (this.file.concertId) {
      this.linkedTo.concert = true
    } else {
      this.linkedTo.concert = false
    }
    if (this.file.pieceId) {
      this.linkedTo.piece = true
    } else {
      this.linkedTo.piece = false
    }
  },
  mounted() {

  },
  props: {
    file: Object
  },
  computed: {
    ...mapState(['files', 'places', 'pieces', 'concerts'])
  },
  methods: {
    updateLink(response) {
      this.updatedFile[`${response.type}Id`] = response.id
      if (response.id) {
        this.linkedTo[`${response.type}`] = true
      } else {
        this.linkedTo[`${response.type}`] = false
      }
    },
    modifyFileField() {
      if (this.file.originalName !== event.target.files[0].name) {
        this.errorMsg = ""
        this.updatedFile.file.originalName = event.target.files[0].name
        this.updatedFile.file.data = event.target.files[0]
      } else {
        this.errorMsg = "Chargement du même fichier."
      }
    },
    modifyFile() {
      if (this.updatedFile.file.originalName
      || this.updatedFile.type
      || this.updatedFile.placeId
      || this.updatedFile.pieceId
      || this.updatedFile.concertId) {
        this.errorMsg = ""
        for (let prop in this.updatedFile) {
          if (!this.updatedFile[prop]) {
            this.updatedFile[prop] = this.file[prop]
          }
        }
        this.$store.dispatch('updateFile', {
          file: this.updatedFile,
          id: this.file.id
        })
          .then(() => {
            this.$emit('fileUpdated')
            this.$parent.$emit('fileUpdated')
          })
          .catch((error) => {
            if (error.response.data.message === "File allready saved in db, please dont save it multiple times!") {
              this.errorMsg = "Ce fichier est déjà stocké en Base de Données."
            }
          })
      } else {
        this.errorMsg = "Mise à jour impossible. Aucune information n'a changée."
      }
      //Il reset à gérer la mise à "null"
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  @include column;
  gap: 5px;
  box-sizing: border-box;
  padding: 10px;

  .fileInput {
    width: 100%;
  }

  .parent--link {
    width: 100%;
  }
}
</style>