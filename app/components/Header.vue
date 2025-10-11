<template>
  <header>
    <div
      p-6 flex flex-row gap-4
      items-center justify-between
    >
      <NuxtLink
        font-logo
        to="/"
      >
        CornPark
      </NuxtLink>

      <div class="flex flex-row gap-4 items-center">
        <NuxtLink to="/posts?category=huisi">
          <div i-ri-article-line />
        </NuxtLink>

        <!-- <NuxtLink to="/projects">
          <div i-ri-apps-line />
        </NuxtLink> -->

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

        <ToggleDarkModeButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  @apply text-2xl text-base hover:text-momo transition-all no-underline;
}
</style>
