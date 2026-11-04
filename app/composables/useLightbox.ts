interface LightboxState {
  open: boolean
  src: string
  alt: string
}

/**
 * Global singleton lightbox state.
 * Any component can call `useLightbox().open(src, alt)` to show a preview;
 * it is rendered by `<UiLightbox />` mounted in the layout.
 */
const state = reactive<LightboxState>({
  alt: '',
  open: false,
  src: '',
})

export function useLightbox() {
  function open(src: string, alt = '') {
    state.src = src
    state.alt = alt
    state.open = true
  }

  function close() {
    state.open = false
  }

  return {
    close,
    open,
    state: readonly(state),
  }
}
