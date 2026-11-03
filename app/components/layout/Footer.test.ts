import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import Footer from './Footer.vue'

describe('footer', () => {
  it('renders the ICP filing link as an external link', async () => {
    const wrapper = await mountSuspended(Footer)
    const link = wrapper.get('a')

    expect(link.text()).toBe('粤 ICP 备 20026972 号')
    expect(link.attributes('href')).toBe('https://beian.miit.gov.cn/')
    expect(link.attributes('target')).toBe('_blank')
  })

  it('renders the current year and copyright', async () => {
    const wrapper = await mountSuspended(Footer)

    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
    expect(wrapper.text()).toContain('© GeniusCorn')
  })
})
