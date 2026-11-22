import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { tools } from './TecStack.tools'
import TecStack from './TecStack.vue'
import 'uno.css'

const cardSelector = (name: string) => `a[title="${name}"]`

describe('tecstack', () => {
  // Guard: these return null/undefined under happy-dom, so passing means a real browser is in use
  it('runs in a real browser', () => {
    expect(document.createElement('canvas').getContext('2d')).toBeTruthy()
    expect(window.getComputedStyle(document.body).display).toBeDefined()
  })

  it('renders one external card per tool, in order', async () => {
    const wrapper = await mountSuspended(TecStack, { attachTo: document.body })
    const cards = wrapper.findAll('a')

    expect(cards).toHaveLength(tools.length)
    // titles are the card keys: equal and in order means no duplicates and no dropped entry
    expect(cards.map(card => card.attributes('title'))).toEqual(tools.map(tool => tool.name))

    for (const tool of tools) {
      const card = wrapper.get(cardSelector(tool.name))
      expect(card.attributes('href'), tool.name).toBe(tool.href)
      expect(card.attributes('target'), tool.name).toBe('_blank')
      expect(card.attributes('rel'), tool.name).toBe('noopener noreferrer')
      expect(card.get('span').classes(), tool.name).toContain(tool.icon)
    }

    wrapper.unmount()
  })

  it('resolves every icon to a rendered inline svg', async () => {
    const wrapper = await mountSuspended(TecStack, { attachTo: document.body })

    expect(wrapper.findAll('a > span')).toHaveLength(tools.length)

    for (const tool of tools) {
      const span = wrapper.get(`${cardSelector(tool.name)} > span`)
      const style = getComputedStyle(span.element)
      // A wrong or uninstalled icon collection yields "none" here and the card renders blank
      expect(style.backgroundImage, tool.icon).toContain('data:image/svg+xml')
      expect(Number.parseFloat(style.width), tool.icon).toBeGreaterThan(0)
      expect(Number.parseFloat(style.height), tool.icon).toBeGreaterThan(0)
    }

    wrapper.unmount()
  })
})
