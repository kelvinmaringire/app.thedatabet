import { defineStore } from 'pinia'
import { api } from '../boot/axios.js'
import { supabase } from '../boot/supabase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    token: JSON.parse(window.localStorage.getItem('token')) || '', // Initialize with local storage value
    isAuthenticated: !!window.localStorage.getItem('token'),
    user: null,
  }),

  getters: {
    decodeToken(state) {
      if (state.token && state.token.access) {
        const accessToken = state.token.access
        const base64Url = accessToken.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join(''),
        )
        return JSON.parse(jsonPayload)
      }
      return {}
    },
    userId() {
      const decodedToken = this.decodeToken
      return decodedToken.user_id
    },
    profile(state) {
      const { userId } = this
      const { users } = state
      return users.find((user) => user.id === userId)
    },
  },

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Failed to fetch user:', error.message)
        this.user = null
      } else {
        this.user = data.user
        console.log('✅ Current user:', this.user)
      }
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign-in error:', error.message)
      } else {
        console.log('User signed in:', user)
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('Sign-up error:', error.message)
      } else {
        console.log('User signed up:', user)
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error.message)
      } else {
        console.log('User signed out')
      }
    },
    initSupabaseAuthListener() {
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          this.user = session.user
          this.isAuthenticated = true
          window.localStorage.setItem('sb_session', JSON.stringify(session))
        } else {
          this.user = null
          this.isAuthenticated = false
          window.localStorage.removeItem('sb_session')
        }
      })
    },

    restoreSession() {
      const session = JSON.parse(window.localStorage.getItem('sb_session'))
      if (session?.user) {
        this.user = session.user
        this.isAuthenticated = true
      }
    },

    async fetchUsers() {
      const response = await api.get('accounts/')
      this.users = response.data
    },
    async doLogin(credentials) {
      const response = await api.post('api/token/', credentials)

      this.token = response.data
      this.isAuthenticated = true
      window.localStorage.setItem('token', JSON.stringify(response.data))
      api.defaults.headers.common.Authorization = `JWT ${response.data.access}`
      this.getMe(response.data)
    },

    async doContact(formData) {
      await api.post('contact_form/', formData)
    },

    logout() {
      api.defaults.headers.common.Authorization = ''
      this.token = ''
      window.localStorage.removeItem('token')
      this.isAuthenticated = false
    },

    async getMe(token) {
      const accessToken = token.access
      const base64Url = accessToken.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      )
      const parsedPayload = JSON.parse(jsonPayload)
      this.user_id = parsedPayload.user_id
    },

    async initAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        const parsedToken = JSON.parse(token)
        const currentTime = Math.floor(Date.now() / 1000) // Get current time in seconds
        const decodedToken = this.decodeToken

        // Check if the token is expired
        if (decodedToken.exp > currentTime) {
          this.token = parsedToken
          this.isAuthenticated = true
          api.defaults.headers.common.Authorization = `JWT ${this.token.access}`
        } else {
          // Token is expired, handle accordingly
          this.token = ''
          window.localStorage.removeItem('token')
          this.isAuthenticated = false
        }
      } else {
        this.token = ''
        window.localStorage.removeItem('token')
        this.isAuthenticated = false
      }
    },
  },
})
