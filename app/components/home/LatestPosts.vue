<script setup lang="ts">
const allPosts = await queryCollection('posts')
  .limit(3)
  .order('date', 'DESC')
  .all()
</script>

<template>
  <HomePostList :posts="allPosts" />
</template>
