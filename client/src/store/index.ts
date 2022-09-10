import { createStore } from 'vuex'

const initialUser = {
  user_name: '',
  user_image: '',
  id: ''
}

export default createStore({
  state: {
    user: initialUser
  },
  getters: {
    currentUser (state) {
      return state.user
    }
  },
  mutations: {
    // setting the whole user in localstorage as a very budget way of persisting login without using jwt
    setCurrentUser (state, user) {
      window.localStorage.setItem('user', JSON.stringify(user))
      state.user = { ...user }
    },
    logout (state) {
      window.localStorage.removeItem('user')
      state.user = initialUser
    }
  },
  actions: {
  },
  modules: {
  }
})
