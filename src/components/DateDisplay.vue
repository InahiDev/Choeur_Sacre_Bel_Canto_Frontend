<template>
  <p>Le {{ parsedDate.day }} {{ parsedDate.month }} à {{ parsedDate.hour }}:{{ parsedDate.minute }}</p>
</template>

<script>
export default {
  name: 'DateDisplay',
  data() {
    return {
      parsedDate: {
        day: "",
        month: "",
        hour: "",
        minute: ""
      }
    }
  },
  props: {
    dateObject: Object,
    dateString: String
  },
  mounted() {
    if (!this.dateObject && this.dateString) {
      this.parseDate.day = this.dateString.split('T')[0].split('-')[2]
      this.parseDate.month = this.dateString.split('T')[0].split('-')[1]
      this.parseDate.hour = this.dateString.split('T')[1].split(':')[0]
      this.parseDate.minute = this.dateString.split('T')[1].split(':')[1].split('.')[0]
    } else {
      this.parseDate = this.dateObject
    }
  }
}
</script>

<style lang="scss">

</style>