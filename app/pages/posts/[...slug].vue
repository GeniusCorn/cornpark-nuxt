<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(
  `page-${route.path}`,
  () => {
    return queryCollection('posts')
      .path(route.path)
      .first()
  },
)

if (!page.value) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

useSeoMeta({
  description: () => page.value?.description,
  ogDescription: () => page.value?.description,
  ogTitle: () => `${page.value?.title} | CornPark`,
  title: () => `${page.value?.title} | CornPark`,
})
</script>

<template>
  <div
    class="mx-auto max-w-2xl prose dark:prose-invert"
  >
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
