import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

import { useAuthStore } from '../stores/auth-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // ✅ Initialize auth only once
    if (!authStore.ready) {
      authStore.initializeAuth()
      authStore.initSupabaseAuthListener()
    }

    // Wait until ready (in case of async improvements in future)
    while (!authStore.ready) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    const { isAuthenticated } = authStore
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (isAuthenticated) {
      // Redirect to dashboard if authenticated and trying to access public pages
      if (['login', 'register', 'forgot-password', 'reset-password'].includes(to.name)) {
        return next({ name: 'predictions' })
      }
      return next()
    }

    if (!isAuthenticated && requiresAuth) {
      return next({ name: 'login' })
    }

    return next()
  })

  return Router
})
