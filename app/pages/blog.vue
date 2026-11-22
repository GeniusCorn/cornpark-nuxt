<script setup lang="ts">
const allPosts = await queryCollection('posts')
  .order('date', 'DESC')
  .all()
</script>

<template>
  <div
    class="mx-auto max-w-2xl"
  >
    <HomePostList :posts="allPosts" />
  </div>
</template>
