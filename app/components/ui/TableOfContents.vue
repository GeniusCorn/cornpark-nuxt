<script setup lang="ts">
export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = withDefaults(
  defineProps<{
    links?: TocLink[]
    title?: string
  }>(),
  {
    links: () => [],
    title: 'Contents',
  },
)

interface FlatLink {
  id: string
  text: string
  level: number
}

const flatLinks = computed<FlatLink[]>(() => {
  const result: FlatLink[] = []
  const walk = (items: TocLink[], level: number) => {
    for (const item of items) {
      result.push({ id: item.id, level, text: item.text })
      if (item.children?.length) {
        walk(item.children, level + 1)
      }
    }
  }
  walk(props.links, 0)

  return result
})

const SCROLL_OFFSET = 16

const { y } = useWindowScroll({ behavior: 'smooth' })

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el)
    return

  const top = el
    .getBoundingClientRect()
    .top + window.scrollY - SCROLL_OFFSET
  y.value = Math.max(top, 0)
  history.replaceState(null, '', `#${id}`)
}
</script>

<template>
  <nav
    v-if="flatLinks.length"
    aria-label="Table of contents"
    class="text-sm"
  >
    <div
      class="text-xs text-black/40 tracking-wide font-bold mb-2 uppercase dark:text-white/40"
    >
      {{ title }}
    </div>

    <ul
      class="border-l border-black/10 space-y-1 dark:border-white/10"
    >
      <li
        v-for="link in flatLinks"
        :key="link.id"
      >
        <a
          class="text-black/50 py-0.5 pr-2 border-l border-transparent block transition-colors duration-200 dark:text-white/50 hover:(text-momo border-momo) -ml-px"
          :href="`#${link.id}`"
          :style="{ paddingLeft: `${0.75 + link.level * 0.75}rem` }"
          @click.prevent="scrollToHeading(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
