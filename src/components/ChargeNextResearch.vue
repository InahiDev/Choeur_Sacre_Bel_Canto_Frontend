<template>
  <p><i class="fa-solid fa-circle-plus" @click.stop="chargeNext()"></i> Charger les fichiers suivants ?</p>
</template>

<script>
export default {
  name: "ChargeNextResearch",
  props: {
    offset: Number,
    type: String,
    value: String
  },
  methods: {
    async chargeNext() {
      try {
        const response = await this.$store.dispatch('getSpecificFiles', {
          offset: this.offset + 10,
          type: this.type,
          value: this.value
        })
        this.$emit('chargeNext', response)
      } catch(error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>

<style lang="scss"></style>