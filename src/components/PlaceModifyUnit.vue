<template>
  <div>
    <p> {{ place.name }} | {{ place.city }} | {{ place.zip }}<span v-if="place.type"> | {{ place.type }}</span> <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i> <DeleteElement :id="place.id" action="deletePlace"/></p>
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