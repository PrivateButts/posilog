<template>
  <UContainer class="mt-4">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <legend>Log Data Point</legend>
      <UFormGroup label="ID">
        <UInput v-model="state.id" disabled />
      </UFormGroup>
      <div class="flex gap-3">
        <UFormGroup label="Latitude" class="flex-auto">
          <UInput v-model="coords.latitude" disabled />
        </UFormGroup>
        <UFormGroup label="Longitude" class="flex-auto">
          <UInput v-model="coords.longitude" disabled />
        </UFormGroup>
      </div>
      <p>{{ locatedAt }}</p>
      <UFormGroup label="Data">
        <UInput v-model="state.data" />
      </UFormGroup>
      
      <UButton type="submit">Submit</UButton>
    </UForm>

    <UButton :disabled="selected.length === 0" @click="removeEntry">Remove</UButton>
    <UButton @click="exportList">Export</UButton>


    <UTable v-model="selected" :columns="columns" :rows="rows" />
    <UPagination v-model="page" :page-count="pageCount" :total="items.length" />
    <Map :markers="markers" />
  </UContainer>
</template>

<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { coords, locatedAt, resume, pause } = useGeolocation()

const items = ref<Schema[]>([])

const schema = z.object({
  id: z.number(),
  lat: z.number(),
  lon: z.number(),
  data: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  id: items.value.length,
  lat: coords.value.latitude,
  lon: coords.value.longitude,
  data: '',
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  items.value.push({...event.data, lat: coords.value.latitude, lon: coords.value.longitude})
  state.id = items.value.length
  state.lat = coords.value.latitude
  state.lon = coords.value.longitude
  state.data = ''
}

const columns = ref([
  { key: 'id', label: 'ID', sortable: true},
  { key: 'lat', label: 'Latitude' },
  { key: 'lon', label: 'Longitude' },
  { key: 'data', label: 'Data' },
])

const selected = ref([])

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return items.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const markers = computed(() => {
  return items.value.map(({ lat, lon, data }) => ({ lat, lon, data }))
})


function removeEntry () {
  items.value = items.value.filter((item) => !selected.value.includes(item))
  items.value.forEach((item, index) => item.id = index)
  selected.value = []
}

function exportList () {
  const data = JSON.stringify(items.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>