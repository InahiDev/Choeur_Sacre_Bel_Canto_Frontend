<template>
  <section>
    <PieceAdd @newPiece="getNewPiece()"/>
    <PieceModify ref="PieceModify"/>
  </section>
</template>

<script>
import PieceAdd from '@/components/PieceAdd.vue'
import PieceModify from '@/components/PieceModify.vue'

export default {
  name: "AdminPiece",
  data() {
    return {
      addMenu: false,
      piece: {
        title: "",
        composer: "",
        version: "",
        arrangement: ""
      },
      errorMsg: ""
    }
  },
  components: {
    PieceAdd,
    PieceModify
  },
  methods: {
    deployAddMenu() {
      this.addMenu = !this.addMenu
    },
    getNewPiece() {
      this.$refs.PieceModify.getPieces()
    }
  }
}
</script>

<style lang="scss">
</style>