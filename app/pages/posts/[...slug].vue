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
    <div
      class="flex flex-row gap-2 items-center justify-between"
    >
      <div
        class="text-3xl font-bold"
      >
        {{ page?.title }}
      </div>

      <div
        class="flex flex-row gap-2 items-center"
      >
        <UiTooltip
          :content="page?.lang === 'zh' ? '中文' : 'English'"
          placement="bottom"
        >
          <div
            :class="page?.lang === 'zh' ? 'i-icon-park-outline-chinese' : 'i-icon-park-outline-english'"
          />
        </UiTooltip>

        <div
          v-if="page?.date"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ formatDate(page.date) }}
        </div>
      </div>
    </div>

    <ContentRenderer
      v-if="page"
      :value="page"
    />

    <UiBackToTop />
  </div>
</template>
