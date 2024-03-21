<template>
  <section class="admin__section">
    <ConcertAdd @newConcert="getNewConcert"/>
    <div class="separation"></div>
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
.admin {
  &__section {
    gap: 10px;
  }
}

.separation {
  background-color: $color-secondary;
  width: 100%;
  height: 1px;
}
</style>