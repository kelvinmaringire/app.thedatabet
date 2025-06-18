<template>
  <div>
    <div class="row q-gutter-lg q-mb-md">
      <div class="col">
        <q-input
          outlined
          filled
          square
          dense
          v-model="searchQuery"
          label="Search"
          style="max-width: 300px"
        />
      </div>
      <div class="col">
        <q-select
          outlined
          filled
          square
          dense
          v-model="selectedOption"
          :options="options"
          label="Sort By"
          style="max-width: 300px"
        />
      </div>
    </div>
    <q-list bordered separator>
      <q-item v-for="(game, key) in paginatedGames" :key="key" class="custom-item">
        <div class="row q-col-gutter-xs">
          <div class="col-12 col-md-2 text-weight-bold">
            <q-item-section>
              <q-item-label>{{ game.time }}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-12 col-md-6">
            <q-item-section>
              <q-item-label>
                {{ game.host_name }} {{ game.host_sc_pr }} - {{ game.guest_sc_pr }}
                {{ game.guest_name }}
              </q-item-label>
            </q-item-section>
          </div>
          <div class="col-10 col-md-3 text-weight-bold">
            <q-item-section>
              <q-item-label>{{ game.country }} - {{ game.betway_league }}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-2 col-md-1 text-weight-bold">
            <q-item-section>
              <q-item-label>
                <q-btn
                  class="glossy"
                  color="info"
                  icon="visibility"
                  size="xs"
                  outline
                  rounded
                  @click="showDialog(game)"
                />
              </q-item-label>
            </q-item-section>
          </div>
        </div>
      </q-item>
    </q-list>
    <div class="flex flex-center q-my-md">
      <q-pagination
        v-model="currentPage"
        :max="maxPage"
        direction-links
        outline
        color="orange"
        active-design="unelevated"
        active-color="brown"
        active-text-color="orange"
      />
    </div>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <q-card-section class="row items-center q-pb-none q-mb-sm">
          <div class="text-h5">Game Info</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Time</div>
            <div class="col-auto">{{ selectedGame.time }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">League</div>
            <div class="col-auto">
              {{ selectedGame.country }} - {{ selectedGame.betway_league }}
            </div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Home</div>
            <div class="col-auto">
              {{ selectedGame.host_name }}
              <q-btn
                class="glossy q-ml-sm"
                color="orange"
                icon="content_copy"
                size="xs"
                outline
                rounded
                @click="copyName(selectedGame.host_name)"
              />
            </div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Away</div>
            <div class="col-auto">
              {{ selectedGame.guest_name }}
              <q-btn
                class="glossy q-ml-sm"
                color="orange"
                icon="content_copy"
                size="xs"
                outline
                rounded
                @click="copyName(selectedGame.guest_name)"
              />
            </div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Tipster Prediction</div>
            <div class="col-auto">
              {{ selectedGame.host_sc_pr }} - {{ selectedGame.guest_sc_pr }}
            </div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Result Probabilities</div>
            <div class="col-auto">
              {{ selectedGame.Pred_1 }}% ~ {{ selectedGame.Pred_X }}% ~ {{ selectedGame.Pred_2 }}%
            </div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Goals Average</div>
            <div class="col-auto">{{ selectedGame.goalsavg }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Odds (Home ~ Away)</div>
            <div class="col-auto">{{ selectedGame.home_odds }} ~ {{ selectedGame.away_odds }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Odds (Home draw ~ Away draw)</div>
            <div class="col-auto">{{ selectedGame.home_draw }} ~ {{ selectedGame.away_draw }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Odds (Over 1.5 ~ Under 3.5)</div>
            <div class="col-auto">{{ selectedGame.over_15 }} ~ {{ selectedGame.under_35 }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Odds (BTTS yes ~ BTTS no)</div>
            <div class="col-auto">{{ selectedGame.btts_y }} ~ {{ selectedGame.btts_n }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Home over 0.5 ~ Away over 0.5</div>
            <div class="col-auto">{{ selectedGame.home05 }} ~ {{ selectedGame.away05 }}</div>
          </div>
          <q-separator color="orange" />
          <div class="row justify-between q-pa-sm">
            <div class="col-auto">Draw not Bet(Home ~ Away)</div>
            <div class="col-auto">
              {{ selectedGame.home_draw_no_bet }} ~ {{ selectedGame.away_draw_no_bet }}
            </div>
          </div>
          <q-separator color="orange" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="secondary" size="sm" label="Close" @click="onOKClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { copyToClipboard, useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, computed, watch } from 'vue'
import { useBettingTipsStore } from '../stores/betting-store'

const $q = useQuasar()
const bettingTipsStore = useBettingTipsStore()
const selectedOption = ref('All')
const options = [
  'All',
  'Home Win',
  'Away Win',
  'Over 1.5',
  'Under 3.5',
  'Home Over 0.5',
  'Away Over 0.5',
  'BTTS Yes',
  'BTTS No',
]
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const selectedGame = ref(null)

const filterCriteria = {
  'Home Win': 'Predicted_home_win',
  'Away Win': 'Predicted_away_win',
  'Over 1.5': 'Predicted_over_2_5',
  'Under 3.5': 'Predicted_under_2_5',
  'Home Over 0.5': 'Predicted_home_over_1_5',
  'Away Over 0.5': 'Predicted_away_over_1_5',
  'BTTS Yes': 'Predicted_btts_yes',
  'BTTS No': 'Predicted_btts_no',
}

// Compute the filtered games based on the search query and selected option
const filteredGames = computed(() => {
  const json_data = bettingTipsStore.today_tips
  const query = searchQuery.value.toLowerCase()
  const selectedCriterion = filterCriteria[selectedOption.value]

  if (!Array.isArray(json_data)) return []

  return json_data.filter((game) => {
    const matchesQuery =
      game.host_name.toLowerCase().includes(query) ||
      game.guest_name.toLowerCase().includes(query) ||
      game.betway_league.toLowerCase().includes(query)

    if (selectedOption.value === 'All') {
      return matchesQuery
    }

    return matchesQuery && game[selectedCriterion] === 1
  })
})

// Compute the maximum page based on filtered items
const maxPage = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage.value))

// Compute the paginated games to be displayed on the current page
const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredGames.value.slice(start, end)
})

// Watch for changes in search query and selected option to reset the current page
watch([searchQuery, selectedOption], () => {
  currentPage.value = 1
})

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

// this is part of our example (so not required)
function onOKClick() {
  onDialogOK()
}

function showDialog(game) {
  selectedGame.value = game
  dialogRef.value.show()
}

function copyName(teamName) {
  copyToClipboard(teamName)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Copied to clipboard',
        position: 'top',
      })
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'Failed to copy',
        position: 'top',
      })
    })
}
</script>

<style>
.custom-item {
  display: block; /* Override the row class */
  /* Add any other styles you need */
}
</style>
