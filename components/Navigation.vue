<script lang="ts" setup>
import type {
  ContentNavigationItem,
  PageCollections,
} from '@nuxt/content'
import { useStorage } from '@vueuse/core'

const dir = useStorage('dir', 'huisi')

const { data: posts, execute } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation(dir.value as keyof PageCollections, ['date'])
    .order('date', 'DESC')
})

const nav = computed(
  () =>
    flattenAndExtractFiles(posts.value || []),
)

async function changeDir(newDir: string) {
  dir.value = newDir as keyof PageCollections

  await execute()
}

function flattenAndExtractFiles(data: ContentNavigationItem[]) {
  const files: ContentNavigationItem[] = []

  function traverse(items: ContentNavigationItem[]) {
    items.forEach((item) => {
      if (item.page !== false) {
        files.push(item)
      }
      else if (Array.isArray(item.children)) {
        traverse(item.children)
      }
    })
  }

  traverse(data)

  return files
}
</script>

<template>
  <ClientOnly>
    <div class="flex flex-row justify-center gap-4">
      <div
        class="menu"
        :class="{ 'text-momo': dir === 'huisi' }"
        @click="changeDir('huisi')"
      >
        慧思
      </div>
      <div
        class="menu"
        :class="{ 'text-momo': dir === 'jingdu' }"
        @click="changeDir('jingdu')"
      >
        精读
      </div>
      <div
        class="menu"
        :class="{ 'text-momo': dir === 'puti' }"
        @click="changeDir('puti')"
      >
        菩提
      </div>
      <div
        class="menu"
        :class="{ 'text-momo': dir === 'wudao' }"
        @click="changeDir('wudao')"
      >
        悟道
      </div>
      <div
        class="menu"
        :class="{ 'text-momo': dir === 'xiuxing' }"
        @click="changeDir('xiuxing')"
      >
        修行
      </div>
    </div>

    <template #fallback>
      <div flex items-center justify-center text-xl opacity-20>
        Loading navigation...
      </div>
    </template>
  </ClientOnly>

  <div mt-20 flex flex-col gap-4 text-lg>
    <div
      v-for="post in nav"
      :key="post.path"
    >
      <NuxtLink
        :to="`/posts${post.path}`"
        no-underline transition-all hover:text-momo
      >
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.menu {
  @apply hover:text-momo transition-all text-xl cursor-pointer;
}
</style>
