<template>
  <q-page class="q-pa-md">
    <div class="q-mt-lg">
      <!-- This div adds spacing from the top -->
      <q-tabs
        v-model="tab"
        dense
        class="bg-dark shadow-2"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        no-caps
        inline-label
      >
        <q-tab name="yesterday" label="Yesterday" icon="verified_user" />
        <q-tab name="today" label="Today" icon="today" />
        <q-tab name="tomorrow" label="Tomorrow" icon="watch_later" />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="yesterday">
        <PredictionsYesterdayComponent />
      </q-tab-panel>

      <q-tab-panel name="today">
        <PredictionsTodayComponent />
      </q-tab-panel>

      <q-tab-panel name="tomorrow">
        <PredictionsTomorrowComponent />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import PredictionsTomorrowComponent from 'components/PredictionsTomorrowComponent.vue'
import PredictionsTodayComponent from 'components/PredictionsTodayComponent.vue'
import PredictionsYesterdayComponent from 'components/PredictionsYesterdayComponent.vue'

const tab = ref('today')
</script>
