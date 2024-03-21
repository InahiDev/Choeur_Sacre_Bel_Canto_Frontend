<template>
  <div class="unit unit--place">
    <div class="unit__infos unit__infos--place">
      <div class="unit__infos__text unit__infos__text--place">
        <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i>
        <span class="unit__infos__text__unit unit__infos__text__unit--place--name">{{ place.name }}<span class="tooltip tooltip--place--name">{{ place.name }}</span></span>
        | <span class="unit__infos__text__unit unit__infos__text__unit--place--city">{{ place.city }}<span class="tooltip tooltip--place--city">{{ place.city }}</span></span>
        | <span class="unit__infos__text__unit unit__infos__text__unit--place--zip">{{ place.zip }}<span class="tooltip tooltip--place--zip">{{ place.zip }}</span></span>
        <span v-if="place.type" class="unit__infos__text__unit unit__infos__text__unit--place--type"> | {{ place.type }}<span class="tooltip tooltip--place--type">{{ place.type }}</span></span>
      </div>
      <div class="unit__infos__controls unit__infos__controls--place">
        <DeleteElement :id="place.id" action="deletePlace"/>
      </div>
    </div>
    <PlaceModifyUnitMenu v-if="this.showControls" :place="place" @updated="showMenu()"/>
  </div>
</template>

<script>
import PlaceModifyUnitMenu from '@/components/PlaceModifyUnitMenu.vue'
import DeleteElement from '@/components/DeleteElement.vue'

export default {
  name: "PlaceModifyUnit",
  data() {
    return {
      showControls: false
    }
  },
  props: {
    place: Object
  },
  components: {
    PlaceModifyUnitMenu,
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
      &.unit__infos__controls--place {
        top: -11px;
        right: -11px;
      }
    }
  }
}
</style>