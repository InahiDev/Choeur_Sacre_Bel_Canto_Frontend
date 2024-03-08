<template>
  <option v-if="model.hasOwnProperty('name')" :value="model.id"> {{ model.name }}</option>
  <option v-if="model.hasOwnProperty('title')" :value="model.id"> {{ model.title }} </option>
</template>

<script>
export default {
  name: "FileUnitMenuLinkTo",
  data() {
    return {

    }
  },
  components: {

  },
  props: {
    model: Object
  },

}
</script>