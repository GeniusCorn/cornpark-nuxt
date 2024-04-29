<script lang="ts" setup>
useHead({
  title: 'ALL',
})

const queryPath = useState('queryPath', () => '/blog')
const skip = useState('skip', () => 0)
const count = ref<number>(0)

const query
  = reactive<any>({
    path: queryPath,
    skip,
    limit: 10,
    where: [{
      _dir: { $ne: 'blog' },
    }],
    sort: [{ $numeric: 1 }],
  })

async function updateListCount(queryPath: string) {
  count.value
    = await queryContent(queryPath)
      .where({ _dir: { $ne: 'blog' } })
      .count()
}

onMounted(async () =>
  await updateListCount(queryPath.value))

function previousPage() {
  if (skip.value < query.limit)
    return

  skip.value = skip.value - query.limit
}

function nextPage() {
  skip.value = skip.value + query.limit
}

async function onUpdateQueryPath(newQueryPath: string) {
  skip.value = 0
  await updateListCount(newQueryPath)
  queryPath.value = newQueryPath
}
</script>

<template>
  <BlogTab :query-path @update="onUpdateQueryPath($event)" />

  <main px-12 pb-12>
    <ContentList v-slot="{ list }" :query="query">
      <div
        v-for="article in list" :key="article.id"
        m-auto cursor-pointer font-sans transition-all prose
        hover:text-momo
        @click="$router.push(article._path as string)"
      >
        <div flex flex-row items-center justify-between>
          <h1>{{ article.title }}</h1>
          <div
            v-if="article.time"
            text-xs op-60
          >
            {{ $dayjs(article.time).format('L') }}
          </div>
        </div>
        <p>{{ article.description }}</p>
      </div>

      <div flex items-center justify-center gap-4>
        <div
          v-if="skip > 0"
          i-tabler-arrow-big-left
          hover:text-momo
          class="pageButton"
          @click="previousPage"
        />
        <div
          v-else
          i-tabler-arrow-big-left-filled
          cursor-no-drop text-2xl
        />

        <div text-sm>
          Page {{ (skip / query.limit) + 1 }}
        </div>

        <div
          v-if="count - skip > query.limit"
          i-tabler-arrow-big-right
          hover:text-momo
          class="pageButton"
          @click="nextPage"
        />
        <div
          v-else
          i-tabler-arrow-big-right-filled
          cursor-no-drop text-2xl
        />
      </div>
    </ContentList>
  </main>
</template>

<style scoped>
.pageButton {
  @apply text-2xl cursor-pointer transition-all
}
</style>
