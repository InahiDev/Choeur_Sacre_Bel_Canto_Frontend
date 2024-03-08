<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  name: "ButtonComp",
  props: {
    text: String,
  }
}
</script>

<style lang="scss">
button {
  width: 100%;
  height: 100%;
  border-radius: 20px / 50%;
  background-color: #232323;
  color: #FFF;
  font-size: 1.3rem;
  border: none;
  box-shadow: 2px 2px 5px 2px #858585
}
</style>