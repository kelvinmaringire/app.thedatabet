<template>
  <q-page class="q-pa-md flex flex-center column gap-md q-dark bg-grey-10">
    <q-card
      class="q-pa-md shadow-2 rounded-borders bg-grey-9 text-white"
      style="max-width: 400px; width: 100%"
    >
      <q-card-section class="text-h6 text-center"> Copy Betting Tips </q-card-section>

      <q-card-section class="q-gutter-sm">
        <q-btn
          label="Copy Today's Tips"
          color="primary"
          unelevated
          @click="copyTips(today_tips, 'today')"
          class="full-width"
        />
        <q-btn
          label="Copy Tomorrow's Tips"
          color="secondary"
          unelevated
          @click="copyTips(tomorrow_tips, 'tomorrow')"
          class="full-width"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { copyToClipboard, useQuasar } from 'quasar'
import { useBettingTipsStore } from '../../../stores/betting-store'

const $q = useQuasar()
const bettingTipsStore = useBettingTipsStore()

const today_tips = bettingTipsStore.today_tips
const tomorrow_tips = bettingTipsStore.tomorrow_tips

function copyTips(tips, label) {
  const textToCopy = JSON.stringify(tips, null, 2) // formatted JSON

  copyToClipboard(textToCopy)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: `Copied ${label}'s tips to clipboard`,
        position: 'top',
        color: 'green-4',
        textColor: 'black',
      })
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: `Failed to copy ${label}'s tips`,
        position: 'top',
        color: 'red-5',
        textColor: 'white',
      })
    })
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
