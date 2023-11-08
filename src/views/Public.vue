<template>
  <body>
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
  </body>
  <FooterComp/>
</template>

<script>
import FooterComp from "@/components/Footer.vue"

export default {
  name: "PublicView",
  components: {
    FooterComp
  },
  data() {
    return {
      courseCanceled: false
    }
  },
  methods: {
    cancelCourse() {
      this.courseCanceled = !this.courseCanceled
    }
  }
}
</script>

<style lang="scss" scoped>
</style>