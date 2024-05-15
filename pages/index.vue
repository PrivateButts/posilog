<template>
    <div></div>
</template>

<script setup lang="ts">
navigateTo({
    path: `/log/${randomString()}`,
})

function randomString() {
    return Math.random().toString(36).substring(7)
}
</script>