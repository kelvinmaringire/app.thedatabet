import { defineStore } from 'pinia'
import { supabase } from '../boot/supabase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    session: null,
    error: null,
  }),

  actions: {
    // Initialize auth state from localStorage
    initializeAuth() {
      const session = JSON.parse(localStorage.getItem('sb_session'))
      if (session) {
        this.user = session.user
        this.isAuthenticated = true
        this.session = session
      }
    },

    // Set up auth state change listener
    initSupabaseAuthListener() {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session)

        if (session) {
          this.user = session.user
          this.isAuthenticated = true
          this.session = session
          localStorage.setItem('sb_session', JSON.stringify(session))
        } else {
          this.user = null
          this.isAuthenticated = false
          this.session = null
          localStorage.removeItem('sb_session')
        }
      })
    },

    // Email/password login
    async login(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        this.user = data.user
        this.isAuthenticated = true
        this.session = data.session
        localStorage.setItem('sb_session', JSON.stringify(data.session))

        return { success: true, data }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Email/password registration
    async register(email, password, additionalData = {}) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: additionalData,
          },
        })

        if (error) throw error

        // Only set user/session if email confirmation is not required
        if (data.user && data.session) {
          this.user = data.user
          this.isAuthenticated = true
          this.session = data.session
          localStorage.setItem('sb_session', JSON.stringify(data.session))
        }

        return { success: true, data }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Logout
    async logout() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        this.user = null
        this.isAuthenticated = false
        this.session = null
        localStorage.removeItem('sb_session')

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Send password reset email
    async forgotPassword(email) {
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) throw error

        return { success: true, data }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Update password (must be authenticated)
    async updatePassword(newPassword) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        })

        if (error) throw error

        // Update local user data if needed
        if (data.user) {
          this.user = data.user
        }

        return { success: true, data }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Handle password reset (from email link)
    async handlePasswordReset(newPassword) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        })

        if (error) throw error

        // Update local user data
        if (data.user) {
          this.user = data.user
          this.isAuthenticated = true
        }

        return { success: true, data }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    // Get current user
    async fetchUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) throw error

        this.user = user
        this.isAuthenticated = true
        return { success: true, user }
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        return { success: false, error: error.message }
      }
    },
  },
})
