<template>
    <div class="unit unit--concert">
      <div class="unit__infos unit__infos--concert">
        <div class="unit__infos__text unit__infos__text--concert">
          <span class="unit__infos__text__unit unit__infos__text--concert">{{ concert.name }}</span>
          <span class="">{{ concert.city }}</span>
          <span class="">{{ concert.date.split('T')[0] }}</span>
        </div>
        <div class="unit__infos__controls unit__infos__controls--concert">
          <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop.prevent="showMenu()"></i>
          <i v-else class="fa-solid fa-circle-minus" @click.stop.prevent="showMenu()"></i>
          <DeleteElement :id="concert.id" action="deleteConcert"/>
        </div>
        </div>
      <ConcertModifyUnitMenu v-if="this.showControls" :concert="concert" @updated="showMenu()"/>
      <div class="unit__infos__picture unit__infos__picture--concert" v-if="concert.picture">
        <PictureComp :picture="concert.picture"/>
        <i class="fa-solid fa-circle-xmark" @click.stop="deletePicture()"></i>
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
.unit {
  &.unit--concert {
    @include column;
    width: 90%;
    padding: 10px;
    border-radius: $radius-controls;
    gap: 5px;
  }

  &__infos {
    &__text {
      &.unit__infos__text--concert {
        @include column;
        gap: 0;
      }
    }

    &__controls {
      &.unit__infos__controls--concert {
        width: 23%;
        top: -15px;
        right: -15px;
      }
    }

    &__picture {
      position: relative;
      width: 100%;
      
      img {
        width: 100%;
        object-fit: contain;
      }

      i {
        position: absolute;
        font-size: 1.2em;
        top: -3px;
        right: -3px;
      }
    }
  }
}
</style>