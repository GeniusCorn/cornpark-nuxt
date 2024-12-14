<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const route = useRoute()

const dir = computed(() => route.path.split('/').at(2))
const path = computed(() => route.path.split(dir.value as string).splice(1).join(''))

const { data: page } = await useAsyncData(path.value as string, () => {
  return queryCollection(dir.value as keyof PageCollections)
    .path(`/${dir.value}${path.value}`)
    .first()
})
</script>

<template>
  <NuxtLink
    flex flex-row cursor-pointer items-center gap-2 no-underline transition-all hover:text-momo
    @click="$router.go(-1)"
  >
    <div i-ri-arrow-left-fill />
    <div>
      Back
    </div>
  </NuxtLink>

  <ContentRenderer
    v-if="page"
    mt-20
    :value="page"
  />
</template>
