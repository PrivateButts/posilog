<template>
    <div id="map" class="min-h-screen relative"></div>
</template>


<script setup lang="ts">
import mapboxgl from 'mapbox-gl'

const props = defineProps<{
    markers: { lat: number, lon: number, data: string }[]
}>()

const { coords } = useGeolocation()
const config = useRuntimeConfig()
const map = ref<mapboxgl.Map | null>(null)
const accessToken = config.public.mapboxToken as string

onMounted(() => {
    map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
            Number.isFinite(coords.value.longitude) ? coords.value.longitude : 0,
            Number.isFinite(coords.value.latitude) ? coords.value.latitude : 0
        ],
        zoom: 9,
        accessToken
    })
})

onUnmounted(() => {
    map.value?.remove()
})

watch(() => props.markers, (markers) => {
    if (!map.value) return
    
    const bounds = new mapboxgl.LngLatBounds()
    if (coords.value && Number.isFinite(coords.value.longitude) && Number.isFinite(coords.value.latitude)) {
        bounds.extend([coords.value.longitude, coords.value.latitude])
    }

    markers.forEach(({ lat, lon, data }) => {
        new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .setPopup(new mapboxgl.Popup({className:"text-black"}).setText(data))
            .addTo(map.value!)
        bounds.extend([lon, lat])
    })
        
    map.value.fitBounds(bounds, { padding: 20 })

}, { immediate: true })
</script>