<template>
  <section class="admin__section">
    <PlaceAdd @newPlace="getPlaces()"/>
    <div class="separation"></div>
    <PlaceModify ref="PlaceModify"/>
  </section>
</template>

<script>
import PlaceAdd from '@/components/PlaceAdd.vue'
import PlaceModify from '@/components/PlaceModify.vue'

export default {
  name: "AdminPlace",
  data() {
    return {
      addMenu: false,
      place: {
        city: "",
        name: "",
        zip: "",
        type: ""
      },
      errorMsg: ""
    }
  },
  components: {
    PlaceAdd,
    PlaceModify
  },
  methods: {
    getPlaces() {
      this.$refs.PlaceModify.getPlaces()
    }
  }
}
</script>

<style lang="scss">
</style>