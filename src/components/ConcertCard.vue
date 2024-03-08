<template>
  <div class="concertCard">
    <h4>{{ concert.name }}</h4>
    <div class="concertCard__imgContainer">
      <PictureComp v-if="concert.picture" :picture="concert.picture"/>
    </div>
    <div class="concertCard__infos">
      <DateComp class="concertCard__infos__date" :date="concert.date"/>
      <h5>{{ concert.type }}</h5>
      <p class="concertCard__infos__text">{{ concert.city }}</p>
      <p class="concertCard__infos__text">{{ concert.zip }}</p>
      <p class="concertCard__infos__price">{{ priceTranslated }}</p>
    </div>
  </div>
</template>

<script>
import PictureComp from '@/components/PicturePreview.vue'
import DateComp from '@/components/DateComp.vue'

export default {
  name: "ConcertCard",
  data() {
    return {
      priceTranslated: ""
    }
  },
  mounted() {
    this.priceTranslated = (parseInt(this.concert.price) / 100).toString(10) + ' €'
    if (this.priceTranslated === '0 €') {
      this.priceTranslated = 'Concert gratuit'
    }
  },
  components: {
    PictureComp,
    DateComp
  },
  props: {
    concert: Object
  },
  methods: {
  }
}


</script>

<style lang="scss">
.concertCard {
  box-sizing: border-box;
  width: 80%;
  margin: 10px;
  margin-bottom: 0;
  padding: 10px;
  border-radius: $radius-components;
  box-shadow: $shadow-components;
  @include column;

  h4 {
    font-size: 1.3em;
    margin-bottom: 5px;
  }

  &__imgContainer {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    border-image-width: 0;
    border-radius: $radius-small;
    margin-bottom: 5px;
  }

  &__infos {
    box-sizing: border-box;
    text-align: justify;
    width: 100%;
    padding: 5px;
    border-radius: $radius-controls;
    box-shadow: $shadow-controls;

    h5 {
      text-align: left;
    }

    &__date {
      text-align: center;
      font-size: 0.8em;
    }

    &__text {
      text-align: right;
      font-size: 0.8em;
    }

    &__price {
      text-align: right;
      font-size: 0.75em;
    }
  }
}
</style>