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
          label="Search Match"
          style="max-width: 300px"
        />
      </div>
    </div>

    <q-list bordered separator>
      <q-item v-for="preview in paginatedPreviews" :key="preview.id" class="custom-item q-pa-md">
        <q-item-section class="text-h6 text-orange-4 q-mb-sm">
          {{ preview.match }}
        </q-item-section>
        <q-separator color="orange" />
        <div v-html="preview.data"></div>
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useBettingTipsStore } from '../stores/betting-store'

const bettingTipsStore = useBettingTipsStore()

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const filteredPreviews = computed(() => {
  const json_data = bettingTipsStore.yesterday_previews || []
  const query = searchQuery.value.toLowerCase()

  return json_data.filter((item) => item.match.toLowerCase().includes(query))
})

const maxPage = computed(() => Math.ceil(filteredPreviews.value.length / itemsPerPage.value))

const paginatedPreviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPreviews.value.slice(start, end)
})

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style>
.custom-item {
  background-color: #1e1e1e;
  color: #e0e0e0;
  border-radius: 8px;
}
</style>
