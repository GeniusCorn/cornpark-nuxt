<script setup lang="ts">
import '~/styles/override.css'
</script>

<template>
  <NuxtLoadingIndicator :height="4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  box-sizing: border-box;
  position: relative;
  min-width: 0;
}

html, body {
  @apply text-base bg-base;
  min-height: 100dvh;
  margin: 0;
}
</style>
