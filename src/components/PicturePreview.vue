<template>
  <img class="picture" :src="picture.path" :alt="picture.alt"/>
</template>

<script>
export default {
  name: "PictureComp",
  props: {
    picture: {
      path: String,
      alt: String,
      concertId: Number,
      pieceId: Number,
      placeId: Number
    }
  }
}

</script>

<style lang="scss">
</style>