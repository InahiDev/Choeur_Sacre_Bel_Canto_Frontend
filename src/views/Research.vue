<template>
  <h2>Bienvenue sur la page de recherche dans la base de données de la chorale.</h2>
  <FileResearch @results="displayResearchResults($event)" @error="cleanFiles()"/>
  <FileUnit v-for="file of this.displayedFiles" :key="file.id" :file="file"/>
</template>

<script>
import FileResearch from '@/components/FileResearch.vue'
import FileUnit from '@/components/FileUnit.vue'

export default {
  name: "ResearchView",
  data() {
    return {
      showModify: false,
      displayedFiles: undefined
    }
  },
  components: {
    FileResearch,
    FileUnit
  },
  methods: {
    displayResearchResults(data) {
      this.displayedFiles = data
    },
    showModifyMenu() {
      this.showModify = !this.showModify
    },
    cleanFiles() {
      this.displayedFiles = undefined

    }
  }
}
</script>

<style lang="scss">
</style>