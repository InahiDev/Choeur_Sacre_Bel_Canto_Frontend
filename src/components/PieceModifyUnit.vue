<template>
  <div>
    <p>{{ piece.title }} | {{ piece.composer }} | {{ piece.version }}<span v-if="piece.arrangement"> | {{ piece.arrangement }}</span> <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i> <DeleteElement :id="piece.id" action="deletePiece"/></p>
    <PieceModifyUnitMenu v-if="this.showControls" :piece="piece" @updated="showMenu()"/>
  </div>
</template>

<script>
import PieceModifyUnitMenu from '@/components/PieceModifyUnitMenu.vue'
import DeleteElement from '@/components/DeleteElement.vue'

export default {
  name: "PieceModifyUnit",
  data() {
    return {
      showControls: false
    }
  },
  props: {
    piece: Object,
  },
  components: {
    PieceModifyUnitMenu,
    DeleteElement
  },
  methods: {
    showMenu() {
      this.showControls = !this.showControls
    }
  }
}
</script>