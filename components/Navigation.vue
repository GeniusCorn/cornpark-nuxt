<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const dir = ref<keyof PageCollections>('huisi')

const { data, execute } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation(dir.value)
})

function changeDir(newDir: string) {
  dir.value = newDir as keyof PageCollections

  execute()
}
</script>

<template>
  <div class="flex flex-row gap-4">
    <div @click="changeDir('huisi')">
      慧思
    </div>
    <div @click="changeDir('jingdu')">
      精读
    </div>
  </div>

  <ul>
    <li v-for="item in data" :key="item.path">
      <NuxtLink :to="`/posts/${dir}${item.path}`">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>

</style>
