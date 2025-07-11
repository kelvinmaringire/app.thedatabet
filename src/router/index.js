import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from '../stores/auth-store'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // For routes that require authentication
    if (to.meta.requiresAuth) {
      if (authStore.isAuthenticated) {
        next()
      } else {
        // Attempt to refresh session
        await authStore.fetchUser()

        if (authStore.isAuthenticated) {
          next()
        } else {
          next({
            name: 'login',
            query: { redirect: to.fullPath }, // Store the original path to redirect after login
          })
        }
      }
    }
    // For guest-only routes (like login/register)
    else if (to.meta.requiresGuest && authStore.isAuthenticated) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  })

  return Router
})
