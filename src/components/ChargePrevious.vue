<template>
  <p><i class="fa-solid fa-circle-minus" @click.stop.prevent="chargePrevious()"></i> Charger les {{ this.type }} précédents ?</p>
</template>

<script>
export default {
  name: "ChargePrevious",
  props: {
    action: String,
    offset: Number,
    type: String
  },
  methods: {
    async chargePrevious() {
      try {
        await this.$store.dispatch(`${this.action}`, {
          offset: this.offset - 10
        })
        this.$emit('chargePrevious')
      } catch(error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>

<style lang="scss">
</style>