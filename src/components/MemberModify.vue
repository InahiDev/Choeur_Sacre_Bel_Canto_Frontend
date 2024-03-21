<template>
  <h3 class="admin__title">Modifier les membres :   <i v-if="!this.showModify" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i>  <i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i></h3>
  <div class="admin__modify__section admin__modify__section--member" v-if="this.showModify">
    <MemberModifyUnit v-for="member of members" :key="member.id" v-bind:member="member" @updated="getMembers()" @accountDeleted="getMembers()"/>
    <ChargeNext class="admin__modify__controls admin__modify__controls--next" @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="membres" action="getMembers" :offset="this.offset"/>
    <ChargePrevious class="admin__modify__controls admin__modify__controls--previous" v-if="this.offset > 10" @chargePrevious="chargePrevious($event)" @error="chargggeError($event)" type="membres" action="getMembers" :offset="this.offset"/>
    <p v-if="this.errorMsg">{{ errorMsg }}</p>
</div>
</template>

<script>
import MemberModifyUnit from '@/components/MemberModifyUnit.vue'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'

export default {
  name: "MemberModify",
  data() {
    return {
      showModify: false,
      offset: 10,
      errorMsg: "",
      members: undefined
    }
  },
  mounted() {
    this.getMembers()
  },
  components: {
    MemberModifyUnit,
    ChargeNext,
    ChargePrevious
  },
  methods: {
    showMenu() {
      this.showModify = !this.showModify
    },
    getMembers() {
      this.offset = 10
      this.storedMembers = undefined
      this.errorMs = ""
      this.$store.dispatch('getMembers', { offset: this.offset })
        .then((response) => {
          this.members = response.data.data
        })
        .catch((error) => {
          this.members = undefined
          this.errorMsg = "Une erreur est survenue durant la recherche des comptes de membre: " + error.response?.data?.message
        })
    },
    chargeNext(response) {
      if (this.members[0].id === response.data.data[0].id) {
        this.errorMsg = "Il n'y a aucun compte supplémentaire à afficher."
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
      this.errorMsg = "Une erreur est survenue: " + error.response?.data?.message
    }
  }
}
</script>

<style lang="scss">
</style>