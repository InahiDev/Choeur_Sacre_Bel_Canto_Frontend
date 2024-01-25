<template>
  <div class="concerts">
    <div class="container">
      <h3>Concerts passés</h3>
      <h3>Concerts à venir</h3>
    </div>
  </div>
  <AddConcert/>
  <AddFile/>
</template>

<script>
import AddFile from "@/components/AddFile.vue"
import AddConcert from "@/components/AddConcert.vue"

export default {
  name: "AdminView",
  data () {
    return {

    }
  },
  computed: {
    
  },
  components: {
    AddFile,
    AddConcert
  },
  methods: {

  },
}
</script>

<style lang="scss">
</style>