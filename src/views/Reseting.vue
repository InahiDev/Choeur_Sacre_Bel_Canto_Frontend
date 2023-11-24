<template>
  <div class="card">
    <div class="mode__container">
      <form>
        <label for="password">Nouveau mot de passe :</label>
        <input type="password" name="password" id="newPassword" v-model.lazy="newPassword" placeholder="Entrez votre nouveau mot de passe"/>
        <label for="verification">Confirmez votre nouveau mot de passe</label>
        <input type="password" name="verification" id="verification" v-model.lazy="verification" placeholder="Confirmez votre nouveau mot de passe"/>
        <ButtonComp buttonText="Changez le mot de passe" @click.prevent.stop="changePassword()" @keydown.enter.prevent.stop="changePassword()"/>
      </form>
      <div v-if="this.errorMsg && !this.succesMsg" class="error">
        <p>{{ errorMsg }}</p>
      </div>
      <div v-if="this.succesMsg && !this.errorMsg" class="success">
        <p>{{ succesMsg }}</p>
      </div>
      <div class="router">
        <p><a href="./connexion">Retourner à la page de connexion</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonComp from '@/components/Button.vue'

export default {
  name: "ResetingView",
  data() {
    return {
      mode: 'resetPassword',
      newPassword: '',
      verification: '',
      userId: '',
      resetToken: '',
      errorMsg: '',
      succesMsg: ''
    }
  },
  computed: {
    ...mapState(['status', 'user'])
  },
  components: {
    ButtonComp
  },
  methods: {
    changePassword() {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      this.token = urlParams.get('token')
      this.userId = urlParams.get('id')
      if (this.newPassword && this.token && this.userId && this.newPassword === this.verification) {
        const payload = {
          password: this.newPassword,
          token: this.token,
          userId: this.userId
        }
        this.$store.dispatch('changePassword', payload)
          .then((response) => {
            if (response.status === 200) {
              this.errorMsg = ''
              this.succesMsg = "Mot de passe réinitialisé, vous serez redirigé vers la page de conexion dans 5 secondes."
              setTimeout(() => this.$router.push('/connexion'), 5000)
              
            }
          })
          .catch((error) => {
            this.successMsg = ''
            if (error.name === "TokenExpiredError") {
              this.errorMsg = "Temps écoulé, veuillez recommencer l'opération."
            } else if (error.response.data.message === "Need a stronger password, check the rules for it!") {
              this.errorMsg = "Veuillez entrer un mot de passe plus fort. Vérifiez les règles concernant les mots de passe."
            } else {
              this.errorMsg = `La requête a échouée: ${error}`
            }
          })
      } else {
        this.succesMsg = ''
        this.errorMsg = "Veuillez entrer le même mot de passe dans les deux champs"
      }
    }
  }
}
//ACorr3ctP4ssw0rd
</script>


<style lang="scss">

</style>