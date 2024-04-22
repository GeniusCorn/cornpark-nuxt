<script lang="ts" setup>
const props = defineProps<{
  icon: string
  title: string
  description: string
  githubLink: string
  link: string

  archived?: boolean
  outOfService?: boolean
}>()
</script>

<template>
  <div mb-4 flex items-center justify-center gap-4>
    <NuxtLink :to="props.link" target="_blank">
      <div
        flex-none text-3xl transition-all hover:text-momo
        :class="props.icon"
      />
    </NuxtLink>

    <div w-full>
      <div flex items-center gap-2>
        <div text-2xl font-bebas>
          {{ props.title }}
        </div>

        <div
          v-if="props.archived"
          rounded-full bg-amber px-2 text-xs text-white font-bold dark:text-black
        >
          ARCHIVED
        </div>

        <div
          v-if="props.outOfService"
          rounded-full bg-rose px-2 text-xs text-white font-bold dark:text-black
        >
          OUT OF SERVICE
        </div>
      </div>

      <div font-roboto text-base>
        {{ props.description }}
      </div>
    </div>

    <div flex items-center gap-2 text-2xl>
      <NuxtLink :to="props.githubLink" target="_blank">
        <div i-tabler-brand-github />
      </NuxtLink>
      <NuxtLink :to="props.link" target="_blank">
        <div i-tabler-link />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
  @apply hover:text-momo transition-all;
}
</style>
