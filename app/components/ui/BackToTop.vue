<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columnWidth?: string
  }>(),
  {
    columnWidth: '42rem',
  },
)

const SCROLL_THRESHOLD = 300

const { y } = useWindowScroll()
const show = ref(false)

watch(
  y,
  (value) => {
    show.value = value > SCROLL_THRESHOLD
  },
  { immediate: true },
)

function backToTop() {
  window.scrollTo({ behavior: 'smooth', top: 0 })
}

const backToTopStyle = computed(() => ({
  right: `max(1.25rem, calc(50vw - ${props.columnWidth} / 2 - 3.5rem))`,
}))
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-if="show"
      aria-label="Back to top"
      class="text-gray-600 border border-black/10 rounded-full bg-white flex size-11 cursor-pointer shadow-lg transition-colors duration-200 items-center bottom-6 justify-center fixed z-50 backdrop-blur dark:text-gray-300 hover:text-momo dark:border-white/10 dark:bg-gray-800/90 dark:hover:text-momo"
      :style="backToTopStyle"
      type="button"
      @click="backToTop"
    >
      <div
        class="i-ri-arrow-up-s-line size-6"
      />
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s;
}
.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
