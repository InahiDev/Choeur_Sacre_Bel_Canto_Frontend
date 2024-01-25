<template>
  <h2>Bienvenue sur la page de recherche dans la base de données de la chorale.</h2>
  <p>Veuillez sélectionner un type de recherche et un mot-clé à rechercher</p>
  <form>
    <label for="type">Par quelle propriété souhaitez-vous rechercher votre/vos documents ?</label>
    <select name="type" id="type">
      <option value="">--Choisissez une valeur--</option>
      <option value="originalName">Nom</option>
      <option value="type">Type</option>
      <option value="pieceId">Morceau</option>
      <option value="concertId">Concert</option>
      <option value="placeId">Emplacement</option>
    </select>
    <label for="value">Entrez un mot-clé à rechercher</label>
    <input type="search" id="value" placeholder="Entrez le mot-clé à rechercher"/>
    <input type="submit" @click.stop.prevent="startResearch()"/>
  </form>
  <p v-if="!this.success && !this.errorMsg">Les documents que vous souhaitez s'afficheront ici.</p>
  <p v-if="this.errorMsg"> {{ errorMsg }} </p>
  <div id="researchResult">
    <div v-for="file of this.$store.state.files" :key="file.id">
      <p>{{ file.originalName }} </p><br/>
      <input type="button" value="Télécharger le document" @click.stop.prevent="downloadFile(file.id, file.originalName)"/><br/>
      <a hidden target="_blank" :key="file.id" >Sauvegarder ?</a> 
    </div>
    <p v-if="this.files">Voire les fichiers suivants ? <i class="fa-solid fa-circle-plus" @click.stop.prevent="chargeNext()"></i></p>
    <p v-if="this.offset > 10">Voire les fichiers précédents ? <i @click.stop.prevent="chargePrevious()" class="fa-solid fa-circle-minus"></i></p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "ResearchView",
  data() {
    return {
      type: "",
      value: "",
      success: false,
      errorMsg: "",
      offset: 10,
      storedType: "",
      storedValue: "",
      comparisonFiles: undefined
    }
  },
  computed: {
    ...mapState(['files'])
  },
  methods: {
    startResearch() {
      this.value = document.querySelector('#value').value
      this.type = document.querySelector('#type').value
      this.comparisonFiles = undefined
      if (this.value && this.type) {
        this.offset = 10
        this.$store.dispatch('getSpecificFiles', {
          type: this.type,
          value: this.value
        })
          .then(() => {
            this.success = true
            this.errorMsg = ''
            this.storedType = this.type
            this.storedValue = this.value
            this.comparisonFiles = this.files
          })
          .catch((error) => {
            this.success = false
            this.errorMsg = "Une erreur est survenue, la recherche est infructueuse."
            if (error.response.status == 404) {
              this.errorMsg = "Aucune correspondance pour cet ensemble de propriété / mot-clé dans la base de données. Essayez une autre combinaison: " + error.response.data.message
            }
          })
      } else {
        this.errorMsg = "Veuillez sélectionner un type pour la recherche, ainsi que rentrer un mot-clé à rechercher."
      }
    },
    chargeNext() {
      this.$store.dispatch('getSpecificFiles', {
        type: this.type,
        value: this.value,
        offset: this.offset + 10
      })
        .then((response) => {
          if (this.comparisonFiles == response.data.data.data) {
            this.errorMsg = "Vous êtes arrivés au bout des fichiers pour cette recherche!"
          } else {
            this.offset += 10
            this.comparisonFiles = response.data.data.data
          }
        })
        .catch((error) => {
          this.success = false
          this.errorMsg = `Une erreur est survenue: ${error}`
        })
    },
    chargePrevious() {
      this.$store.dispatch('getSpecificFiles', {
        type: this.type,
        value: this.value,
        offset: this.offset -10
      })
        .then((response) => {
          if (this.offset > 10) {
            this.offset -= 10
            this.comparisonFiles = response.data.data.data
          }
        })
        .catch((error) => console.log(error))
    },
    downloadFile(id, filename) {
      let downloadLink = event.target.parentNode.querySelector('a')
      this.$store.dispatch('extractFile', id)
        .then((response) => {
          let binary = '';
          const bytes = new Uint8Array(response.data.data.data.data);
          const len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const file = window.btoa(binary);
          const mimeType = response.data.data.data.mimetype
          const url = `data:${mimeType};base64,` + file;
          // download the file
          downloadLink.href = url
          downloadLink.download = filename
          downloadLink.target = "_blank"
          downloadLink.click()  
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>

<style lang="scss">
</style>