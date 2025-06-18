<template>
  <q-page>
    <div class="row" style="height: 100vh">
      <div
        v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
        class="col-12 col-md-6 flex content-center"
      >
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }">
          <q-card-section>
            <router-link to="/">
              <q-avatar size="103px" class="absolute-center shadow-10" to="/">
                <img src="~assets/auth/avatar.svg" alt="avatar" />
              </q-avatar>
            </router-link>
          </q-card-section>
          <q-card-section>
            <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Login</h2>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="onLogin">
              <q-input label="Email" v-model="credentials.email"> </q-input>
              <q-input
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                v-model="credentials.password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div>
                <q-btn
                  class="full-width"
                  color="primary"
                  label="Login"
                  type="submit"
                  rounded
                ></q-btn>
                <div class="text-center q-mt-sm q-gutter-lg">
                  <router-link class="text-white" :to="{ name: 'password_reset' }"
                    >Forgot your password?</router-link
                  >
                  <router-link class="text-white" :to="{ name: 'register' }"
                    >Create account</router-link
                  >
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth-store'

defineOptions({
  name: 'LoginPage',
})

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const isPwd = ref(true)
const credentials = ref({
  email: '',
  password: '',
})

async function onLogin() {
  if (!credentials.value.email || !credentials.value.password) {
    $q.notify({
      type: 'negative',
      message: 'The provided data is invalid.',
      position: 'top',
    })
  } else if (credentials.value.password.length < 6) {
    $q.notify({
      type: 'negative',
      message: 'The password must have 6 or more characters.',
      position: 'top',
    })
  } else {
    try {
      await authStore.signIn(credentials.value.email, credentials.value.password)

      $q.notify({
        type: 'positive',
        message: 'Authenticated',
        position: 'top',
      })

      router.push({ name: 'predictions' })
    } catch (err) {
      $q.notify({
        type: 'negative',
        message: err?.message || 'Login failed',
        position: 'top',
      })
    }
  }
}
</script>

<style scoped></style>
