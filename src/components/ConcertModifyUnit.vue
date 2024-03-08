<template>
  <div>
    <div>
      <p>{{ concert.name }} {{ concert.city }} {{ concert.date.split('T')[0] }} <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop.prevent="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop.prevent="showMenu()"></i> <DeleteElement :id="concert.id" action="deleteConcert"/></p>
      <ConcertModifyUnitMenu v-if="this.showControls" :concert="concert" @updated="showMenu()"/>
      <div v-if="concert.picture">
        <PictureComp :picture="concert.picture"/>
        <p>Supprimer la photo ? <i class="fa-solid fa-circle-xmark" @click.stop="deletePicture()"></i> </p>
      </div>
    </div>

  </div>
</template>

<script>
import ConcertModifyUnitMenu from '@/components/ConcertModifyUnitMenu.vue'
import PictureComp from '@/components/PicturePreview.vue'
import DeleteElement from '@/components/DeleteElement.vue'

export default {
  name: "ConcertModifyUnit",
  data() {
    return {
      showControls: false
    }
  },
  props: {
    concert: Object
  },
  components: {
    DeleteElement,
    PictureComp,
    ConcertModifyUnitMenu,
  },
  methods: {
    showMenu() {
      this.showControls = !this.showControls
    },
    deletePicture() {
      if (window.confirm("Confirmer la suppression de la photo:")) {
        this.$store.dispatch('deletePicture', this.concert.id)
          .then(() => {
            this.$emit('updated')
          })
          .catch((error) => console.log(error))
      }
    }
  }
}

</script>

<style lang="scss">
</style>