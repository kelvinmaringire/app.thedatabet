<template>
  <q-page class="flex flex-center bg-dark">
    <q-card class="auth-card q-pa-md" dark>
      <q-card-section class="text-center">
        <q-avatar size="100px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/avatar4.png" />
        </q-avatar>
        <h4 class="text-h4 text-weight-bold text-white">Reset Password</h4>
        <p class="text-grey-4">Create a new password for your account</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleResetPassword" class="q-gutter-y-md">
          <q-input
            v-model="newPassword"
            label="New Password"
            :type="showPassword ? 'text' : 'password'"
            required
            outlined
            color="primary"
            dark
            lazy-rules
            :rules="[
              (val) => !!val || 'Password is required',
              (val) => val.length >= 6 || 'Password must be at least 6 characters',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="confirmPassword"
            label="Confirm Password"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            outlined
            color="primary"
            dark
            lazy-rules
            :rules="[
              (val) => !!val || 'Please confirm your password',
              (val) => val === newPassword || 'Passwords do not match',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Reset Password"
            :loading="loading"
            class="full-width q-mt-md"
            size="lg"
            unelevated
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useQuasar } from 'quasar'

const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

onMounted(() => {
  if (!route.query.access_token) {
    router.push({ name: 'login' })
  }
})

async function handleResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Passwords do not match',
    })
    return
  }

  loading.value = true

  try {
    const result = await authStore.handlePasswordReset(newPassword.value)
    loading.value = false

    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Password reset successfully',
        position: 'top',
      })
      router.push({ name: 'login' })
    }
  } catch (error) {
    loading.value = false
    $q.notify({
      type: 'negative',
      message: error.message || 'Password reset failed',
      position: 'top',
    })
  }
}
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
}

.bg-dark {
  background: #121212;
}
</style>
