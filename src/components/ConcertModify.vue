<template>
  <h3>Modifier un concert : <i v-if="!this.showModify" class="fa-solid fa-circle-plus" @click.stop="showModifyMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showModifyMenu()"></i></h3>
  <div v-if="this.showModify">
    <ConcertModifyUnit v-for="concert of concerts" :key="concert.id" v-bind:concert="concert" @updated="getConcerts()" @deleted="getConcerts()" @errorDeletion="errorDeletion($event)"/>
    <p v-if="this.errorMsg"> {{ errorMsg }} </p>
    <ChargeNext @chargeNext="chargeNext($event)" @error="errorCharge($event)" name="concerts" action="getConcerts" :offset="this.offset"/>
    <ChargePrevious v-if="this.offset > 10" @chargePrevious="chargePrevious()" @error="errorCharge($event)" name="concerts" action="getConcerts" :offset="this.offset"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChargeNext from '@/components/ChargeNext.vue'
import ChargePrevious from '@/components/ChargePrevious.vue'
import ConcertModifyUnit from '@/components/ConcertModifyUnit.vue'

export default {
  name: "ConcertModify",
  data() {
    return {
      showModify: false,
      offset: 10,
      storedConcerts: undefined,
      errorMsg: ""
    }
  },
  mounted() {
    this.getConcerts()
  },
  components: {
    ChargeNext,
    ChargePrevious,
    ConcertModifyUnit
  },
  computed: {
    ...mapState(['concerts'])
  },
  methods: {
    showModifyMenu() {
      this.showModify = !this.showModify
    },
    getConcerts() {
      this.storedConcerts = undefined
      this.$store.dispatch('getConcerts', { offset: this.offset })
        .then(() => {
          this.storedConcerts = this.concerts
          this.errorMsg = ""
        })
        .catch((error) => {
          this.errorMsg = "Une erreur est survenue lors de l'actualisation des concerts en base de données" + error.response.data.message
        })
    },
    chargeNext(response) {
      if (this.storedConcerts[0].id == response.data.data[0].id) {
        this.errorMsg = "Il n'y a pas de concerts supplémentaires."
      } else {
        this.errorMsg = ""
        this.storedConcerts = this.concerts
        this.offset += 10
      }
    },
    chargePrevious() {
      this.errorMsg = ""
      this.offset -= 10
      this.storedConcerts = this.concerts
    },
    errorCharge(error) {
      this.errorMsg = error.response?.data?.message
    },
    errorDeletion(error) {
      this.errorMsg = error.response?.data?.message
    }
  }
}
</script>