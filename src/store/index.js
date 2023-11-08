import { createStore } from 'vuex'

const axios = require('axios')
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

let user = localStorage.getItem('userCSBC')
let status = ''
async function relogFromToken() {
  if (!user) {
    user = {
      role: "Public",
      token: '',
      email: undefined,
      firstName: "",
      lastName: "",
      userId: ""
    }
  } else {
    try {
      user = JSON.parse(user)
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
      await instance.get('/auth/relog')
        .then((response) => {
          console.log("User reloged")
          status = 'logedIn'
          user = {
            role: response.data.role,
            email: response.data.emaiil,
            fullName: response.data.fullName,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            id: response.data.id,
            token: response.data.token
          }
        })
        .catch((error) => {
          status = 'error_relog'
          console.log('wrong token, relog failed', error)
        })
    } catch(e) {
      user = {
        role: "Public",
        token: "",
        email: undefined,
        firstName: "",
        lastName: "",
        id: ""
      }
      console.log("User not usable", e)
    }
  }
}

relogFromToken()



export default createStore({
  state: {
    status: status,
    user: {
      role: user.role,
      token: user.token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    },
    comments: undefined,
    concerts: undefined,
    files: undefined,
    pictures: undefined,
  },
  getters: {
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    },
    LOG(state, data) {
      state.user = {
        role: data.role,
        token: data.token,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id
      }
      localStorage.setItem('userCSBC', JSON.stringify(state.user))
      instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },

    // REGISTER_EMAIL(state, email) {
    //   state.user.email = email
    // },
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('SET_STATUS', 'connecting')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(response => {
            commit('SET_STATUS', 'logedIn')
            commit('LOG', response.data.data)
            resolve(response)
          })
          .catch(error => {
            commit('SET_STATUS', 'error_login')
            localStorage.removeItem('userCSBC')
            reject(error)
          })
      })
    },
    createAccount: ({commit}, accountInfos) => {
      commit('SET_STATUS', 'signing')
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', accountInfos)
          .then(response => {
            commit('SET_STATUS', 'userCreated')
            console.log("User created, login pending")
            resolve(response)
          })
          .catch((error) => {
            commit('SET_STATUS', 'error_signup')
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
