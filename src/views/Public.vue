<template>
  <body>
    <AnnonceComp/>
    <section class="annonce">
      <div class="repetition">
        <h3>Prochaine répétition :</h3>
        <p>Vendredi 20 Octobre 2023<br/>
        Répétition Générale<br/>
        Adresse : Chez Dominique Baechler<br/>
        Remarques : Pensez à ramener des garnitures pour les crèpes!</p>
      </div>
      <div class="cours">
        <div v-if="courseCanceled" class="courseCanceled">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Cours Annulé</p>
        </div>
        <div v-if="this.$store.role === 'Admin'" class="cancelCourse">
          <div v-if="!courseCanceled" @click="cancelCourse()">
            <i class="fa-solid fa-circle-xmark"></i>
            <p>Annuler le cours</p> 
          </div>
          <div v-else @click="cancelCourse()">
            <i class="fa-solid fa-arrow-left"></i>
            <p>Confirmer le cours</p>
          </div>
        </div>
        <h3>Prochain Cours :</h3>
        <p class="date">19 Octobre 2023</p>
        <p class="adresse">Chez Sophie</p>
        <p class="corps">Pensez à ramener des stylos!</p>
      </div>
    </section>
    <section class="concerts">
      <div class="card" v-for="(concert, idx) in concerts" :key="idx">
        <ConcertCard :concert="concert"/>
      </div>
    </section>
  </body>
  <FooterComp/>
</template>

<script>
import { mapState } from 'vuex'
import FooterComp from "@/components/Footer.vue"
import AnnonceComp from '@/components/Annonce.vue'
import ConcertCard from '@/components/Concert.vue'

export default {
  name: "PublicView",
  components: {
    FooterComp,
    AnnonceComp,
    ConcertCard,
  },
  data() {
    return {
      courseCanceled: false
    }
  },
  beforeMount() {
    this.$store.dispatch('getFirstConcerts')
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  },
  computed: {
    ...mapState(['status', 'user', 'comments', 'concerts', 'pictures'])
  },
  methods: {
    cancelCourse() {
      this.courseCanceled = !this.courseCanceled
    },
    getComments() {

    },
    getConcerts() {

    },
    
  }
}
</script>

<style lang="scss" scoped>
</style>