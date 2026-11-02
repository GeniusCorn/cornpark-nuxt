<script setup lang="ts">
import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
  alt: {
    default: '',
    type: String,
  },
  height: {
    default: undefined,
    type: [String, Number],
  },
  src: {
    default: '',
    type: String,
  },
  width: {
    default: undefined,
    type: [String, Number],
  },
})

function withLeadingSlash(path: string) {
  return path.startsWith('/')
    ? path
    : `/${path}`
}

function withTrailingSlash(path: string) {
  return path.endsWith('/')
    ? path
    : `${path}/`
}

function joinURL(base: string, src: string) {
  return `${base}${src.startsWith('/')
    ? src.slice(1)
    : src}`
}

// Mirror mdc's default ProseImg baseURL resolution (only matters under a sub-path deployment)
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const { open } = useLightbox()

function preview() {
  if (refinedSrc.value) {
    open(refinedSrc.value, props.alt)
  }
}
</script>

<template>
  <component
    :is="ImageComponent"
    :alt="props.alt"
    aria-haspopup="dialog"
    :aria-label="`View image: ${props.alt || 'Untitled image'}`"
    class="rounded-sm cursor-zoom-in transition-shadow duration-200 hover:shadow-lg"
    :height="props.height"
    role="button"
    :src="refinedSrc"
    tabindex="0"
    :width="props.width"
    @click="preview"
    @keydown.enter="preview"
    @keydown.space.prevent="preview"
  />
</template>
