<template>
  <div class="affichage">
    <p>Le {{ date.day }}/{{ date.month }}/{{ date.year }} à {{ date.hour }}:{{ date.minute }} </p>
  </div>
  <div class="modification" v-if="user.role == 'Admin'">
    <p>Modifier la date ? <i class="fa-solid fa-circle-plus" v-if="toggleChange" @click.stop.prevent="changeVisibility"></i><i v-else @click.stop.prevent="changeVisibility" class="fa-solid fa-circle-minus"></i></p>
    <div v-if="!toggleChange">
      <label for="date">Nouvelle date: </label>
      <input type="datetime-local" name="date" id="date" v-model="newDate"/>
      <ButtonComp buttonText="Valider" @keydown.enter.stop="updateDate(this.newDate)" @click.stop="updateDate(this.newDate)"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonComp from '@/components/Button.vue'

export default {
  name: "DateComp",
  data() {
    return {
      newDate: undefined,
      toggleChange: true
    }
  },
  props: {
    date: {
      hour: String,
      minute: String,
      day: String,
      month: String,
      year: String
    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  components: {
    ButtonComp
  },
  methods: {
    updateDate(date) {
      this.$emit('updateDate', date)
    },
    changeVisibility() {
      if (this.toggleChange == true) {
        this.toggleChange = false
      } else {
        this.toggleChange = true
      }
    }
  }
}
</script>

<style lang="scss">
</style>