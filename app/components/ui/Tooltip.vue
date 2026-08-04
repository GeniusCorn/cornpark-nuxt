<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    placement: 'top',
  },
)

const placementClasses = {
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'top-1/2 right-full mr-2 -translate-y-1/2',
  right: 'top-1/2 left-full ml-2 -translate-y-1/2',
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
} satisfies Record<NonNullable<typeof props.placement>, string>

const placementClass = computed(() => placementClasses[props.placement])
</script>

<template>
  <div
    class="group inline-flex relative"
  >
    <slot />

    <div
      class="text-xs text-gray-700 font-medium px-3 py-1.5 border border-black/5 rounded-xl bg-white/95 opacity-0 pointer-events-none whitespace-nowrap shadow-lg transition-opacity duration-200 absolute z-10 dark:text-gray-200 dark:border-white/10 dark:bg-gray-800/95 group-hover:opacity-100"
      :class="placementClass"
    >
      {{ content }}
    </div>
  </div>
</template>
