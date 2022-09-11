/* eslint-disable camelcase */
import { createStore } from 'vuex'
import { User } from '../types'

interface State {
  user: User
}

const initialUser: User = {
  user_name: '',
  user_image: '',
  id: ''
}

export default createStore({
  state: {
    user: initialUser
  },
  getters: {
    currentUser (state: State): User {
      return state.user
    }
  },
  mutations: {
    // setting the whole user in localstorage as a very budget way of persisting login without using jwt
    setCurrentUser (state: State, user: User) {
      window.localStorage.setItem('user', JSON.stringify(user))
      state.user = { ...user }
    },
    logout (state: State) {
      window.localStorage.removeItem('user')
      state.user = initialUser
    }
  },
  actions: {
  },
  modules: {
  }
})
