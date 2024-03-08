import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const axios = require('axios')
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

let userToken = localStorage.getItem('userCSBC')
let user = {
  role: 'public',
  token: userToken,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  id: undefined 
}
let status = ''
if (!user) {
  user = {
    role: 'public',
    token: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    userId: undefined
  }
  status = 'public'
} else {
  try {
    status = 'public'
    let tokenParsed = JSON.parse(userToken)
    user.token = tokenParsed
    instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  } catch(exception) {
    status = 'public'
    localStorage.removeItem('userCSBC')
    user = {
      role: 'public',
      token: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      userId: undefined
    }
  }
}

// const dateFormat = /^20\d{2}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d$/
// function parseDate(newDate) {
//   if (dateFormat.test(newDate)) {
//     let date = {
//       year: newDate.split("T")[0].split("-")[0],
//       month: newDate.split("T")[0].split("-")[1],
//       day: newDate.split("T")[0].split("-")[2],
//       hour: newDate.split("T")[1].split(":")[0],
//       minute: newDate.split("T")[1].split(":")[1]
//     }
//     return date
//   } else {
//     return undefined
//   }
// }

export default createStore({
  state: {
    status: status,
    //connectionStatus: status,
    tokenValid: undefined,
    user: {
      role: user.role,
      token: user.token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    },
    comments: undefined,
    unvalidatedComments: undefined,
    concerts: undefined,
    files: undefined,
    pictures: undefined,
    pieces: undefined,
    places: undefined,
    nextCourse: {
      year: '2024',
      month: 'Mars',
      day: '05',
      hour: '18',
      minute: '00'
    },
    nextRepetition: {
      year: '2023',
      month: 'Novembre',
      day: '30',
      hour: '16',
      minute: '30',
    },
    repetitionPlace: {
      address: "12 Allée Jean Giono",
      city: "Colomiers",
      contact: "Dominique Baechler"
    },
    isCourseCanceled: false,
    isRepetitionCanceled: false
  },
  getters: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_TOKEN_VALIDITY(state, boolean) {
      state.tokenValid = boolean
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
      localStorage.setItem('userCSBC', JSON.stringify(state.user.token))
      instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    LOGOUT(state) {
      state.user = {
        role: "",
        token: "",
        email: "",
        firstName: "",
        lastName: "",
        id: ""
      }
      state.status = 'public'
      localStorage.removeItem('userCSBC')
      window.sessionStorage.clear()
      instance.defaults.headers.common['Authorization'] = 'Bearer '
    },
    RESET_USER(state) {
      state.user = {
        role: '',
        token: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        id: undefined
      }
      localStorage.removeItem('userCSBC')
    },
    SET_NEXT_COURSE(state, date) {
      state.nextCourse = date
    },
    SET_REPETITION_DATE(state, date) {
      state.nextRepetition = date
    },
    SET_REPETITION_PLACE(state, place) {
      state.repetitionPlace = place
    },
    FILL_CONCERT_ARRAY(state, concerts) {
      state.concerts = concerts
    },
    FILL_FILES_LIST(state, files) {
      state.files = undefined
      state.files = files
    },
    USELESS_COMMIT(state) {
      user = state.user
      state.user = user
    },
    FILL_PLACES_LIST(state, places) {
      state.places = places
    },
    FILL_PIECES_LIST(state, pieces) {
      state.pieces = pieces
    },
    FILL_COMMENTS_LIST(state, comments) {
      state.comments = comments
    },
    FILL_UNVALIDATED_COMMENTS_LIST(state, unvalidatedComments) {
      state.unvalidatedComments = unvalidatedComments
    },
    DELETE_COMMENT(state, id) {
      for (let comment in state.comments) {
        if (comment.id === id) {
          const index = state.comments.indexOf(comment)
          state.comments.splice(index, 1)
          break
        }
      }
    },
    CHANGE_NAMES(state, user) {
      state.user.firstName = user.firstName
      state.user.lastName = user.lastName
    },
    DELETE_CONCERT(state, id) {
      for (let concert in state.concerts) {
        if (concert.id === id) {
          const index = state.concerts.indexOf(concert)
          state.concerts.splice(index, 1)
          break
        }
      }
    },
    DELETE_FILE(state, id) {
      for (let file of state.files) {
        if (file.iid === id) {
          const index = state.files.indexOf(file)
          state.files.splice(index, 1)
          break
        }
      }
    },
    DELETE_PLACE(state, id) {
      for (let place of state.places) {
        if (place.id === id) {
          const index = state.places.indexOf(place)
          state.places.splice(index, 1)
          break
        }
      }
    },
    DELETE_PIECE(state, id) {
      for (let piece of state.pieces) {
        if (piece.id === id) {
          const index = state.pieces.indexOf(piece)
          state.pieces.splice(index, 1)
          break
        }
      }
    },
    CHANGE_REPETITION_CANCEL(state, boolean) {
      state.isRepetitionCanceled = boolean
    },
    CHANGE_COURSE_CANCEL(state, boolean) {
      state.isCourseCanceled = boolean
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('SET_STATUS', 'public')
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(response => {
            commit('SET_STATUS', 'private')
            commit('LOG', response.data.data)
            resolve(response)
          })
          .catch(error => {
            commit('RESET_USER')
            reject(error)
          })
      })
    },
    logout: ({commit}) => {
      commit('SET_STATUS', 'public')
      commit('LOGOUT')
    },
    createAccount: (_, accountInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', accountInfos)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    relogFromToken: ({commit}, token) => {
      return new Promise((resolve, reject) => {
        if (token.validity === false) {
          resolve('unvalidToken')
        } else {
          instance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`
          instance.get('/auth/relog')
            .then((response) => {
              commit('SET_STATUS', 'private')
              commit('SET_TOKEN_VALIDITY', true)
              commit('LOG', response.data.data)
              resolve(response)
            })
            .catch((error) => {
              commit('SET_STATUS', 'public')
              commit('SET_TOKEN_VALIDITY', false)
              commit('RESET_USER')
              reject(error)
            })
        }
      })
    },
    sendResetEmail: ({commit}, email) => {
      commit('SET_STATUS', 'public')
      commit('RESET_USER')
      return new Promise((resolve, reject) => {
        instance.post('/auth/reset', email)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    changePassword: ({commit}, payload) => {
      commit('SET_STATUS', 'public')
      commit('RESET_USER')
      return new Promise((resolve, reject) => {
        instance.put('/auth/reset', payload)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    modifyUser: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        instance.put(`/auth/infos/${payload.id}`, payload.modifiedUser)
          .then((response) => {
            commit('CHANGE_NAMES', payload.modifiedUser)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteOwnAccount: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/auth/${id}`)
          .then((response) => {
            commit('LOGOUT')
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteAccount: (_, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/auth/${id}`)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateRepetitionDate: ({commit}, date) => {
       commit('SET_REPETITION_DATE', date)
    },
    updateNextCourse: ({commit}, date) => {
      commit('SET_NEXT_COURSE', date)
    },
    updateRepetitionPlace: ({commit}, place) => {
      commit('SET_REPETITION_PLACE', place)
    },
    getFirstConcerts: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get(`/concert`)
          .then((response) => {
            commit('FILL_CONCERT_ARRAY', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            commit('FILL_CONCERT_ARRAY', undefined)
            reject(error)
          })
      })
    },
    getSpecificFiles: ({commit}, research) => {
      if (research.type && research.value) {
        if (research.offset) {
          return new Promise((resolve, reject) => {
            instance.get(`/archive/${research.type}/${research.value}?offset=${research.offset}`)
              .then((response) => {
                commit('FILL_FILES_LIST', response.data.data)
                resolve(response)
              })
              .catch((error) => {
                commit('FILL_FILES_LIST', undefined)
                reject(error)
              })
          })
        } else {
          return new Promise((resolve, reject) => {
            instance.get(`/archive/${research.type}/${research.value}`)
              .then((response) => {
                commit('FILL_FILES_LIST', response.data.data)
                resolve(response)
              })
              .catch((error) => {
                commit('FILL_FILES_LIST', undefined)
                reject(error)
              })
          })
        }
      } else {
        commit('FILL_FILES_LIST', undefined)
      }
    },
    extractFile: ({commit}, id) => {
      commit('USELESS_COMMIT')
      return new Promise((resolve, reject) => {
        instance.get(`/archive/id/${id}`)
          .then((response) => resolve(response))
          .catch((error) => {
            reject(error)
          })
      })
    },
    searchForLinks: (_, payload) => {
      let offset = 0
      if (payload.offset) {
        offset = payload.offset
      } else {
        offset = 0
      }
      return new Promise((resolve, reject) => {
        instance.get(`/${payload.type}?offset=${offset}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    addFile: (_, file) => {
      let req = new FormData()
      req.append('file', file.file, file.file.name)
      req.append('type', file.type)
      if (file.concertId) {
        req.append('concertId', file.concertId)
      }
      if (file.placeId) {
        req.append('placeId', file.placeId)
      }
      if (file.pieceId) {
        req.append('pieceId', file.pieceId)
      }
      return new Promise((resolve, reject) => {
        instance.post(`/archive`, req)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    addConcert: (_, concert) => {
      if (concert.picture?.file) {
        let req = new FormData()
        req.append('picture', concert.picture.file, concert.picture.name)
        req.append('city', concert.city)
        req.append('name', concert.name)
        req.append('zip', concert.zip)
        req.append('date', concert.date)
        req.append('type', concert.type)
        if (concert.price) {
          req.append('price', concert.price)
        }
        req.append('alt', concert.picture.alt)
        return new Promise((resolve, reject) => {
          instance.post('/concert', req)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        })
      } else {
        delete concert.picture
        return new Promise((resolve, reject) => {
          instance.post(`/concert`, concert)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        })
      }
    },
    getConcerts: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        instance.get(`/concert?offset=${payload.offset}`)
          .then((response) => {
            commit('FILL_CONCERT_ARRAY', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            commit('FILL_CONCERT_ARRAY', undefined)
            reject(error)
          })
      })
    },
    getPlaces: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        instance.get(`/place?offset=${payload.offset}`)
          .then((response) => {
            commit('FILL_PLACES_LIST', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            commit('FILL_PLACES_LIST', undefined)
            reject(error)
          })
      })
    },
    addPlace: (_, place) => {
      return new Promise((resolve, reject) => {
        instance.post('/place', place)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    getPieces: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        instance.get(`/piece?offset=${payload.offset}`)
          .then((response) => {
            commit('FILL_PIECES_LIST', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            commit('FILL_PIECES_LIST', undefined)
            reject(error)
          })
      })
    },
    addPiece: (_, piece) => {
      if (!piece.arrangement) {
        delete piece.arrangement
      }
      return new Promise((resolve, reject) => {
        instance.post('/piece', piece)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    getMembers: (_, offset) => {
      return new Promise((resolve, reject) => {
        instance.get(`/auth/accounts?offset=${offset.offset}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    getSpecificsUsersAccount: (_, research) => {
      return new Promise((resolve, reject) => {
        instance.get(`/auth/accounts/${research.type}/${research.value}?offset=${research.offset}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    updatePicture: (_, payload) => {
      const concertId = payload.id
      if (payload.picture.file) {
        let req = new FormData()
        req.append('picture', payload.picture.file, payload.picture.name)
        if (payload.picture.alt) {
          req.append('alt', payload.picture.alt)
        }
        return new Promise((resolve, reject) => {
          instance.put(`/concert/${concertId}/picture`, req)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        })
      } else {
        return new Promise((resolve, reject) => {
          instance.put(`/concert/${concertId}/picture`, {
            alt: payload.picture.alt
           })
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        })
      }
    },
    updateTextConcert: (_, payload) => {
      const concertId = payload.id
      delete payload.concert.picture
      return new Promise((resolve, reject) => {
        instance.put(`/concert/${concertId}`, payload.concert)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    deletePicture: (_, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/concert/${id}/picture`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    updatePiece: (_, payload) => {
      const pieceId = payload.id
      if (!payload.piece.arrangement) {
        delete payload.piece.arrangement
      }
      return new Promise((resolve, reject) => {
        instance.put(`/piece/${pieceId}`, payload.piece)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    modifyPlace: (_, payload) => {
      const placeId = payload.id
      if (!payload.place.type) {
        delete payload.place.type
      }
      return new Promise((resolve, reject) => {
        instance.put(`/place/${placeId}`, payload.place)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    modifyMember: (_, payload) => {
      const memberId = payload.id
      if (!payload.member.role) {
        delete payload.member.role
      }
      return new Promise((resolve, reject) => {
        instance.put(`/auth/infos/${memberId}`, payload.member)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    getComments: ({commit}, offset) => {
      return new Promise((resolve, reject) => {
        instance.get(`/comment?offset=${offset}`)
          .then((response) => {
            commit('FILL_COMMENTS_LIST', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            commit('FILL_COMMENTS_LIST', undefined)
            reject(error)
          })
      })
    },
    getUnvalidatedComments: ({commit}, offset) => {
      return new Promise((resolve, reject) => {
        instance.get(`/comment/admin?offset=${offset}`)
          .then((response) => {
            if (response.data.data) {
              commit('FILL_UNVALIDATED_COMMENTS_LIST', response.data.data)
              resolve(response)
            } else {
              commit('FILL_UNVALIDATED_COMMENTS_LIST', undefined)
              resolve(response)
            }
          })
          .catch((error) => {
            commit('FILL_UNVALIDATED_COMMENTS_LIST', undefined)
            reject(error)
          })
      })
    },
    addComment: (_, comment) => {
      return new Promise((resolve, reject) => {
        instance.post('/comment', comment)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    validateComment: (_, id) => {
      return new Promise((resolve, reject) => {
        instance.put(`/comment/${id}/validate`)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    deleteComment: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/comment/${id}/delete`)
          .then((response) => {
            commit('DELETE_COMMENT', id)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    unlog: ({commit}) => {
      return new Promise((resolve) => {
        commit('LOGOUT')
        resolve()
      })
    },
    deleteConcert: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/concert/${id}`)
          .then(() => {
            commit('DELETE_CONCERT', id)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteFile: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/archive/${id}`)
          .then(() => {
            commit('DELETE_FILE', id)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deletePlace: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/place/${id}`)
          .then(() => {
            commit('DELETE_PLACE', id)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deletePiece: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/piece/${id}`)
        .then(() => {
          commit('DELETE_PIECE', id)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    updateRepetitionStatus({commit}, boolean) {
      return new Promise((resolve) => {
        commit('CHANGE_REPETITION_CANCEL', boolean)
        resolve(this.state.isRepetitionCanceled)
      })
    },
    updateCourseStatus({commit}, boolean) {
      return new Promise((resolve) => {
        commit('CHANGE_COURSE_CANCEL', boolean)
        resolve(this.state.isCourseCanceled)
      })
    }
  },
  modules: {
  }
})
