<template>
  <div>
    <p>Le {{ parsedDate.day }} {{ parsedDate.month }} à {{ parsedDate.hour }}:{{ parsedDate.minute }}</p>
  </div>
</template>

<script>
export default {
  name: "DateComp",
  data() {
    return {
      parsedDate: {},
      show: false
    }
  },
  props: {
    date: String,
  },
  mounted() {
    this.parsedDate = this.parseDate(this.date)
    this.parsedDate.month = this.translateMonth(this.parsedDate.month)
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
    translateMonth(month) {
      let translatedMonth = ""
      switch (month) {
        case '01':
          translatedMonth = 'Janvier'
          break
        case '02':
          translatedMonth = 'Février'
          break
        case '03':
          translatedMonth =  'Mars'
          break
        case '04':
          translatedMonth =  'Avril'
          break
        case '05':
          translatedMonth =  'Mai'
          break
        case '06':
          translatedMonth =  'Juin'
          break
        case '07':
          translatedMonth =  'Juillet'
          break
        case '08':
          translatedMonth =  'Août'
          break
        case '09':
          translatedMonth =  'Septembre'
          break
        case '10':
          translatedMonth =  'Octobre'
          break
        case '11':
          translatedMonth =  'Novembre'
          break
        case '12':
          translatedMonth =  'Décembre'
          break
        default:
          translatedMonth =  'Mois inconnu'
      }
      return translatedMonth
    },
  }
}
</script>

<style lang="scss">
</style>