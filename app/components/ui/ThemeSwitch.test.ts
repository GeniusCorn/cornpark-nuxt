import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import ThemeSwitch from './ThemeSwitch.vue'

/* reduced motion makes the engine commit at once, so a test need not wait for the rain */
function reducedMotion() {
  vi.stubGlobal('matchMedia', (query: string) => ({
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => false,
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    removeEventListener: () => {},
    removeListener: () => {},
  }))
}

describe('theme switch', () => {
  it('switches to the other theme when the toggle is pressed', async () => {
    reducedMotion()
    const wrapper = await mountSuspended(ThemeSwitch, {
      attachTo: document.body,
      props: { theme: 'light' },
    })

    const button = wrapper.get('.size-6')
    expect(button.classes()).toContain('i-ri-sun-line')

    await button.trigger('click')
    await vi.waitFor(() => expect(wrapper.emitted('change')).toBeTruthy())
    expect(wrapper.emitted('change')![0]).toEqual(['dark'])

    vi.unstubAllGlobals()
    wrapper.unmount()
  })

  it('paints the scene behind the page, over the whole viewport', async () => {
    const wrapper = await mountSuspended(ThemeSwitch, {
      attachTo: document.body,
      props: { theme: 'dark' },
    })

    const scene = document.querySelector('.pts') as HTMLElement
    expect(scene).toBeTruthy()
    expect(scene.dataset.theme).toBe('dark')
    expect(scene.getBoundingClientRect().width).toBeGreaterThan(window.innerWidth - 20)
    // behind the content, so the rain never covers it
    expect(getComputedStyle(scene).zIndex).toBe('-1')

    wrapper.unmount()
  })
})
