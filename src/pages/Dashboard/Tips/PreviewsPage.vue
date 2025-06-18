<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="bg-dark shadow-2 q-mt-lg"
      style="margin-top: -15px"
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

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="yesterday"> </q-tab-panel>

      <q-tab-panel name="today">
        <div
          style="
            font-family: 'Roboto', sans-serif;
            color: #333;
            line-height: 1.5;
            max-width: 650px;
            margin: 0 auto;
          "
        >
          <h3 style="color: #ff9800; border-bottom: 1px solid #eee; padding-bottom: 8px">
            Canada vs Honduras
          </h3>

          <div style="background: #f9f9f9; padding: 12px; border-radius: 4px; margin-bottom: 15px">
            <p><strong>Key Factors:</strong></p>
            <ul>
              <li>Canada unbeaten in last 5 home matches vs Honduras</li>
              <li>Honduras lost 4/5 Gold Cup openers</li>
              <li>Missing: Davies (CAN), Rivas (HON)</li>
            </ul>
          </div>

          <div style="margin-bottom: 15px">
            <p><strong>Data Insights:</strong></p>
            <ul>
              <li>45.2% home win prob vs 1.38 odds (implied 72.5%) - no value</li>
              <li>55.3% BTTS probability vs 1.86 odds (implied 53.8%) - slight value</li>
              <li>Canada kept clean sheet in 3/5 home matches</li>
            </ul>
          </div>

          <div style="background: #fff8e1; padding: 12px; border-left: 3px solid #ff9800">
            <p><strong>Value Bets:</strong></p>
            <ul>
              <li>BTTS Yes @ 1.86 (Medium Confidence)</li>
              <li>Under 3.5 Goals @ 1.42 (High Confidence)</li>
            </ul>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="tomorrow"> </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
//import PredictionsTomorrowComponent from 'components/PredictionsTomorrowComponent.vue'

const tab = ref('today')
</script>

<style scoped></style>
