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
    decoration-gray hover:decoration-momo transition-all ease-in-out duration-150
    text-dark dark:text-white
    :href="href"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>
