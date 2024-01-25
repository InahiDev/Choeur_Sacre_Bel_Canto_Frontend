<template>
  <div class="linkedResearch">
    <p>Créer un lien vers: {{ typeToLink }} ?</p>
    <p>Recherche de {{ typeToLink }} :</p>
    <input type="submit" value="Rechercher" @click.stop.prevent="searchType()"/>
  </div>
  <div v-for="typeReturned of this.dataArray" :key="typeReturned.id">
    <p> {{  }} {{  }} {{  }} {{  }} </p>
  </div>
</template>

<script>
export default {
  name: "ResearchId",
  data() {
    return {
      type: this.typeToLink.toLowerCase(),
      offset: 0,
      dataArray: []
    }
  },
  props: {
    typeToLink: String,
  },
  computed: {},
  methods: {
    searchType() {
      this.offset = 0
      this.$store.dispatch('searchType', {
        type: this.type,
        offset: this.offset
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>

<style lang="scss">
</style>