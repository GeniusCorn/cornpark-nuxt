<script lang="ts" setup>
import { tools } from './TecStack.tools'
</script>

<template>
  <div
    class="flex flex-row flex-wrap gap-4"
  >
    <NuxtLink
      v-for="tool in tools"
      :key="tool.name"
      class="group border border-black/5 rounded-2xl bg-white/60 flex flex-col gap-2 size-20 shadow-sm transition-all duration-200 ease-out items-center justify-center dark:border-white/10 hover:border-momo/30 dark:bg-white/5 hover:bg-momo/10 hover:shadow-lg dark:hover:border-momo/40 dark:hover:bg-momo/20 hover:-translate-y-1"
      :href="tool.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="tool.name"
    >
      <span
        class="size-12 transition-transform duration-200 group-hover:scale-110"
        :class="[tool.icon]"
      />
    </NuxtLink>
  </div>
</template>
