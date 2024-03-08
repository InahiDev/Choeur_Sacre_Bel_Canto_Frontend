<template>
  <i class="fa-solid fa-circle-xmark" @click.stop="deleteElement()"></i>
</template>

<script>
export default {
  name: "DeleteElement",
  data() {
    return {

    }
  },
  props: {
    id: Number,
    action: String
  },
  emits: ['deleted', 'errorDeletion'],
  methods: {
    deleteElement() {
      this.$store.dispatch(`${this.action}`, this.id)
        .then(() => {
          this.$parent.$emit('deleted')
        })
        .catch((error) => {
          this.$emit('errorDeletion', error)
        })
    }
  }
}
</script>

<style lang="scss">
</style>