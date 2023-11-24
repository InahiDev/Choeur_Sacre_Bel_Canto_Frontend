import { createStore } from 'vuex'

const axios = require('axios')
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

let user = localStorage.getItem('userCSBC')
let connectionStatus = ''
if (!user) {
  user = {
    role: "Public",
    token: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    userId: undefined
  }
} else {
  try {
    connectionStatus = 'relog_pending'
    let userParsed = JSON.parse(user)
    user.token = userParsed.token
    instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  } catch(exception) {
    connectionStatus = ''
    //localStorage.removeItem('userCSBC')
    user = {
      role: "Public",
      token: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      userId: undefined
    }
  }
}

const dateFormat = /^20\d{2}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d$/
function parseDate(newDate) {
  console.log(newDate)
  if (dateFormat.test(newDate)) {
    let date = {
      year: newDate.split("T")[0].split("-")[0],
      month: newDate.split("T")[0].split("-")[1],
      day: newDate.split("T")[0].split("-")[2],
      hour: newDate.split("T")[1].split(":")[0],
      minute: newDate.split("T")[1].split(":")[1]
    }
    return date
  } else {
    return undefined
  }
}

export default createStore({
  state: {
    status: 'public',
    connectionStatus: status,
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
    nextRepetition: {
      year: '2023',
      month: '11',
      day: '30',
      hour: '16',
      minute: '30'
    }
  },
  getters: {
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_CONNECTION_STATUS(state, connectionStatus) {
      state.connectionStatus = connectionStatus
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
    RESET_USER(state) {
      state.user = {
        role: "Public",
        token: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        id: undefined
      }
    },
    SET_REPETITION_DATE(state, date) {
      state.nextRepetition = date
    }

    // REGISTER_EMAIL(state, email) {
    //   state.user.email = email
    // },
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('SET_STATUS', 'public')
      commit('SET_CONNECTION_STATUS', 'connecting')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(response => {
            commit('SET_STATUS', 'private')
            commit('SET_CONNECTION_STATUS', 'logedIn')
            commit('LOG', response.data.data)
            resolve(response)
          })
          .catch(error => {
            commit('SET_CONNECTION_STATUS', 'error_login')
            commit('RESET_USER')
            localStorage.removeItem('userCSBC')
            reject(error)
          })
      })
    },
    createAccount: ({commit}, accountInfos) => {
      commit('SET_CONNECTION_STATUS', 'signing')
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', accountInfos)
          .then(response => {
            commit('SET_CONNECTION_STATUS', 'userCreated')
            console.log("User created, login pending")
            resolve(response)
          })
          .catch((error) => {
            commit('SET_CONNECTION_STATUS', 'error_signup')
            reject(error)
          })
      })
    },
    relogFromToken: ({commit}, token) => {
      if (connectionStatus == 'relog_not_possible') {
        console.log('relog impossible')
      } else {
        commit('SET_CONNECTION_STATUS', 'connecting')
        return new Promise((resolve, reject) => {
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
          instance.get('/auth/relog')
            .then(response => {
              commit('SET_STATUS', 'private')
              commit('SET_CONNECTION_STATUS', 'logedIn')
              commit('LOG', response.data.data)
              resolve(response)
            })
            .catch((error) => {
              commit('SET_STATUS', 'public')
              commit('SET_CONNECTION_STATUS', 'error_login')
              commit('RESET_USER')
              localStorage.removeItem('userCSBC')
              reject(error)
            })
        })
      }
    },
    sendResetEmail: ({commit}, email) => {
      commit('SET_STATUS', 'public')
      commit('SET_CONNECTION_STATUS', 'reseting_password')
      commit('RESET_USER')
      return new Promise((resolve, reject) => {
        instance.post('/auth/reset', email)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    changePassword: ({commit}, payload) => {
      commit('SET_STATUS', 'public')
      commit('SET_CONNECTION_STATUS', 'resetingpassword')
      commit('RESET_USER')
      return new Promise((resolve, reject) => {
        instance.put('/auth/reset', payload)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    updateRepetitionDate: ({commit}, date) => {
      commit('SET_REPETITION_DATE', parseDate(date))
    },
  },
  modules: {
  }
})
