import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import Lightbox from './Lightbox.vue'

describe('lightbox', () => {
  it('moves focus to the close button when it opens', async () => {
    const { close, open } = useLightbox()
    const wrapper = await mountSuspended(Lightbox, { attachTo: document.body })

    open('/image.png', 'An image')
    // the dialog is teleported to the end of the body: without focus moving into
    // it, Tab walks the page behind and the close button is out of reach
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Close preview'))

    close()
    wrapper.unmount()
  })
})
