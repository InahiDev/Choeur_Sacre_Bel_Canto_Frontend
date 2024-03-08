// Bout de relogFromToken de store index.js sauvegardé

// return new Promise((resolve, reject) => {
      //   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //   instance.get('/auth/relog')
      //     .then((response) => {
      //       commit('SET_STATUS', 'private')
      //       commit('SET_TOKEN_VALIDITY', true)
      //       commit('LOG', response.data.data)
      //       resolve(response)
      //     })
      //     .catch((error) => {
      //       commit('SET_STATUS', 'public')
      //       commit('RESET_USER')
      //       reject(error)
      //     })
      // })
      // if (connectionStatus == 'relog_not_possible') {
      //   console.log('relog impossible')
      // } else {
      //   return new Promise((resolve, reject) => {
      //     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //     instance.get('/auth/relog')
      //       .then(response => {
      //         commit('SET_STATUS', 'private')
      //         commit('LOG', response.data.data)
      //         resolve(response)
      //       })
      //       .catch((error) => {
      //         commit('SET_STATUS', 'public')
      //         commit('RESET_USER')
      //         reject(error)
      //       })
      //   })
      // }