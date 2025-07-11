<template>
  <q-page class="flex flex-center bg-dark">
    <q-card class="auth-card q-pa-md" dark>
      <q-card-section class="text-center">
        <q-avatar size="100px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/avatar3.png">
        </q-avatar>
        <h4 class="text-h4 text-weight-bold text-white">Forgot Password</h4>
        <p class="text-grey-4">Enter your email to reset your password</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleForgotPassword" class="q-gutter-y-md">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
            color="primary"
            dark
            lazy-rules
            :rules="[val => !!val || 'Email is required']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" color="primary" />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Send Reset Link"
            :loading="loading"
            class="full-width q-mt-md"
            size="lg"
            unelevated
          />

          <div class="text-center q-mt-lg">
            <router-link
              :to="{ name: 'login' }"
              class="text-primary text-caption"
            >
              Back to login
            </router-link>
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

const email = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

async function handleForgotPassword() {
  loading.value = true
  const result = await authStore.forgotPassword(email.value)
  loading.value = false

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: 'Password reset link sent to your email',
      position: 'top'
    })
    router.push({ name: 'login' })
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
