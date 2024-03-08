<template>
  <div>
    <p>{{ file.originalName }} | {{ file.mimetype.split('/')[1] }} | {{ file.type }} <i class="fa-solid fa-file-arrow-down" @click="downloadFile()"></i> <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i></p>
    <FileUnitMenu :file="file" v-if="this.showControls"/>
    <a hidden target="_blank" :key="file.id" >Sauvegarder ?</a> 
  </div>
</template>

<script>
import FileUnitMenu from '@/components/FileUnitMenu'

export default {
  name: "FileUnit",
  data() {
    return {
      showControls: false
    }
  },
  components: {
    FileUnitMenu
  },
  props: {
    file: Object
  },
  methods: {
    showMenu() {
      this.showControls = !this.showControls
    },
    downloadFile() {
      let downloadLink = event.target.parentNode.parentNode.querySelector('a')
      this.$store.dispatch('extractFile', this.file.id)
        .then((response) => {
          let binary = ''
          const bytes = new Uint8Array(response.data.data.data.data)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          const file = window.btoa(binary)
          const mimeType = response.data.data.data.mimetype
          const url = `data:${mimeType};base64,` + file
          downloadLink.href = url
          downloadLink.download = this.file.originalName
          downloadLink.target = "_blank"
          downloadLink.click()
          window.URL.revokeObjectURL(url)
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            this.errorMsg = "Une erreur est survenue pendant le téléchargement du fichier: " + error.response.data.message
          } else {
            this.errorMsg = "Une erreur est apparue dans le site: " + error
          }
        })
    }
  }
}
</script>

<style lang="scss">
</style>