<template>
  <section>
    <ConcertAdd @newConcert="getNewConcert"/>
    <ConcertModify ref="ConcertModify"/>
  </section>
</template>

<script>
import ConcertAdd from '@/components/ConcertAdd.vue'
import ConcertModify from '@/components/ConcertModify.vue'

export default {
  name: "AdminConcert",
  data() {
    return {
    }
  },
  components: {
    ConcertAdd,
    ConcertModify,
  },
  methods: {
    getNewConcert() {
      this.$refs.ConcertModify.getConcerts()
    }
  }
}
</script>


<style lang="scss">
</style>