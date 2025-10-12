<script setup lang="ts">
import '~/style/override.css'
import '~/style/reset.css'
</script>

<template>
  <NuxtLoadingIndicator color="#f596aa" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ScrollToTop />
</template>

<style>
:root {
  --c-bg: #fff;
  --c-scrollbar: #eee;
  --c-scrollbar-hover: #bbb;
  color-scheme: light dark;
}

html {
  background-color: var(--c-bg);
  overflow-x: hidden;
  overflow-y: scroll;
}

html.dark {
  --c-bg: #050505;
  --c-scrollbar: #111;
  --c-scrollbar-hover: #222;
  color-scheme: dark;
}

::selection {
  background: #8884;
}
</style>
