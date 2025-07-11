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
    </div>
    <q-list bordered separator>
      <q-item v-for="(preview, key) in paginatedPreviews" :key="key" class="custom-item">
        <div class="row q-col-gutter-xs">
          <div class="col-12 col-md-2 text-weight-bold">
            <q-item-section>
              <q-item-label>{{ preview.time }}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-12 col-md-6">
            <q-item-section>
              <q-item-label>
                {{ preview.match }}
              </q-item-label>
            </q-item-section>
          </div>
          <div class="col-10 col-md-3 text-weight-bold">
            <q-item-section>
              <q-item-label>{{ preview.country }} - {{ preview.betway_league }}</q-item-label>
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
                  @click="showDialog(preview)"
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
        color="info"
        active-design="unelevated"
        active-color="brown"
        active-text-color="orange"
        :max-pages="5"
        ellipses
        boundary-numbers
      />
    </div>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <q-card-section class="row items-center q-pb-none q-mb-sm">
          <div class="text-h5">Game Preview</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div v-html="selectedPreview.data"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="secondary" size="sm" label="Close" @click="onOKClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed, watch } from 'vue'
import { useBettingTipsStore } from '../stores/betting-store'

const bettingTipsStore = useBettingTipsStore()
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(7)
const selectedPreview = ref(null)

// Compute the filtered previews based on the search query
const filteredPreviews = computed(() => {
  const json_data = bettingTipsStore.today_previews || []
  const query = searchQuery.value.toLowerCase()

  if (!Array.isArray(json_data)) return []

  return json_data.filter((preview) => {
    return preview.match.toLowerCase().includes(query)
  })
})

// Compute the maximum page based on filtered items
const maxPage = computed(() => Math.ceil(filteredPreviews.value.length / itemsPerPage.value))

// Compute the paginated previews to be displayed on the current page
const paginatedPreviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPreviews.value.slice(start, end)
})

// Watch for changes in search query to reset the current page
watch(searchQuery, () => {
  currentPage.value = 1
})

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}

function showDialog(preview) {
  selectedPreview.value = preview
  dialogRef.value.show()
}
</script>

<style>
.custom-item {
  display: block; /* Override the row class */
  /* Add any other styles you need */
}
</style>
