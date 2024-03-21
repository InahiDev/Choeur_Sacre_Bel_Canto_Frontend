<template>
  <section>
    <form id="fileResearch" class="fileResearch">
      <label for="fileType">Propriété à rechercher: </label>  
      <select name="fileType" id="fileType">
        <option value="">--Choisissez une valeur--</option>
        <option value="originalName">Nom</option>
        <option value="type">Type</option>
        <option value="pieceId">Morceau</option>
        <option value="concertId">Concert</option>
        <option value="placeId">Emplacement</option>
      </select>
      <label for="fileValue">Mot-clé à rechercher: </label>
      <input type="search" v-model="this.research.value" id="fileValue" placeholder="Entrez le mot-clé à rechercher" name="fileValue"/>
      <input type="submit" class="button button--research" @keydown.enter="startResearch()" @click.stop.prevent="startResearch()"/>
    </form>
    
    <ChargeNextResearch v-if="this.returnedData" @error="errorHandler($event)" @chargeNext="chargeNext($event)" :offset="this.research.offset" :type="this.previousResearch.type" :value="this.previousResearch.value"/>
    <ChargePreviousResearch  @chargePrevious="chargePrevious($event)" @error="errorHandler($event)" v-if="this.returnedData && this.research.offset > 10" :offset="this.research.offset" :type="this.previousResearch.type" :value="this.previousResearch.value"/>
    <div>
      <p v-if="!this.successMsg && !this.errorMsg">Les documents que vous rechercherez s'afficheront ici!</p>
      <p v-if="this.successMsg">{{ successMsg }}</p>
      <p v-else>{{ errorMsg }}</p>
    </div>
  </section>
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
        this.research.type = this.previousResearch.type
        this.research.value = this.previousResearch.value
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
      this.research.type = this.previousResearch.type
      this.research.value = this.previousResearch.value
      this.returnedData = response.data?.data
      this.$emit('results', this.returnedData)
    },
    reloadData() {
      console.log("le emits est arrivé jusqu'ici")
      this.$store.dispatch('getSpecificFiles', {
        type: this.previousResearch.type,
        value: this.previousResearch.value,
        offset: this.research.offset
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
    },
    errorHandler(error) {
      this.successMsg = ""
      this.errorMsg = "Une erreur est survenue: " + error.response?.data?.message
    }
  }
}
</script>

<style lang="scss">
section form.fileResearch {
  @include column;
  gap: 10px;
  width: 100%;

  label {
    font-size: 1.2em;
  }

  input, select {
    box-sizing: border-box;
    font-size: 1.05em;
    width: 100%;
    padding: 4px;
    border-radius: $radius-small;

  }

  .button--research {
    width: 50%;
  }
}
</style>