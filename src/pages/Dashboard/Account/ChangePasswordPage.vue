<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <h4 class="text-h4">Change Password</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleChangePassword">
          <q-input v-model="currentPassword" label="Current Password" type="password" required />

          <q-input v-model="newPassword" label="New Password" type="password" required />

          <q-input
            v-model="confirmPassword"
            label="Confirm New Password"
            type="password"
            required
          />

          <div class="q-mt-md">
            <q-btn type="submit" color="primary" label="Change Password" :loading="loading" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useQuasar } from 'quasar'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

async function handleChangePassword() {
  if (newPassword.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Passwords do not match',
    })
    return
  }

  loading.value = true
  const result = await authStore.updatePassword(newPassword.value)
  loading.value = false

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: 'Password changed successfully',
    })
    router.push({ name: 'account' })
  }
}
</script>
