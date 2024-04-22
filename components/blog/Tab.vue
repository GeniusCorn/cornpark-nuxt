<script lang="ts" setup>
defineProps<{
  queryPath: string
}>()
const emit = defineEmits<{
  update: [value: string]
}>()

const contentQuery
  = await queryContent('blog').where({ _dir: { $eq: 'blog' } }).find()

function changePath(path: string) {
  emit('update', path)
}
</script>

<template>
  <div flex flex-row justify-center gap-4>
    <div
      :class="{ activeTab: queryPath === '/blog' }"
      class="tab"
      @click="changePath('/blog')"
    >
      ALL
    </div>
    <template
      v-for="tab in contentQuery"
      :key="tab._path"
    >
      <div
        :class="{ activeTab: queryPath === tab._path }"
        class="tab"
        @click="changePath(tab._path as string)"
      >
        {{ tab.title }}
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
.tab {
  @apply hover:text-momo cursor-pointer transition-all
}

.activeTab{
  @apply text-[#f596AA]
}
</style>
