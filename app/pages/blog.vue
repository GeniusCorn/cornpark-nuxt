<script setup lang="ts">
const allPosts = await queryCollection('posts')
  .order('date', 'DESC')
  .all()
</script>

<template>
  <div
    class="mx-auto max-w-2xl prose [&_a]:no-underline dark:prose-invert"
  >
    <!-- prose gives the cards the same link hover style as the home page -->
    <HomePostList :posts="allPosts" />
  </div>
</template>
