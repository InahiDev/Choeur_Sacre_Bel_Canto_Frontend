<template>
  <div class="card">
    <h4>{{ concert.name }}</h4>
    <div class="infos">
      <h5 class="type">{{ concert.type }}</h5>
      <DateComp :date="concert.date"/>
      <p class="city">{{ concert.city }}</p>
      <p class="zip">{{ concert.zip }}</p>
      <p class="price"> {{ concert.price }} </p>
      <p class="error">{{ errorMsg }}</p>
      <PictureComp v-if="concert.picture" :picture="concert.picture"/>
    </div>
  </div>
</template>

<script>
import PictureComp from '@/components/PicturePreview.vue'

const fullDateFormat = /^20[0-9]{2}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z$/
const dateFormat = /^20\d{2}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d$/

export default {
  name: "ConcertCard",
  data() {
    return {
      errorMsg: ''
    }
  },
  components: {
    PictureComp
  },
  props: {
    concert: {
      name: String,
      type: String,
      city: String,
      zip: Number,
      price: String,
    }
  },
  methods: {
    formatDate(date) {
      if (fullDateFormat.test(date)) {
        let formatedDate = date.split('.')[0]
        return formatedDate
      } else if (dateFormat.test(date)) {
        return date
      } else {
        this.errorMsg = "Mauvais format de date fourni"
        return undefined
      }
    },
  }
}


</script>

<style lang="scss">
</style>