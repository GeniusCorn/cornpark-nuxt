<script setup lang="ts">
const { close, state } = useLightbox()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && state.open) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})

// Lock background scroll while open.
// `html` is the real scrolling container (html { overflow-y: scroll } in main.css),
// so both `html` and `body` must be locked to actually prevent page scrolling.
watch(
  () => state.open,
  (open) => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    document.body.style.overflow = open ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="state.open"
        :aria-label="state.alt || 'Image preview'"
        aria-modal="true"
        class="p-6 bg-black/80 flex items-center inset-0 justify-center fixed z-[100] backdrop-blur-sm"
        role="dialog"
        @click.self="close"
      >
        <button
          aria-label="Close preview"
          class="text-white/90 rounded-full bg-white/10 flex size-10 cursor-pointer transition-colors duration-200 items-center right-4 top-4 justify-center absolute z-10 hover:text-momo"
          type="button"
          @click="close"
        >
          <div class="i-ri-close-line size-6" />
        </button>

        <div class="flex flex-col gap-4 max-h-full max-w-full items-center">
          <img
            :alt="state.alt"
            class="lightbox-img rounded-sm max-h-[82vh] max-w-[92vw] shadow-2xl object-contain"
            :src="state.src"
          >

          <p
            v-if="state.alt"
            class="text-sm text-white/80 text-center max-w-[80vw]"
          >
            {{ state.alt }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-active .lightbox-img,
.lightbox-leave-active .lightbox-img {
  transition: transform 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-img {
  transform: scale(0.96);
}
</style>
