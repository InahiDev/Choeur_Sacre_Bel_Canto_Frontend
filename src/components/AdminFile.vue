<template>
  <section class="admin__section">
    <h3 class="admin__title">Ajouter un document : <i v-if="!this.showMenu" class="fa-solid fa-circle-plus" @click.stop="showAddMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showAddMenu()"></i></h3>
    <FileAdd v-if="this.showMenu"/>
  </section>
</template>

<script>
import FileAdd from '@/components/FileAdd.vue'

export default {
  name: "AdminFile",
  data() {
    return {
      showMenu: false,
      addMenu: false,
      file: undefined,
      fileType: '',
      placeId: 0,
      pieceId: 0,
      concertId: 0,
      addErrorMsg: ""
    }
  },
  components: {
    FileAdd
  },
  methods: {
    showAddMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss">
</style>