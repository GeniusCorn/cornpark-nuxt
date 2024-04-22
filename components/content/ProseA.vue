<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    // eslint-disable-next-line ts/ban-types
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>

<template>
  <NuxtLink
    text-dark decoration-gray transition-all duration-150 ease-in-out
    dark:text-white hover:decoration-momo
    :href="href"
    target="_blank"
  >
    <slot />
  </NuxtLink>
</template>
