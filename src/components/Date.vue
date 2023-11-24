<template>
  <div class="affichage">
    <p>Le {{ day }}/{{ month }}/{{ year }} à {{ hour }}:{{ minute }} </p>
  </div>
  <div class="modification" v-if="user.role == 'Admin'">
    <p>Modifier la date ?</p>
    <label for="date">Nouvelle date: </label>
    <input type="datetime-local" name="date" id="date" v-model="newDate"/>
    <ButtonComp buttonText="Valider" @keydown.enter.stop="updateDate(this.newDate)" @click.stop="updateDate(this.newDate)"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonComp from '@/components/Button.vue'

export default {
  name: "DateComp",
  data() {
    return {
      newDate: undefined
    }
  },
  props: {
    hour: String,
    minute: String,
    day: String,
    month: String,
    year: String
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
    }
  }
}
</script>

<style lang="scss">
</style>