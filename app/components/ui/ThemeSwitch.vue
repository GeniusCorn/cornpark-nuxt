<script setup lang="ts">
import type { ThemeName, ThemeSwitchEngine } from '~/utils/theme-switch-engine'
import { createThemeSwitch } from '~/utils/theme-switch-engine'

defineProps<{ theme: ThemeName }>()

const emit = defineEmits<{ change: [theme: ThemeName] }>()

const rootRef = ref<HTMLElement>()
const buttonRef = ref<HTMLElement>()
const fxRef = ref<HTMLElement>()

let engine: ThemeSwitchEngine | null = null

onMounted(() => {
  engine = createThemeSwitch({
    button: buttonRef.value!,
    fx: fxRef.value!,
    onCommit: next => emit('change', next),
    root: rootRef.value!,
  })
})

onBeforeUnmount(() => {
  engine?.destroy()
  engine = null
})
</script>

<template>
  <!-- the nav's own toggle, untouched: the engine only drives the effect -->
  <div
    ref="buttonRef"
    class="size-6 cursor-pointer"
    :class="theme === 'dark' ? 'i-ri-moon-line' : 'i-ri-sun-line'"
  />

  <!-- the scene: the whole viewport, behind the page, so only the background rains -->
  <Teleport to="body">
    <div
      ref="rootRef"
      class="pts"
      :data-theme="theme"
    >
      <div
        ref="fxRef"
        aria-hidden="true"
        class="pts__fx"
      />
    </div>
  </Teleport>
</template>
