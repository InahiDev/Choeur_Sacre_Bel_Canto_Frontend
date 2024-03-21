<template>
  <div class="link">
    <input @click.stop="setToNull()" type="checkbox" :disabled="this.linkedId === null && this.file[`${type}Id`] === null" :checked="checked" :name="type" :id="type + 'File' + file.id"/>
    <label :for="type">{{ name }}</label>
    <i v-if="!this.showMenu" class="fa-solid fa-circle-plus" @click.stop="show()"></i>
    <i v-else class="fa-solid fa-circle-minus" @click.stop="show()"></i>
    
  </div>
  <div class="controls controls--link" v-if="this.showMenu">
    <select :id="type + 'IdFile' + file.id" @change="updateLinkId()">
      <option value="previous" v-if="this.offset > 10">--Chargez les {{ name }}(s, x) précédents--</option>
      <option v-if="!linkedId" value="">--Sélectionnez un {{ name }}--</option>
      <FileUnitMenuLinkTo v-for="element of this.displayedData" v-bind:key="element.id" :model="element"/>
      <option v-if="this.linkedId" value="null">--Supprimer le lien existant--</option>
      <option value="next">-- Charger les suivants --</option>
    </select>
  </div>
</template>

<script>
import FileUnitMenuLinkTo from './FileUnitMenuLinkTo.vue';

export default {
  name: "FileUnitMenuLink",
  data() {
    return {
      showMenu: false,
      linkedId: null,
      offset: 10,
      displayedData: undefined
    }
  },
  props: {
    checked: Boolean,
    name: String,
    type: String,
    array: Array,
    file: Object,
    action: String
  },
  components: {
    FileUnitMenuLinkTo
  },
  mounted() {
    this.$store.dispatch(`${this.action}`, { offset: 10 })
      .then((response) => {
        this.displayedData = response.data.data
      })
      .catch((error) => console.log(error))
  },
  emits: ['linkedId'],
  methods: {
    show() {
      this.showMenu = !this.showMenu
    },
    updateLinkId() {
      if (event.target.value === "") {
        this.linkedId = null
      } else if (event.target.value === "next") {
        this.$store.dispatch(`${this.action}`, { offset: this.offset + 10 })
          .then((response) => {
            if (response.data.data[0].id != this.displayedData[0].id) {
              this.offset += 10
              this.displayedData = response.data.data
            }
          })
      } else if (event.target.value === "previous") {
        this.$store.dispatch(`${this.action}`, { offset: this.offset - 10 })
          .then((response) => {
            this.displayedData = response.data.data
            this.offset -= 10
          })
      } else if (event.target.value === "null") {
        this.linkedId = null
        this.$emit('linkedId', {
          id: this.linkedId,
          type: this.type
        })
      } else {
        this.linkedId = parseInt(event.target.value)
        this.$emit('linkedId', {
          id: this.linkedId,
          type: this.type
        })
      }
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
    },
  }
}
</script>

<style lang="scss">
.link {
  width: 60%;
  @include row(space-between);
}

.controls--link {
  width: 100%;

  select {
    width: 100%;
    text-align: center;
  }
}
</style>