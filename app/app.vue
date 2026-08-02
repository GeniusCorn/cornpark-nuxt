<script setup lang="ts">
const description = 'Corn Huang (CH) — front-end developer and technology leader. Notes on front-end engineering, tech leadership, and life.'

useSeoMeta({
  description: () => description,
  ogDescription: () => description,
  ogTitle: () => 'CornPark',
  title: () => 'CornPark',
})
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
