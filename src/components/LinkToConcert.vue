<template>
  <div class="linkedResearch">
    <p>Rattacher le document à un concert ?</p>
    <p>Lancer une recherche de concerts:</p>
    <input type="submit" value="Rechercher" @click.stop.prevent="searchConcerts()"/>
    <p v-if="!this.reduce && this.concertsArray" class="reduce">Réduire la recherche? <i @click.stop.prevent="reduceSearch()" class="fa-solid fa-circle-minus"></i></p>
    <p v-if="this.reduce">Ré-afficher :<i class="fa-solid fa-circle-plus" @click.stop.prevent="reduceSearch()"></i></p>
  </div>
  <div v-if="this.concertsArray && !this.reduce">
    <div v-for="concert of this.concertsArray" :key="concert.id">
      <p>{{ concert.date }} | {{ concert.type }} | {{ concert.name }} |  {{ concert.city }} | <input @click.stop="emitConcertId(concert.id)" type="checkbox" name="concert"/></p>
    </div>
    <p v-if="this.concertsArray && this.concertsArray.length == 10">Charger les concerts suivants? <i class="fa-solid fa-circle-plus" @click.stop.prevent="chargeNext()"></i></p>
    <p v-if="this.offset > 10">Charger les concerts précédents? <i @click.stop.prevent="chargePrevious()" class="fa-solid fa-circle-minus"></i></p>
  </div>
  <p v-if="this.errorMsg">{{ errorMsg }}</p>
</template>

<script>
export default {
  name: "ConcertLink",
  data() {
    return {
      concertsArray: undefined,
      errorMsg: "",
      offset: 10,
      reduce: false
    }
  },
  methods: {
    searchConcerts() {
      this.offset = 10
      this.$store.dispatch('searchForLinks', { type: 'concert' })
        .then((response) => {
          this.errorMsg = ""
          this.concertsArray = response.data.data
        })
        .catch((error) => {
          this.concertsArray = undefined
          this.errorMsg = "Une erreur est survenue, recherche de concerts impossible: " + error.response.data.message
        })
    },
    emitConcertId(id) {
      if (event.target.hasAttribute('checked')) {
        this.$emit('modifyConcertId', 0)
        event.target.removeAttribute('checked')
      } else {
        let previouslySelected = event.target.parentNode.parentNode.parentNode.querySelector('[checked]')
        if (previouslySelected) {
          previouslySelected.checked = false
          previouslySelected.removeAttribute('checked')
        }
        event.target.setAttribute('checked', '')
        this.$emit('modifyConcertId', id)
      }
    },
    chargeNext() {
      this.$store.dispatch('searchForLinks', {
        type: 'concerts',
        offset: this.offset + 10
      })
        .then((response) => {
          if (this.concertsArray == response.data.data) {
            this.errorMSg = "Il n'y a pas d'autres concerts à afficher."
          } else {
            this.errorMsg = ""
            this.concertsArray = response.data.data
            this.offset += 10
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue lors de la recherche des concerts suivants: " + error.response.data.message)
    },
    chargePrevious() {
      this.$store.dispatch('searchForLinks', {
        type: 'concert',
        offset: this.offset - 10
      })
        .then((response) => {
          if (this.concertsArray == response.data.data) {
            this.errorMsg = "Il n'y a pas de concerts précédents."
          } else {
            this.errorMsg = ""
            this.concertsArray = response.data.data
            this.offset -= 10
          }
        })
        .catch((error) => this.errorMsg = "Une erreur est survenue durant la recherche de concerts précédents: " + error.response.data.message)
    },
    reduceSearch() {
      this.reduce = !this.reduce
    }
  }
}
</script>

<style lang="scss">
</style>