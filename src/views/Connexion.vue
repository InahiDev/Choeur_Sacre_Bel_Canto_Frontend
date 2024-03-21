<template>
  <main>
    <section class="connexion">
      <div v-if="mode == 'resetPassword'" class="connexion__mode connexion__mode--reset">
        <h2>Réinitialisation</h2>
        <p>Recevez un mail afin de pouvoir modifier votre mot de passe.</p>
      </div>
      <div v-else-if="mode == 'login'" class="connexion__mode connexion__mode--login">
        <h2>Connexion</h2>
        <p class="connexion__mode__switch">Vous ne possédez pas de compte ?<span class="connexion__mode__switch__link" @click.stop="switchToCreate()">Créez un compte!</span></p>
      </div>
      <div v-else-if="mode == 'create'" class="connexion__mode connexion__mode--create">
        <h2>Inscription</h2>
        <p class="connexion__mode__switch">Vous possédez déjà un compte ?<span class="connexion__mode__switch__link" @click.stop="switchToLogin()">Se connecter avec vos identifiants</span></p>
      </div>
        <form class="connexion__form">
          <label for="email">Adresse email</label>
          <input v-model.lazy="email" id="email" type="email" placeholder="Adresse Email"/>
          <label for="password" v-if="mode != 'resetPassword'">Mot de passe</label>
          <input v-if="mode != 'resetPassword'" v-model.lazy="password" id="password" type="password" placeholder="Mot de Passe"/>
          <label for="firstName" v-if="mode == 'create'">Prénom</label>
          <input v-if="mode == 'create'" v-model.lazy="firstName" id="firstName" placeholder="Prénom"/>
          <label for="lastName" v-if="mode == 'create'">Nom de famille</label>
          <input v-if="mode == 'create'" v-model.lazy="lastName" id="lastName" placeholder="Nom"/>
        </form>
      <ButtonComp v-if="mode == 'login'" text="Se Connecter" @keydown.enter.stop="login()" @click.stop="login()" class="connexion__button connexion__button--login"/>
      <ButtonComp v-else-if="mode == 'create'" text="S'enregistrer" @keydown.enter.stop="createAccount()" @click.stop="createAccount()" class="connexion__button connexion__button--create"/>
      <ButtonComp v-else-if="mode == 'resetPassword'" text="Recevoir un email" @keydown.enter.stop="resetPassword()" @click.stop="resetPassword()" class="connexion__button connexion__button--reset"/>
      <p v-if="mode != 'resetPassword'" class="connexion__mode__switch">Mot de passe perdu ? <span class="connexion__mode__switch__link" @click.stop="switchToReset()">Réinitialisez votre mot de passe!</span></p>
      <p v-else class="connexion__mode__switch"><span class="connexion__mode__switch__link connexion__mode__switch__link--rtl" @click.stop="switchToLogin()">Se Connecter</span> | <span class="connexion__mode__switch__link connexion__mode__switch__link--rtc" @click.stop="switchToCreate()">S'enregistrer</span></p>
    </section>
    <p class="" v-if="this.successMsg && !this.errorMsg">{{ successMsg }}<span v-if="this.successMsg == 'Utilisateur reconnecté'">, retourner à la <a href="./">page d'accueil</a> ?</span></p>
    <p class="" v-else> {{ errorMsg }} </p>
  </main>
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
    ...mapState(['status', 'user', 'tokenValid'])
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
      this.errorMsg = ''
      this.successMsg = ''
    },
    switchToLogin() {
      this.mode = 'login'
      this.errorMsg = ''
      this.successMsg = ''
    },
    switchToCreate() {
      this.mode = 'create'
      this.errorMsg = ''
      this.successMsg = ''
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
      if (this.email && this.password) {
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
      } else {
        this.successMsg = ''
        this.errorMsg = "Veuillez remplir les champs email et password pour vous connecter."
      }
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
      let userToken = localStorage.getItem('userCSBC')
      try {
        if (userToken) {
          userToken = JSON.parse(userToken)
          this.$store.dispatch('relogFromToken', {
            token: userToken,
            validity: this.$store.state.tokenValid
          })
            .then((response) => {
              if (response === 'unvalidToken') {
                this.succesMsg = ""
                this.errorMsg = "Reconnection impossible."

              } else {
                this.errorMsg = ''
                this.successMsg = "Utilisateur reconnecté"
              }
            })
            .catch((error) => {
              this.successMsg = ''
              this.errorMsg = "Reconnection impossible: " + error.response?.data?.message
            })
        } else {
          this.successMsg = ''
          this.errorMsg = "L'utilisateur stocké ne permet pas la reconnexion, veuillez vous reconnecter."
          throw new Error('User empty in localStorage')
        } 
      } catch(error) {
        this.$store.state.tokenValid = false
        localStorage.removeItem('userCSBC')
        this.successMsg = ''
        this.errorMSg = "Reconnection impossible, vérifiez le localStorage: " + error.response?.data?.message
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.connexion {
  box-sizing: border-box;
  width: 95%;
  
  h2 {
    font-size: 1.6em;
  }


  &__mode {
    @include column;
    gap: 10px;
    width: 100%;

    &__switch {
      width: 100%;

      &__link {
        display: inline-block;
        text-decoration: underline;
        cursor: pointer;
        width: 100%;

        &--rtc, &--rtl {
          width: 40%;
        }
      }
    }
  }

  &__form {
    width: 100%;
    @include column;
    gap: 10px;

    label {
      font-size: 1.1em;
    }

    input {
      padding: 5px 10px;
      border-radius: $radius-controls;

      &::placeholder {
        font-family: "Madimi One", Avenir, Helvetica, Arial, sans-serif;
      }
    }
  }

  &__button {
    width: 65%;
    padding: 5px;
    background-color: $bg-dark-blue;
    color: #FFF;

    &--reset {
      width: 80%;
    }
  }
}
</style>