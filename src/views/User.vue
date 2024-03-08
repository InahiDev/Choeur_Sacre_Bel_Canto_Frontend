<template>
  <section>
    <h3>Mes informations personnelles :</h3>
    <div>
      <p>Email : {{ user.email }}</p>
      <p>Situation : {{ user.role }} </p>
      <p>Prénom : {{ user.firstName }}</p>
      <p>Nom de famille : {{ user.lastName }}</p>
    </div>
    <p><i v-if="!this.show" class="fa-solid fa-circle-plus" @click="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click="showMenu()"></i></p>
    <UserModify v-if="this.show"/>
  </section>
</template>

<script>
import UserModify from '@/components/UserModify.vue'
import { mapState } from 'vuex'

export default {
  name: "UserView",
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    UserModify
  },
  methods: {
    showMenu() {
      this.show = !this.show
    }
  }
}
</script>