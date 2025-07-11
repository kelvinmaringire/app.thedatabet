<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from './stores/auth-store'
import { useBettingTipsStore } from './stores/betting-store'

const authStore = useAuthStore()
const bettingTips = useBettingTipsStore()

// Ensure store initialization
async function initStore() {
  //await authStore.initAuth()
  await authStore.fetchUser()
  authStore.initializeAuth()
  authStore.initSupabaseAuthListener()

  await bettingTips.fetchYesterdayTips()
  await bettingTips.fetchTodayTips()
  await bettingTips.fetchTomorrowTips()
  await bettingTips.fetchYesterdayPreviews()
  await bettingTips.fetchTodayPreviews()
  await bettingTips.fetchTomorrowPreviews()
}

// Call the initialization function
initStore()
</script>
