<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document
    .startViewTransition
    && !window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .matches

  if (!isAppearanceTransition) {
    colorMode.preference = colorMode.value
      === 'dark'
      ? 'light'
      : 'dark'
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document
    .startViewTransition(async () => {
      colorMode.preference = colorMode.value
        === 'dark'
        ? 'light'
        : 'dark'
      await nextTick()
    })
  transition.ready
    .then(() => {
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
          easing: 'ease-out',
          fill: 'forwards',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <div
    class="mx-auto py-4 flex flex-row gap-4 max-w-2xl items-center justify-between"
  >
    <NuxtLink
      class="text-xl no-underline flex flex-row gap-4 transition items-center hover:text-momo"
      href="/"
    >
      <img
        class="rounded-full size-12"
        src="/avatar.svg"
      >

      <div>
        CornPark
      </div>
    </NuxtLink>

    <div
      class="flex flex-row gap-4 items-center justify-between *:(transition hover:text-momo)"
    >
      <NuxtLink
        href="/blog"
      >
        Blog
      </NuxtLink>

      <NuxtLink
        class="i-ri-github-line size-6"
        href="https://github.com/GeniusCorn"
        target="_blank"
      />

      <NuxtLink
        class="i-ri-bluesky-line size-6"
        href="https://bsky.app/profile/nicecorn.bsky.social"
        target="_blank"
      />

      <ClientOnly>
        <div
          class="size-6 cursor-pointer"
          :class="isDark ? 'i-ri-moon-line' : 'i-ri-sun-line'"
          @click="toggleColorMode"
        />

        <template #fallback>
          <div
            class="i-ri-loader-2-line size-6 animate-spin"
          />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
