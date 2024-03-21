<template>
  <div class="unit unit--piece">
    <div class="unit__infos unit__infos--piece">
      <div class="unit__infos__text unit__infos__text--piece">
        <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i>
        <span class="unit__infos__text__unit unit__infos__text__unit--piece--title">{{ piece.title }}<span class="tooltip tooltip--piece--title">{{ piece.title }}</span></span>
         | <span class="unit__infos__text__unit unit__infos__text__unit--piece--composer">{{ piece.composer }}<span class="tooltip tooltip--piece--composer">{{ piece.composer }}</span></span>
         | <span class="unit__infos__text__unit unit__infos__text__unit--piece--version ">{{ piece.version }}<span class="tooltip tooltip--piece--version">{{ piece.version }}</span></span>
        <span v-if="piece.arrangement" class="unit__infos__text__unit unit__infos__text__unit--piece--arrangement"> | {{ piece.arrangement }}<span class="tooltip tooltip--piece--arrangement">{{ piece.arrangement }}</span></span>
      </div>
      <div class="unit__infos__controls unit__infos__controls--piece"> 
        <DeleteElement class="unit__infos__controls__delete unit__infos__controls__delete--piece" :id="piece.id" action="deletePiece"/>
      </div>
    </div>
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

<style lang="scss">
.unit {
  &__infos {
    &__controls {
      &.unit__infos__controls--piece {
        top: -11px;
        right: -11px;
      }
    }
  } 
}
</style>