<template>
  <h3>Rechercher des documents.</h3>
  <form id="fileResearch">
    <label for="fileType">Propriété à rechercher: </label>  
    <select name="fileType" id="fileType">
      <option value="">--Choisissez une valeur--</option>
      <option value="originalName">Nom</option>
      <option value="type">Type</option>
      <option value="pieceId">Morceau</option>
      <option value="concertId">Concert</option>
      <option value="placeId">Emplacement</option>
    </select><br/>
    <label for="fileValue">Mot-clé à rechercher: </label>
    <input type="search" v-model="this.research.value" id="fileValue" placeholder="Entrez le mot-clé à rechercher" name="fileValue"/><br/>
    <input type="submit" @keydown.enter="startResearch()" @click.stop.prevent="startResearch()"/>
  </form>
  <div>
    <p v-if="!this.successMsg && !this.errorMsg">Les documents que vous rechercherez s'afficheront ici!</p>
    <p v-if="this.successMsg">{{ successMsg }}</p>
    <p v-else>{{ errorMsg }}</p>
  </div>
  <ChargeNextResearch v-if="this.returnedData" @error="errorHandler($event)" @chargeNext="chargeNext($event)" :offset="this.research.offset" :type="this.previousResearch.type" :value="this.previousResearch.value"/>
  <ChargePreviousResearch  @chargePrevious="chargePrevious($event)" @error="errorHandler($event)" v-if="this.returnedData && this.research.offset > 10" :offset="this.research.offset" :type="this.previousResearch.type" :value="this.previousResearch.value"/>
</template>

<script>
import ChargeNextResearch from '@/components/ChargeNextResearch.vue'
import ChargePreviousResearch from '@/components/ChargePreviousResearch.vue'
import { mapState } from 'vuex'

export default {
  name: "FileResearch",
  data() {
    return {
      errorMsg: "",
      successMsg: "",
      research: {
        type: "",
        value: "",
        offset: 10
      },
      previousResearch: {
        type: "",
        value: ""
      },
      returnedData: undefined
    }
  },
  computed: {
    ...mapState(['files'])
  },
  components: {
    ChargeNextResearch,
    ChargePreviousResearch
  },
  emits: ['results', 'error'],
  props: {

  },
  methods: {
    startResearch() {
      this.research.type = document.getElementById('fileType').value
      this.research.value = document.getElementById('fileValue').value
      this.returnedData = undefined
      if (this.research.value && this.research.type) {
        this.research.offset = 10
        this.$store.dispatch('getSpecificFiles', {
          type: this.research.type,
          value: this.research.value
        })
          .then((response) => {
            this.previousResearch.type = this.research.type
            this.previousResearch.value = this.research.value
            this.errorMsg = ""
            this.successMsg = "Résultats de votre recherche"
            this.returnedData = response.data.data
            this.$emit('results', this.returnedData)
          })
          .catch((error) => {
            this.successMsg = ""
            this.errorMsg = "Recherche infructueuse, une erreur est survenue: " + error.response?.data?.message
            if (error.response?.status === 404) {
              this.errorMsg = "Aucune correspondance pour cet ensemble de propriété / mot-clé. Veuillez essayer avec de nouveaux paramètres de recherche."
            }
            this.$emit('error')
          })
      } else {
        this.errorMsg = "Veuillez sélectionner un type et entrer un mot-clé pour commencer une recherche en base de données."
      }
    },
    chargeNext(response) {
      if (this.returnedData[0].id === response.data?.data[0].id) {
        this.successMsg = "Il n'y a pas de fichiers supplémentaires."
        this.errorMsg = ""
      } else {
        this.successMsg = "Résultats de votre recherche"
        this.errorMsg = ""
        this.research.offset += 10
        this.returnedData = response.data?.data
        this.$emit('results', this.returnedData)
      }
    },
    chargePrevious(response) {
      this.successMsg = "Résultats de votre rechercher"
      this.errorMsg = ""
      this.research.offset -= 10
      this.returnedData = response.data?.data
      this.$emit('results', this.returnedData)
    },
    errorHandler(error) {
      this.successMsg = ""
      this.errorMsg = "Une erreur est survenue: " + error.response?.data?.message
    }
  }
}
</script>

<style lang="scss">
</style>