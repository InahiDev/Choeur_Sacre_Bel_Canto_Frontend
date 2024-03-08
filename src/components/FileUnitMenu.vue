<template>
  <div>
    <form :id="'file' + file.id">
      <label for="file">Document: </label>
      <input type="file" name="file" :id="'fileFile' + file.id" accept="'application/pdf','application/x-rar-compressed','application/zip''application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'" v-on:change="modifyFileField()"/><br/>
      <label for="type">Type de document:</label>
      <input type="text" :placeholder="file.type" name="type" :id="'fileType' + file.id"/><br/>
      <legend>Relié à:</legend>
      <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkedTo.place" :file="file" name="lieu" type="place" :array="this.places"/>
      <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkedTo.piece" :file="file" name="morceau" type="piece" :array="this.pieces"/>
      <FileUnitMenuLink @linkedId="updateLink($event)" :checked="this.linkedTo.concert" :file="file" name="concert" type="concert" :array="this.concerts"/>
      <input type="submit" value="Mettre à jour" @click.stop.prevent="modifyFile()"/>
    </form>
  </div>
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
      }
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
    modifyFile() {
    }
  }
}
</script>

<style lang="scss"></style>