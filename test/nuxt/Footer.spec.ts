import { Footer } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

describe('Footer', () => {
  it('should render', async () => {
    const component = await mountSuspended(Footer)

    expect(component.exists()).toBe(true)
    expect(component.find('footer').exists()).toBe(true)
  })

  it('should display current year', async () => {
    const component = await mountSuspended(Footer)

    const currentYear = new Date().getFullYear()
    const yearText = component.text()

    expect(yearText).toContain(currentYear.toString())
  })

  it('should update year', async () => {
    const mockDate = new Date('2020-01-01')
    vi.setSystemTime(mockDate)

    const component = await mountSuspended(Footer)
    expect(component.text()).toContain('2020')

    vi.useRealTimers()
  })
})
