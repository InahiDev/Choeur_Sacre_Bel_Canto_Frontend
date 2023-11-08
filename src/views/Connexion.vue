<template>
  <div class="centered">
    <div class="card">
      <div v-if="mode == 'resetPassword'" class="mode__container">
        <h2 class="card__title">Réinitialisation du mot de passe</h2>
        <p class="card__subtitle">Recevez un mail afin de pouvoir modifier votre mot de passe.</p>
      </div>
      <div v-else-if="mode == 'login'" class="mode__container">
        <h2 class="card__title">Connexion</h2>
        <p class="card__subtitle">Vous ne possédez pas de compte ?<br/><span class="card__switch" @click="switchToCreate()">Créez un compte!</span></p>
      </div>
      <div v-else-if="mode == 'create'" class="mode__container">
        <h2 class="card__title">Inscription</h2>
        <p class="card__subtitle">Vous possédez déjà un compte ?<br/><span class="card__switch" @click="switchToLogin()">Se connecter avec vos identifiants</span></p>
      </div>
      <div class="logForm">
        <form>
          <input v-model.lazy="email" id="mail" type="email" placeholder="Adresse Email"/>
          <input v-if="mode != 'resetPassword'" v-model.lazy="password" id="password" type="password" placeholder="Mot de Passe"/>
          <input v-if="mode == 'create'" v-model.lazy="firstName" id="firstName" placeholder="Prénom"/>
          <input v-if="mode == 'create'" v-model.lazy="lastName" id="lastName" placeholder="Nom"/>
        </form>
      </div>
      <ButtonComp v-if="mode == 'login'" buttonText="Se Connecter" @click="login()"/>
      <ButtonComp v-else-if="mode == 'create'" buttonText="S'enregistrer" @click="createAccount()"/>
      <ButtonComp v-else-if="mode == 'resetPassword'" buttonText="Réinitialiser" @click="resetPassword()"/>
      <p v-if="mode != 'resetPassword'" class="card__switch">Mot de passe perdu ?<span class="card__switch" @click="switchToReset()">Réinitialisez votre mot de passe!</span></p>
      <p v-else class="card__switch"><span class="card__switch" @click="switchToLogin()">Se Connecter</span> | <span class="card__switch" @click="switchToCreate()">S'enregistrer</span></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonComp from '@/components/Button.vue'
const mailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/

export default {
  name: "ConnexionView",
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      errorMsg: ''
    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  components: {
    ButtonComp
  },
  methods: {
    enableFormButton() {
      if (mailRegex.test(this.email) && this.password != '') {
        return true
      } else {
        return false
      }
    },
    switchToReset() {
      this.mode = 'resetPassword'
      this.$store.state.status = ''
    },
    switchToLogin() {
      this.mode = 'login'
      this.$store.state.status = ''
    },
    switchToCreate() {
      this.mode = 'create'
      this.$store.state.status = ''
    },
    createAccount() {
      this.$store.dispatch('createAccount', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })
        .then(() => this.login())
        .catch((error) => {
          console.log(error)
          this.errorMsg = error.response.data.message
        })
    },
    login() {
      console.log("Click reçu")
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          console.log("Utilisateur connecté")
          //this.$router.push('home')
        })
        .catch((error) => {
          console.log(error)
          this.errorMsg = error.response.data.message
        })
    },
    resetPassword() {
      console.log('resetPassword route en cours de construction')
    }
  }
}
</script>

<style lang="scss">
</style>