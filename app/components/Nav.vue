<script lang="ts" setup>

</script>

<template>
  <div
    class="mx-auto py-4 flex flex-row gap-4 max-w-2xl items-center justify-between"
  >
    <NuxtLink
      class="text-xl transition hover:text-momo"
      href="/"
    >
      CornPark
    </NuxtLink>

    <div
      class="flex flex-row gap-4 items-center *:(size-6 transition hover:text-momo)"
    >
      <NuxtLink
        class="i-ri-github-line"
        href="https://github.com/GeniusCorn"
        target="_blank"
      />

      <NuxtLink
        class="i-ri-bluesky-line"
        href="https://bsky.app/profile/nicecorn.bsky.social"
        target="_blank"
      />
    </div>
  </div>
</template>
