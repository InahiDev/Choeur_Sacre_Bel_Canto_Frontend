<template>
  <AdminConcert/>
  <AdminPiece/>
  <AdminPlace/>
  <AdminFile/>
  <AdminMember/>
</template>

<script>
import AdminFile from "@/components/AdminFile.vue"
import AdminConcert from "@/components/AdminConcert.vue"
import AdminPlace from "@/components/AdminPlace.vue"
import AdminMember from '@/components/AdminMember.vue'
import AdminPiece from '@/components/AdminPiece.vue'

export default {
  name: "AdminView",
  data () {
    return {

    }
  },
  computed: {
    
  },
  components: {
    AdminFile,
    AdminConcert,
    AdminPlace,
    AdminMember,
    AdminPiece
  },
  methods: {

  },
}
</script>

<style lang="scss">
</style>