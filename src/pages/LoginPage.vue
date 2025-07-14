<template>
  <q-page class="flex flex-center bg-dark">
    <q-card class="auth-card q-pa-sm" dark>
      <q-card-section class="text-center q-pa-sm">
        <q-avatar size="80px" class="q-mb-xs">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <h4 class="text-h5 text-weight-bold text-white q-my-xs">Welcome Back</h4>
        <p class="text-grey-4 q-mb-none">Sign in to continue</p>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-form @submit="handleLogin" class="q-gutter-y-sm">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
            dense
            color="primary"
            dark
            lazy-rules
            :rules="[(val) => !!val || 'Email is required']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" size="sm" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            required
            outlined
            dense
            color="primary"
            dark
            lazy-rules
            :rules="[(val) => !!val || 'Password is required']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" size="sm" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                size="sm"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="text-right q-mt-xs">
            <router-link :to="{ name: 'forgot-password' }" class="text-primary text-caption">
              Forgot password?
            </router-link>
          </div>

          <q-btn
            type="submit"
            color="primary"
            label="Login"
            :loading="loading"
            class="full-width q-mt-sm"
            size="md"
            unelevated
          />

          <div class="text-center q-my-xs">
            <div class="text-grey-5 text-caption q-my-xs">or continue with</div>
            <q-btn
              color="grey-9"
              icon="img:https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              label="Google"
              class="full-width"
              size="md"
              @click="signInWithGoogle"
            />
          </div>

          <div class="text-center q-mt-sm">
            <p class="text-grey-4 text-caption q-mb-none">
              Don't have an account?
              <router-link :to="{ name: 'register' }" class="text-primary text-weight-medium">
                Register here
              </router-link>
            </p>
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

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  loading.value = true
  const result = await authStore.login(email.value, password.value)
  loading.value = false

  if (result.success) {
    router.push({ name: 'predictions' })
  }
}

async function signInWithGoogle() {
  loading.value = true
  const result = await authStore.loginWithGoogle()
  loading.value = false

  if (result.success) {
    router.push({ name: 'predictions' })
  }
}
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
}

.bg-dark {
  background: #121212;
}
</style>
