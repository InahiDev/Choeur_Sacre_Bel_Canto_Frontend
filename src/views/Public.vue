<template>
  <main>
    <AnnonceComp/>
    <section class="concerts">
      <h3 class="section__title--concerts">Nos concerts à venir</h3>
      <ConcertCard v-for="concert in concerts" :key="concert.id" :concert="concert"/>
    </section>
    <CommentComp/>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import AnnonceComp from '@/components/Annonce.vue'
import ConcertCard from '@/components/ConcertCard.vue'
import CommentComp from '@/components/CommentComp.vue'

export default {
  name: "PublicView",
  components: {
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
  gap: 10px;

  .concerts {
    @include column;
  }

  .section__title--concerts {
    margin: 0;
    font-size: 1.3em;
  }
}


</style>