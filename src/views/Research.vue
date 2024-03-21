<template>
  <main>
    <h2>Rechercher des documents</h2>
    <FileResearch ref="FileResearch" @results="displayResearchResults($event)" @error="cleanFiles()"/>
    <section class="section--researchFiles" v-if="this.displayedFiles">
      <FileUnit @fileUpdated="reloadData()" v-for="file of this.displayedFiles" :key="file.id" :file="file"/>
    </section>
  </main>

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
    },
    reloadData() {
      console.log('le emits est arrivé jusque là')
      this.$refs.FileResearch.reloadData()
    }
  }
}
</script>

<style lang="scss">
h2 {
  font-size: 1.5em;
  margin-top: 5px;
}
</style>