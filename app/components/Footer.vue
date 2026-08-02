<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div
    class="text-xs text-gray-500/50 mb-6 flex flex-col gap-2 items-center"
  >
    <NuxtLink
      class="transition hover:(text-momo underline)"
      href="https://beian.miit.gov.cn/"
      target="_blank"
    >
      粤 ICP 备 20026972 号
    </NuxtLink>

    <div>
      {{ currentYear }} &copy; GeniusCorn
    </div>
  </div>
</template>
