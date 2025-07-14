<template>
  <q-banner dense inline-actions class="text-white bg-primary q-mb-lg">
    <div class="text-h5">Account Settings</div>
    <template v-slot:action>
      <q-btn dense round flat icon="account_circle" />
    </template>
  </q-banner>

  <q-list separator bordered class="q-mb-lg">
    <q-item clickable v-ripple>
      <q-item-section class="text-h5 text-weight-light"> Profile Settings </q-item-section>
    </q-item>

    <q-item clickable v-ripple :to="{ name: 'tips-copy' }">
      <q-item-section class="text-h5 text-weight-light"> Tips Copy</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-h5 text-weight-light"> Password Change </q-item-section>
    </q-item>
  </q-list>

  <q-list bordered separator>
    <q-item clickable v-ripple>
      <q-btn flat size="lg" color="negative" icon="logout" label="LOGOUT" @click="logout()" />
    </q-item>
  </q-list>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth-store'

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  const result = await authStore.logout()
  if (result.success) {
    router.push({ name: 'login' })
  } else {
    console.error('Logout failed:', result.error)
  }
}
</script>
