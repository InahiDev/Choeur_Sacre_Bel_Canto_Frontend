<template>
  <div class="subsection">
    <h3>Prochaine répétition : </h3>
    <p class="next">Le {{ nextRepetition.day }} {{ nextRepetition.month }} à {{ nextRepetition.hour }}:{{ nextRepetition.minute }}</p>
    <div class="parent">
      <div v-if="this.status === 'private' && this.user.role !== 'None' ">
        <p class="next__static">Adresse :</p>
        <p class="next__dynamic">{{ this.repetitionPlace.address }} à {{ this.repetitionPlace.city }}.</p>
        <p class="next__static">Personne à contacter :</p>
        <p class="next__dynamic">{{ this.repetitionPlace.contact }}</p>
      </div>
      <p v-if="this.user.role === 'Admin'"><span v-if="!this.repetitionCanceled">Annuler</span><span v-else>Confirmer</span> la répétition <i v-if="!this.repetitionCanceled" class="fa-solid fa-circle-xmark" @click.stop="cancelRepetition()"></i><i v-else class="fa-solid fa-arrow-left" @click.stop="cancelRepetition()"></i> <i class="fa-solid fa-circle-plus" v-if="!this.showControls" @click.stop="showModify()"></i><i class="fa-solid fa-circle-minus" v-else @click.stop="showModify()"></i></p>
      <p v-if="this.repetitionCanceled">Attention, répétition annulée! <i class="fa-solid fa-triangle-exclamation"></i></p>
      <div v-if="this.user.role === 'Admin' && this.showControls" class="controls">
        <label for="repetitionPlaceAddress">Changer l'adresse : </label>
        <input :placeholder="this.repetitionPlace.address" type="text" id="repetitionPlaceAddress" name="repetitionPlaceAddress" @change="updateRepetitionPlace()" v-model.lazy="place.address"/><br/>
        <label for="repetitionPlaceCity">Ville : </label>
        <input :placeholder="this.repetitionPlace.city" type="text" id="repetitionPlaceCity" name="repetitionPlaceCity" @change="updateRepetitionPlace()" v-model.lazy="place.city"/><br/>
        <label for="repetitionPlaceContact">Personne à contacter : </label>
        <input :placeholder="this.repetitionPlace.contact" type="text" id="repetitionPlaceContact" name="repetitionPlaceContact" @change="updateRepetitionPlace()" v-model.lazy="place.contact"/>
        <DateUpdate v-if="this.showControls && this.user.role === 'Admin'" id="newRepetitionDate" action="updateRepetitionDate"/>
      </div>
    </div>
  </div>
</template>

<script>
import DateUpdate from '@/components/DateUpdate.vue'
import { mapState } from 'vuex'

export default {
  name: "RepetitionComp",
  data() {
    return {
      showControls: false,
      showPlace: false,
      repetitionCanceled: false,
      place: {
        address: "",
        city: "",
        contact: ""
      },
      dateToString: ""
    }
  },
  components: {
    DateUpdate
  },
  computed: {
    ...mapState(['user', 'status', 'nextRepetition', 'repetitionPlace', 'isRepetitionCanceled'])
  },
  mounted() {
    this.repetitionCanceled = this.isRepetitionCanceled
    this.dateToString = this.nextRepetition.year + "-" + this.nextRepetition.month + "-" + this.nextRepetition.day + "T" + this.nextRepetition.hour + ":" + this.nextRepetition.minute + ".000Z"
  },
  methods: {
    showModify() {
      this.showControls = !this.showControls
    },
    hidePlace() {
      this.showPlace = !this.showPlace
    },
    cancelRepetition() {
      this.$store.dispatch('updateRepetitionStatus', !this.repetitionCanceled)
        .then((boolean) => {
          this.repetitionCanceled = boolean
        })
    },
    updateRepetitionPlace() {
      if (this.place.address || this.place.city || this.place.contact) {
        let updatedPlace = {
          address: this.place.address,
          city: this.place.city,
          contact: this.place.contact
        }
        for (let property in updatedPlace) {
          if (!updatedPlace[property]) {
            updatedPlace[property] = this.repetitionPlace[property]
          }
        }
        this.$store.dispatch('updateRepetitionPlace', updatedPlace)
        this.dateToString = this.nextRepetition.year + "-" + this.nextRepetition.month + "-" + this.nextRepetition.day + "T" + this.nextRepetition.hour + ":" + this.nextRepetition.minute + ".000Z"
      }
    }
  }
}
</script>

<style lang="scss">
h3 {
  margin-bottom: 8px;
  font-size: 1.2em;
}

.parent {
  position: relative;

  .controls {
    box-sizing: border-box;
    position: absolute;
    background-color: $bg-white;
    width: 100%;
    padding: 10px;
    border-radius: $radius-controls;
    box-shadow: $shadow-controls;
    z-index: 1;
  }
}
</style>