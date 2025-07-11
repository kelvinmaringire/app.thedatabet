<template>
  <q-page class="flex flex-center bg-dark">
    <q-card class="auth-card q-pa-md" dark>
      <q-card-section class="text-center">
        <q-avatar size="100px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/avatar2.png">
        </q-avatar>
        <h4 class="text-h4 text-weight-bold text-white">Create Account</h4>
        <p class="text-grey-4">Join us today</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleRegister" class="q-gutter-y-md">
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

          <q-input
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            required
            outlined
            color="primary"
            dark
            lazy-rules
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 6 || 'Password must be at least 6 characters'
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
              val => !!val || 'Please confirm your password',
              val => val === password || 'Passwords do not match'
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
            label="Register"
            :loading="loading"
            class="full-width q-mt-md"
            size="lg"
            unelevated
          />

          <div class="text-center q-my-md">
            <div class="text-grey-5 q-my-sm">or continue with</div>
            <q-btn
              color="grey-9"
              icon="img:https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              label="Google"
              class="full-width"
              @click="signInWithGoogle"
            />
          </div>

          <div class="text-center q-mt-lg">
            <p class="text-grey-4 text-caption">
              Already have an account?
              <router-link
                :to="{ name: 'login' }"
                class="text-primary text-weight-medium"
              >
                Login here
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
import { useQuasar } from 'quasar'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

async function handleRegister() {
  loading.value = true
  const result = await authStore.register(email.value, password.value)
  loading.value = false

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: 'Registration successful! Please check your email to confirm your account.',
      position: 'top'
    })
    router.push({ name: 'login' })
  }
}

async function signInWithGoogle() {
  loading.value = true
  const result = await authStore.loginWithGoogle()
  loading.value = false

  if (result.success) {
    router.push({ name: 'dashboard' })
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
