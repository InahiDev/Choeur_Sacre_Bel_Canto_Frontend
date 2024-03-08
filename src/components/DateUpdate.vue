<template>
  <div>
    <label :for="id">Entrez une nouvelle date : </label>
    <input type="datetime-local" :id="id" :name="id" @change="updateDate()"/>
  </div>
</template>

<script>
export default {
  name: 'DateUpdate',
  data() {
    return {
      
    }
  },
  props: {
    id: String,
    action: String,
  },
  emits: ['dateUpdated', 'error'],
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
    updateDate() {
      const date = document.getElementById(`${this.id}`).value
      if (date) {
        let newDate = this.parseDate(date)
        newDate.month = this.translateMonth(newDate.month)
        this.$store.dispatch(`${this.action}`, newDate)
        this.$emit('dateUpdated', newDate)
      }
    }
  }
}
</script>