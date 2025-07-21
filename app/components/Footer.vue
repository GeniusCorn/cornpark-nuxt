<script lang="ts" setup>
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    text-xs text-slate my-10
    flex flex-col gap-2 items-center
  >
    <NuxtLink
      to="https://beian.miit.gov.cn/"
      target="_blank"
      external
      text-slate no-underline transition-all
      hover:text-momo
    >
      粤 ICP 备 20026972 号
    </NuxtLink>
    <div>
      {{ currentYear }} &copy; GeniusCorn
    </div>
  </footer>
</template>
