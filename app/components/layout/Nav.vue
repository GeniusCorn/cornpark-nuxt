<script lang="ts" setup>
import type { ThemeName } from '~/utils/theme-switch-engine'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
const theme = computed<ThemeName>(() => (isDark.value ? 'dark' : 'light'))

function changeTheme(next: ThemeName) {
  colorMode.preference = next
}
</script>

<template>
  <div
    class="font-inter mx-auto py-4 flex flex-row gap-4 max-w-2xl items-center justify-between"
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

      <UiTooltip
        content="GitHub"
        placement="bottom"
      >
        <NuxtLink
          class="i-ri-github-line size-6"
          href="https://github.com/GeniusCorn"
          target="_blank"
        />
      </UiTooltip>

      <UiTooltip
        content="Bluesky"
        placement="bottom"
      >
        <NuxtLink
          class="i-ri-bluesky-line size-6"
          href="https://bsky.app/profile/nicecorn.bsky.social"
          target="_blank"
        />
      </UiTooltip>

      <ClientOnly>
        <UiTooltip
          :content="isDark ? 'Sun Sun' : 'Night Night'"
          placement="bottom"
        >
          <UiThemeSwitch
            :theme="theme"
            @change="changeTheme"
          />
        </UiTooltip>

        <template #fallback>
          <div
            class="i-ri-loader-2-line size-6 animate-spin"
          />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
