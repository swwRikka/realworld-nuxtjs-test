const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const getters = {
  currentUser (state) {
    return state.user;
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.user)
      } catch (error) {

      }
    }
    commit('setUser', auth)
  }
}