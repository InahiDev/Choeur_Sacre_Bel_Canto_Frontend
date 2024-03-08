<template>
  <p><i class="fa-solid fa-circle-minus" @click.stop="chargePrevious()"></i> Charger les fichiers précédents?</p>
</template>

<script>
export default {
  name: "ChargePreviousResearch",
  data() {
    return {

    }
  },
  props: {
    offset: Number,
    type: String,
    value: String
  },
  methods: {
    async chargePrevious() {
      try {
        const response = await this.$store.dispatch('getSpecificFiles', {
          offset: this.offset - 10,
          type: this.type,
          value: this.value
        })
        this.$emit('chargePrevious', response)
      } catch(error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>

<style lang="scss">
</style>