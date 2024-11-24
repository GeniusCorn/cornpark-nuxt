<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const dir = computed(() => route.path.split('/').at(-2))
const path = computed(() => route.path.split('/').at(-1))

const { data: page } = await useAsyncData(path.value as string, () => {
  return queryCollection(dir.value as keyof PageCollections).path(`/${path.value as string}`).first()
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
