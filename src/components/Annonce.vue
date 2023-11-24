<template>
  <section class="annonce">
    <div class="repetition">
      <h3>Prochaine répétition</h3>
      <DateComp @updateDate="updateRepetitionDate" :day="nextRepetition.day" :month="nextRepetition.month" :year="nextRepetition.year" :hour="nextRepetition.hour" :minute="nextRepetition.minute"/>
    </div>
  </section>
</template>

<script>
import DateComp from '@/components/Date.vue'
import { mapState } from 'vuex'
//const date = /^20[0-9]{2}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z$/

export default {
  name: "AnnonceView",
  data() {
    return {
      newDate: "",
    }
  },
  computed: {
    ...mapState(['nextRepetition'])
  },
  methods: {
    parseDate(date) {
      if (date) {
        let newDate = {
          year: date.split('T')[0].split('-')[0],
          month: date.split('T')[0].split('-')[1],
          day: date.split('T')[0].split('-')[2],
          hour: date.split('T')[1].split(':')[0],
          minute: date.split('T')[1].split(':')[1]
        }
        return newDate
      } else {
        return undefined
      }
    },
    updateRepetitionDate(date) {
      if (date) {
        this.$store.dispatch('updateRepetitionDate', date)
      }
    }
  },
  components: {
    DateComp
  }
}
</script>

<style lang="scss">
</style>