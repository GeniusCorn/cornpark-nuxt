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
  <div flex gap-4 items-center justify-center mb-4>
    <NuxtLink :to="props.link" target="_blank">
      <div
        text-3xl flex-none hover:text-momo transition-all
        :class="props.icon"
      />
    </NuxtLink>

    <div w-full>
      <div flex gap-2 items-center>
        <div text-2xl font-bebas>
          {{ props.title }}
        </div>

        <div
          v-if="props.archived"
          text-xs bg-amber px-2 rounded-full font-bold text-white dark:text-black
        >
          ARCHIVED
        </div>

        <div
          v-if="props.outOfService"
          text-xs bg-rose px-2 rounded-full font-bold text-white dark:text-black
        >
          OUT OF SERVICE
        </div>
      </div>

      <div text-base font-roboto>
        {{ props.description }}
      </div>
    </div>

    <div text-2xl flex gap-2 items-center>
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
