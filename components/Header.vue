<script lang="ts" setup>

</script>

<template>
  <header>
    <div class="flex flex-row gap-4 items-center justify-between px-4 py-2">
      <NuxtLink font-logo to="/">
        CornPark
      </NuxtLink>

      <div class="flex flex-row gap-4 items-center">
        <NuxtLink to="/">
          <div i-ri-home-2-line />
        </NuxtLink>

        <NuxtLink to="/posts">
          <div i-ri-article-line />
        </NuxtLink>

        <NuxtLink to="/projects">
          <div i-ri-apps-line />
        </NuxtLink>

        <NuxtLink
          to="https://github.com/GeniusCorn"
          external
          target="_blank"
        >
          <div i-ri-github-line />
        </NuxtLink>

        <NuxtLink
          to="https://bsky.app/profile/nicecorn.bsky.social"
          external
          target="_blank"
        >
          <div i-ri-bluesky-line />
        </NuxtLink>

        <NuxtLink>
          <div i-ri-moon-line />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  @apply text-2xl text-black hover:text-momo transition-all no-underline;
}
</style>
