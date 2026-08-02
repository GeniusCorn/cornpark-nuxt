<script lang="ts" setup>

</script>

<template>
  <div
    class="mx-auto py-4 flex flex-row gap-4 max-w-2xl items-center justify-between"
  >
    <NuxtLink
      class="text-xl no-underline transition hover:text-momo"
      href="/"
    >
      CornPark
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
    </div>
  </div>
</template>
