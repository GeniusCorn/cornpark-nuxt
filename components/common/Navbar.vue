<script lang="ts" setup>
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.value === 'light'
    ? colorMode.preference = 'dark'
    : colorMode.preference = 'light'
}
</script>

<template>
  <nav flex flex-row gap-4 justify-between p-10 items-center>
    <NuxtLink to="/">
      <div font-montserrat text-3xl>
        CornPark
      </div>
    </NuxtLink>

    <div
      md:flex flex-row gap-4 items-center opacity-60
      hidden
    >
      <NuxtLink to="/blog">
        <div>
          Blog
        </div>
      </NuxtLink>
      <NuxtLink to="/projects">
        <div>Projects</div>
      </NuxtLink>

      <div flex flex-row gap-4 items-center class="socialMedia">
        <NuxtLink to="https://github.com/GeniusCorn" target="_blank">
          <div i-tabler-brand-github />
        </NuxtLink>
        <NuxtLink to="https://elk.zone/mas.to/@geniuscorn" target="_blank">
          <div i-tabler-brand-mastodon />
        </NuxtLink>
        <NuxtLink to="mailto:hi@nicecorn.com">
          <div i-tabler-mail />
        </NuxtLink>
        <NuxtLink to="https://steamcommunity.com/profiles/76561198145160817/" target="_blank">
          <div i-tabler-brand-steam />
        </NuxtLink>

        <!-- // TODO: Add Nintendo Account Link -->
        <!-- <NuxtLink to="">
          <div i-tabler-device-nintendo />
        </NuxtLink> -->
        <div i-tabler-sun dark:i-tabler-moon @click="toggleColorMode" />
      </div>
    </div>
    <div
      flex flex-row gap-4 items-center opacity-60 md:hidden
      class="socialMedia"
    >
      <NuxtLink to="/blog">
        <div i-tabler-notebook />
      </NuxtLink>
      <NuxtLink to="/projects">
        <div i-tabler-bulb />
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
a {
  @apply no-underline text-base hover:text-momo hover:opacity-90 transition-all ease-in-out
}

.socialMedia > a,
.socialMedia > div {
  @apply text-2xl cursor-pointer hover:text-momo transition-all ease-in no-underline hover:opacity-90
}
</style>
