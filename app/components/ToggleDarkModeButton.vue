<script setup lang="ts">
const isDark = useDark()

function toggleDark(event?: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <ClientOnly>
    <div
      i-ri-sun-line dark:i-ri-moon-line text-2xl
      no-underline cursor-pointer transition-all
      ease-in hover:text-momo hover:opacity-90
      @click="toggleDark"
    />

    <template #fallback>
      <div i-ri-loader-line text-2xl animate-spin />
    </template>
  </ClientOnly>
</template>
