<template>
  <div>
    <input @click.stop="setToNull()" type="checkbox" :disabled="this.linkedId === null && this.file[`${type}Id`] === null" :checked="checked" :name="type" :id="type + 'File' + file.id"/>
    <label :for="type">{{ name }}</label>
    <i v-if="!this.showMenu" class="fa-solid fa-circle-plus" @click.stop="show()"></i>
    <i v-else class="fa-solid fa-circle-minus" @click.stop="show()"></i>
    <div v-if="this.showMenu">
      <select :id="type + 'IdFile' + file.id" @change="updateLinkId()">
        <option value="">--Sélectionnez un {{ name }}--</option>
        <FileUnitMenuLinkTo v-for="element of array" v-bind:key="element.id" :model="element"/>
      </select>
    </div>
  </div>
</template>

<script>
import FileUnitMenuLinkTo from './FileUnitMenuLinkTo.vue';

export default {
  name: "FileUnitMenuLink",
  data() {
    return {
      showMenu: false,
      linkedId: null
    }
  },
  props: {
    checked: Boolean,
    name: String,
    type: String,
    array: Array,
    file: Object
  },
  components: {
    FileUnitMenuLinkTo
  },
  emits: ['linkedId'],
  methods: {
    show() {
      this.showMenu = !this.showMenu
    },
    updateLinkId() {
      if (event.target.value === "") {
        this.linkedId = null
      } else {
        this.linkedId = parseInt(event.target.value)
      }
      this.$emit('linkedId', {
        id: this.linkedId,
        type: this.type
      })
    },
    setToNull() {
      if (!event.target.checked) {
        if (this.showMenu) {
          const select = document.getElementById(`${this.type}IdFile${this.file.id}`)
          select.options[0].selected = 'selected'
        }
        this.linkedId = null
        this.$emit('linkedId', {
          id: null,
          type: this.type
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>