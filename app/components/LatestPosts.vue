<script lang="ts" setup>
const allPosts = await queryCollection('posts')
  .limit(3)
  .order('date', 'DESC')
  .all()

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
</script>

<template>
  <div
    class="gap-4 grid grid-cols-1"
  >
    <NuxtLink
      v-for="post in allPosts"
      :key="post.id"
      class="group p-4 border border-black/5 rounded-2xl bg-white/60 flex flex-col gap-1 shadow-sm transition-all duration-200 ease-out dark:border-white/10 hover:border-momo/30 dark:bg-white/5 hover:bg-momo/10 hover:shadow-lg dark:hover:border-momo/40 dark:hover:bg-momo/20"
      :to="`${post.path}`"
    >
      <div
        class="font-medium mt-2"
      >
        {{ post.title }}
      </div>

      <div
        class="text-sm text-black/60 dark:text-white/60"
      >
        {{ formatDate(post.date) }}
      </div>
    </NuxtLink>
  </div>
</template>
