<template>
  <div v-for="(member, idx) in members" :key="idx">
    <p> {{ member.lastName }} | {{ member.firstName }} | {{ member.role }} <i class="fa-solid fa-circle-plus" @click.stop.prevent="showControls()"></i>
    <ModifyMemberMenu v-if="this.showModifyMenu"/></p>
  </div>
  <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="membres" action="getMembers" :offset="this.offset"/>
  <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious($event)" @error="errorCharge($event)" name="membres" action="getMembers" :offset="this.offset"/>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
  <div class="specificResearch">
    <h4>Rechercher des comptes spécifiques : </h4> <i v-if="!this.addMenu" class="fa-solid fa-circle-plus" @click.stop.prevent="deployMenu()"></i>
    <div v-else>
      <p>Réduire le menu : <i @click.stop.prevent="deployMenu()" class="fa-solid fa-circle-minus"></i></p>
      <form id="accountsResearch" name="accountsResearch">
        <label for="type">Rechercher par type : </label>
        <select name="type" id="type" v-model.lazy="type" @change="manageReset()">
          <option value="">-- Veuillez sélectionner une option --</option>
          <option value="firstName">Prénom</option>
          <option value="lastName">Nom de Famille</option>
          <option value="role">Niveau de permission</option>
        </select>
        <select v-if="this.type == 'role'" id="selectValue" v-model.lazy="value" >
          <option value="">-- Veuillez sélectionner une option --</option>
          <option value="None" selected>Nouveau compte</option>
          <option value="Elève">Elève</option>
          <option value="Choriste">Choriste</option>
          <option value="Admin">Administrateur</option>
        </select>
        <input v-if="this.type && this.type !== 'role'" type="text" id="textValue" placeholder="Mot-clé à rechercher" v-model="value" autocomplete="on"/>
        <input v-if="this.type && this.value" type="submit" value="Lancer la recherche" @click.stop.prevent="getSpecificsUsers" @keydown.enter.stop.prevent="getSpecificsUsers"/>
      </form>
      <p v-for="(user, idx) in specificUsers" :key="idx"> {{ user.lastName }} | {{ user.firstName }} | {{ user.role }} </p>
      <!-- ChargeNext et ChargePrevious ici ne peuvent fonctionner, je dois en créer des spécialement (ou simplement les retranscrire ici) car la recherche avec :type/:value ne fonctionne pas avec le composant que j'ai écrit -->
      <p v-if="this.specificUsers"><i class="fa-solid fa-circle-plus" @click.stop.prevent="loadNextResults()"></i> Charger les comptes suivants ?</p>
      <p v-if="this.specificOffset > 10"><i class="fa-solid fa-circle-minus" @click.stop.prevent="loadPreviousResults()"></i> Charger les comptes précédents ?</p>
      <p v-if="this.specificErrorMsg"> {{ specificErrorMsg }} </p>
    </div>
  </div>
</template>

<script>
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'
import ModifyMemberMenu from '@/components/ModifyMemberMenu.vue'

export default {
  name: "MembersPreview",
  data() {
    return {
      offset: 10,
      errorMsg: "",
      members: undefined,
      storedType: "",
      type: "",
      value: "",
      specificOffset: 10,
      specificUsers: undefined,
      specificErrorMsg: "",
      addMenu: false
    }
  },
  components: {
    ChargeNext,
    ChargePrevious,
    ModifyMemberMenu
  },
  mounted() {
    this.getMembers()
  },
  methods: {
    deployMenu() {
      this.addMenu = !this.addMenu
    },
    getMembers() {
      this.offset = 10
      this.comparisonMembers = undefined
      this.errorMsg = ""
      this.$store.dispatch('getMembers', { offset: this.offset })
        .then((response) => {

          this.members = response.data.data
        })
        .catch((error) => {
          this.members = undefined
          this.errorMsg = "Une erreur est survenue durant la recherche des membres enregistrés: " + error.response.data.message
        })
    },
    chargeNext(response) {
      if (this.members[0].id === response.data.data[0].id) {
        this.errorMsg = "Aucun compte supplémentaire à afficher"
      } else {
        this.errorMsg = ""
        this.offset += 10
        this.members = response.data.data
      }
    },
    chargePrevious(response) {
      this.errorMsg = ""
      this.offset -= 10
      this.members = response.data.data
    },
    errorCharge(error) {
      this.errorMsg = "Une erreur est survenue: " + error.response.data.message
    },
    manageReset() {
      if (this.type === "firstName" || this.type === "lastName") {
        if (this.storedType === "role" || this.storedType === "") {
          this.value = ""
        }
      } else {
        this.value = ""
      }
      this.storedType = this.type
    },
    getSpecificsUsers() {
      if (this.type && this.value) {
        this.specificErrorMsg = ""
        this.$store.dispatch('getSpecificsUsersAccount', {
          type: this.type,
          value: this.value,
          offset: 10
        })
          .then((response) => {
            this.specificErrorMsg = ""
            this.specificUsers = response.data.data
          })
          .catch((error) => {
            this.specificUsers = undefined
            this.specificErrorMsg = "Une erreur est survenue durant la recherche de comptes spécifiques: " + error.response.data.message
          })
      }
    },
    loadNextResults() {
      this.$store.dispatch('getSpecificsUsersAccount', {
        type: this.type,
        value: this.value,
        offset: this.specificOffset + 10
      })
        .then((response) => {
          if (this.specificUsers[0].id === response.data.data[0].id) {
            this.specificErrorMsg = "Il n'y a pas d'autres comptes avec ces paramètres de recherche."
          } else {
            this.specificErrorMsg = ""
            this.specificOffset += 10
            this.specificUsers = response.data.data
          }
        })
        .catch((error) =>  this.specificErrorMsg = "Une erreur est survenue: " + error.response.data.message)
    },
    loadPreviousResults() {
      this.$store.dispatch('getSpecificsUsersAccount', {
        type: this.type,
        value: this.value,
        offset: this.specificOffset
      })
        .then((response) => {
          this.specificUsers = response.data.data
          this.specificOffset -= 10
          this.specificErrorMsg = ""
        })
        .catch((error) => this.specificErrorMsg = "Une erreur est survenue: " + error.response.data.message)
    }
  }
}

</script>