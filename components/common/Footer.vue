<script lang="ts" setup>
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div
    flex flex-col items-center justify-center gap-2 pb-4 text-xs opacity-60
  >
    <div>
      Copyright &copy; 2021 - {{ currentYear }}
      <NuxtLink
        to="https://github.com/GeniusCorn" target="_blank"
      >
        GeniusCorn
      </NuxtLink>
    </div>
    <NuxtLink
      to="https://beian.miit.gov.cn/" target="_blank"
    >
      粤 ICP 备 20026972 号 - 1
    </NuxtLink>
  </div>
</template>

<style scoped>
a {
  @apply text-base hover:text-momo no-underline hover:underline transition-all
}
</style>
