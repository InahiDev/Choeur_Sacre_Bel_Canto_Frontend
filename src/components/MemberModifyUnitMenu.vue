<template>
  <div>
    <form :id="'member' + member.id">
      <p>{{member.email}}</p>
      <label for="firstName">Prénom : </label>
      <input name="firstName" type="text" :id="'memberFirstName' + member.id" :placeholder="member.firstName" @change="updateFirstName(member.id)"/><br/>
      <label for="lastName">Nom de famille : </label>
      <input name="lastName" type="text" :id="'memberLastName' + member.id" :placeholder="member.lastName" @change="updateLastName(member.id)"/><br/>
      <label for="role">Niveau d'autorisation : </label>
      <select name="role" :id="'memberRole' + member.id" :placeholder="member.role" @change="updateRole(member.id)">
        <option value="">-- Sélectionnez un rôle --</option>
        <option value="None">Aucun rôle</option>
        <option value="Elève">Elève</option>
        <option value="Choriste">Choriste</option>
        <option value="Admin">Administrateur</option>
      </select><br/>
      <input type="submit" value="Mettre à jour" @click.stop.prevent="modifyMember()" :disabled="!this.updateReady"/>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "MemberModifyUnitMenu",
  data() {
    return {
      updateReady: false,
      errorMsg: "",
      updateMember: {
        firstName: "",
        lastName: "",
        role: ""
      }
    }
  },
  props: {
    member: Object
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    disableUpdate() {
      if (this.updateMember.firstName
      || this.updateMember.lastName
      || this.updateMember.role) {
        this.updateReady = true
      } else {
        this.updateReady = false
      }
    },
    updateFirstName(id) {
      this.updateMember.firstName = document.querySelector(`#memberFirstName${id}`).value
      this.disableUpdate()
    },
    updateLastName(id) {
      this.updateMember.lastName = document.querySelector(`#memberLastName${id}`).value
      this.disableUpdate()
    },
    updateRole(id) {
      this.updateMember.role = document.querySelector(`#memberRole${id}`).value
      this.disableUpdate()
    },
    fillUpdateObject() {
      for (let prop in this.updateMember) {
        if (!this.updateMember[prop]) {
          this.updateMember[prop] = this.member[prop]
        }
      }
    },
    dispatchAction() {
      this.$store.dispatch('modifyMember', {
        member: this.updateMember,
        id: this.member.id
      })
        .then(() => {
          this.errorMsg = ""
          this.$emit('updated')
          this.$parent.$emit('updated')
        })
        .catch((error) => {
          this.errorMsg = "Une erreur est survenue: " + error.response?.data?.message
        })
    },
    update() {
      this.fillUpdateObject()
      this.dispatchAction()
    },
    modifyMember() {
      if (this.updateReady) {
        if (!this.updateMember.role || this.updateMember.role === this.member.role) {
          this.update()
        } else {
          if (this.member.role === "Admin" && this.updateMember.role && this.updateMember.role !== "Admin") {
            if (this.member.id === this.user.id) {
              if (window.confirm(`Vous êtes sur le point de vous enlever vos droits d'administrateur pour le compte ${this.user.email}. Confirmez-vous?`)) {
                this.update()
              } else {
                this.$emit('updated')
              }
            } else {
              if (window.confirm(`Vous allez rétrograder ${this.member.fullName} au rang de ${this.updateMember.role}. Confirmez-vous?`)) {
                this.update()
              } else {
                this.$emit('updated')
              }
            }
          } else {
            if (window.confirm(`Vous allez changer le grade de ${this.member.fullName} de ${this.member.role} à ${this.updateMember.role}. Confirmez-vous?`)) {
              this.update()
            } else {
              this.$emit('updated')
            }
          }
        }
      }
    }
  }
}
</script>