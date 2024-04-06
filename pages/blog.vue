<script lang="ts" setup>
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const queryPath = ref('/blog')

const query
  = reactive<QueryBuilderParams>({
    path: queryPath,
    skip: 0,
    limit: 10,
  })
const count = await queryContent(queryPath.value).count()

function previousPage() {
  if (query.skip as number < (query.limit as number))
    return

  query.skip = query.skip as number - (query.limit as number)
}

function nextPage() {
  query.skip = query.skip as number + (query.limit as number)
}
</script>

<template>
  <BlogTab :query-path @update="queryPath = $event" />

  <main px-12 pb-12>
    <ContentList v-slot="{ list }" :query="query">
      <div
        v-for="article in list" :key="article._path"
        m-auto prose font-sans cursor-pointer hover:text-momo transition-all
        @click="$router.push(article._path)"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <p>link: {{ article._path }}</p>
      </div>

      <div flex justify-center items-center gap-4>
        <div
          v-if="query.skip as number > 0"
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
          Page {{ (query.skip as number / (query.limit as number)) + 1 }}
        </div>

        <div
          v-if="count - (query.skip as number) > (query.limit as number)"
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
