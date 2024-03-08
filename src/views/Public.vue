<template>
  <main>
    <AnnonceComp/>
    <section class="concerts">
      <ConcertCard v-for="concert in concerts" :key="concert.id" :concert="concert"/>
    </section>
    <CommentComp/>
  </main>
  <FooterComp/>
</template>

<script>
import { mapState } from 'vuex'
import FooterComp from "@/components/Footer.vue"
import AnnonceComp from '@/components/Annonce.vue'
import ConcertCard from '@/components/ConcertCard.vue'
import CommentComp from '@/components/CommentComp.vue'

export default {
  name: "PublicView",
  components: {
    FooterComp,
    AnnonceComp,
    ConcertCard,
    CommentComp
  },
  data() {
    return {
    }
  },
  beforeMount() {
    this.$store.dispatch('getFirstConcerts')
      .then()
      .catch()
  },
  computed: {
    ...mapState(['status', 'user', 'comments', 'concerts', 'pictures'])
  },
  methods: {
    cancelCourse() {
      this.courseCanceled = !this.courseCanceled
    }
  }
}
</script>

<style lang="scss">
main {
  padding: 10px;
  border-radius: 20px;
  background-color: $bg-light-grey;
  @include column;

  .concerts {
    @include column;
  }
}


</style>