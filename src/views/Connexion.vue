<template>
  <div class="centered">
    <div class="card">
      <div v-if="mode == 'resetPassword'" class="mode__container">
        <h2 class="card__title">Réinitialisation du mot de passe</h2>
        <p class="card__subtitle">Recevez un mail afin de pouvoir modifier votre mot de passe.</p>
      </div>
      <div v-else-if="mode == 'login'" class="mode__container">
        <h2 class="card__title">Connexion</h2>
        <p class="card__subtitle">Vous ne possédez pas de compte ?<br/><span class="card__switch" @click.stop="switchToCreate()">Créez un compte!</span></p>
      </div>
      <div v-else-if="mode == 'create'" class="mode__container">
        <h2 class="card__title">Inscription</h2>
        <p class="card__subtitle">Vous possédez déjà un compte ?<br/><span class="card__switch" @click.stop="switchToLogin()">Se connecter avec vos identifiants</span></p>
      </div>
      <div class="logForm">
        <form>
          <input v-model.lazy="email" id="mail" type="email" placeholder="Adresse Email"/>
          <input v-if="mode != 'resetPassword'" v-model.lazy="password" id="password" type="password" placeholder="Mot de Passe"/>
          <input v-if="mode == 'create'" v-model.lazy="firstName" id="firstName" placeholder="Prénom"/>
          <input v-if="mode == 'create'" v-model.lazy="lastName" id="lastName" placeholder="Nom"/>
        </form>
      </div>
      <ButtonComp v-if="mode == 'login'" buttonText="Se Connecter" @keydown.enter.stop="login()" @click.stop="login()"/>
      <ButtonComp v-else-if="mode == 'create'" buttonText="S'enregistrer" @keydown.enter.stop="createAccount()" @click.stop="createAccount()"/>
      <ButtonComp v-else-if="mode == 'resetPassword'" buttonText="Recevoir un email" @keydown.enter.stop="resetPassword()" @click.stop="resetPassword()"/>
      <p v-if="mode != 'resetPassword'" class="card__switch">Mot de passe perdu ? <span class="card__switch" @click.stop="switchToReset()">Réinitialisez votre mot de passe!</span></p>
      <p v-else class="card__switch"><span class="card__switch" @click.stop="switchToLogin()">Se Connecter</span> | <span class="card__switch" @click.stop="switchToCreate()">S'enregistrer</span></p>
    </div>
    <p class="success" v-if="this.successMsg && !this.errorMsg">{{ successMsg }}<span v-if="this.successMsg == 'Utilisateur reconnecté'">, retourner à la <a href="./">page d'accueil</a> ?</span></p>
    <p class="error" v-else> {{ errorMsg }} </p>
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
      errorMsg: '',
      successMsg: ''
    }
  },
  created () {
    this.relogFromLocal()
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
    },
    switchToLogin() {
      this.mode = 'login'
    },
    switchToCreate() {
      this.mode = 'create'
    },
    createAccount() {
      if (mailRegex.test(this.email) && this.password && this.firstName && this.lastName) {
        this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
          .then(() => this.login())
          .catch((error) => {
            this.successMsg = ''          
            if (error.response.data.message === "User already registered") {
              this.errorMsg = "Cette adresse possède déjà un compte associé. Connectez-y  vous!"
            } else {
              this.errorMsg = error.response.data.message
            }
          })
      } else {
        this.errorMsg = "Veuillez compléter tous les champs afin de créer un compte!"
      }
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          if (response.data.message === "Connected") {
            this.errorMsg = ''
            this.successMsg = "Vous êtes connecté!"
          }
          this.$router.push('/')
        })
        .catch((error) => {
          this.successMsg = ''
          this.errorMsg = error.response.data.message
        })
    },
    resetPassword() {
      if (this.email) {
        this.$store.dispatch('sendResetEmail', {email: this.email})
          .then((response) => {
            if (response.status === 200) {
              this.errorMsg = ''
              this.successMsg = "Un email vient de vous être envoyé, cliquez sur le lien présent pour être redirigé vers la page de changement de mot de passe!"
            }
          })
          .catch((error) => {
            this.successMsg = ''
            this.errorMsg = `Une erreur est survenue, veuillez recommencer: ${error}`
          })
      }
    },
    relogFromLocal() {
      let user = localStorage.getItem('userCSBC')
      try {
        if (user) {
          user = JSON.parse(user)
          this.$store.dispatch('relogFromToken', user.token)
            .then((response) => {
              this.email = response.data.data.email
              this.firstName = response.data.data.firstName
              this.lastName = response.data.data.lastName
              this.errorMsg = ''
              this.successMsg = "Utilisateur reconnecté"
            })
            .catch((error) => {
              this.successMsg = ''
              this.errorMsg = "Reconnection impossible: " + error.response.data.message
            })
        } else {
          this.successMsg = ''
          this.errorMsg = "L'utilisateur stocké ne permet pas la reconnexion, veuillez vous reconnecter."
          throw new Error('User empty in localStorage')
        } 
      } catch(error) {
        this.$store.state.connectionStatus = 'relog_not_possible'
        localStorage.removeItem('userCSBC')
        this.successMsg = ''
        this.errorMSg = "Reconnection impossible, vérifiez le localStorage: " + error
      }
    }
  }
}

</script>

<style lang="scss">
</style>