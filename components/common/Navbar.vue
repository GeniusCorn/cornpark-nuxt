<script lang="ts" setup>

</script>

<template>
  <nav flex flex-row items-center justify-between gap-4 p-10>
    <NuxtLink to="/">
      <div text-3xl font-montserrat>
        CornPark
      </div>
    </NuxtLink>

    <div
      hidden flex-row items-center gap-4 opacity-60 md:flex
    >
      <NuxtLink to="/blog">
        <div>
          Blog
        </div>
      </NuxtLink>
      <NuxtLink to="/projects">
        <div>Projects</div>
      </NuxtLink>

      <div flex flex-row items-center gap-4 class="socialMedia">
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

        <CommonToggleDarkModeButton />
      </div>
    </div>
    <div
      flex flex-row items-center gap-4 opacity-60 md:hidden
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
