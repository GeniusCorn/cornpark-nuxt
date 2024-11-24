<script setup lang="ts">
import '~/style/override.css'
</script>

<template>
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

html {
  overflow-x: hidden;
  overflow-y: scroll;
}

body {
  min-height: 100dvh;
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}

.dark-mode body {
  background-color: #050505;
  color: #ebf4f1;
}

h1, h2, h3, h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
</style>
