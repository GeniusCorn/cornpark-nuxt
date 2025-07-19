<script lang="ts" setup>
import type {
  ContentNavigationItem,
  PageCollections,
} from '@nuxt/content'
import { useRouteQuery } from '@vueuse/router'

const category = useRouteQuery<keyof PageCollections>('category')

const {
  data: posts,
  execute,
  status,
} = await useAsyncData('navigation', () => {
  return queryCollectionNavigation(category.value, ['date'])
    .order('date', 'DESC')
})

const nav = computed<ContentNavigationItem[]>(
  () =>
    flattenAndExtractFiles(posts.value || []),
)

const randomCount = useState('randomCount', () => (Math.floor(Math.random() * 6) + 5))

async function changeDir(newDir: keyof PageCollections) {
  category.value = newDir

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
  <div class="flex flex-row gap-4 justify-center">
    <div
      class="menu"
      :class="{ 'text-momo': category === 'huisi' }"
      @click="changeDir('huisi')"
    >
      慧思
    </div>
    <div
      class="menu"
      :class="{ 'text-momo': category === 'jingdu' }"
      @click="changeDir('jingdu')"
    >
      精读
    </div>
    <div
      class="menu"
      :class="{ 'text-momo': category === 'puti' }"
      @click="changeDir('puti')"
    >
      菩提
    </div>
    <div
      class="menu"
      :class="{ 'text-momo': category === 'wudao' }"
      @click="changeDir('wudao')"
    >
      悟道
    </div>
    <div
      class="menu"
      :class="{ 'text-momo': category === 'xiuxing' }"
      @click="changeDir('xiuxing')"
    >
      修行
    </div>
  </div>

  <div text-lg mt-20>
    <div
      v-if="status === 'success'"
      flex flex-col gap-4
    >
      <div
        v-for="post in nav"
        :key="post.path"
      >
        <NuxtLink
          :to="`/posts${post.path}`"
          no-underline flex flex-row transition-all items-center justify-between hover:text-momo
        >
          <div>
            {{ post.title }}
          </div>
          <div
            v-if="post.date"
            text-xs opacity-60
          >
            {{
              $dayjs(post.date as string).format('MMMM D, YYYY')
            }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="status === 'pending'"
      flex flex-col gap-4 animate-pulse
    >
      <div
        v-for="i in randomCount"
        :key="i"
        rounded bg-slate-200 h-6 w-full
      />
    </div>

    <div
      v-if="status === 'error'"
      flex items-center justify-center
    >
      <div>
        No content.
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  @apply hover:text-momo transition-all text-xl cursor-pointer;
}
</style>
