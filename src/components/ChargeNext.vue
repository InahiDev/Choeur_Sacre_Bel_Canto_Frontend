<template>
  <p @click.stop.prevent="chargeNext()"><i class="fa-solid fa-circle-plus"></i> Charger les {{ this.name }} suivants ?</p>
</template>

<script>
export default {
  name: "ChargeNext",
  props: {
    action: String,
    offset: Number,
    name: String
  },
  methods: {
    async chargeNext() {
      try {
        const response = await this.$store.dispatch(`${this.action}`, {
          offset: this.offset + 10
        })
        this.$emit('chargeNext', response)
      } catch(error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>

<style lang="scss">
</style>