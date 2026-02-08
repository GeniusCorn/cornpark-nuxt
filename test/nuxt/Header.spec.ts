import { Header } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

describe('Header', () => {
  it('should render', async () => {
    const component = await mountSuspended(Header)

    expect(component.exists()).toBe(true)
    expect(component.find('header').exists()).toBe(true)
  })

  it('should have CornPark link to home', async () => {
    const component = await mountSuspended(Header)

    const homeLink = component.find('a[href="/"]')
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.text()).toBe('CornPark')
  })

  it('should have posts link', async () => {
    const component = await mountSuspended(Header)

    const postsLink = component.find('a[href="/posts?category=huisi"]')
    expect(postsLink.exists()).toBe(true)
  })

  it('should have GitHub external link', async () => {
    const component = await mountSuspended(Header)

    const githubLink = component.find('a[href="https://github.com/GeniusCorn"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('target')).toBe('_blank')
  })

  it('should have Bluesky external link', async () => {
    const component = await mountSuspended(Header)

    const bskyLink = component.find('a[href="https://bsky.app/profile/nicecorn.bsky.social"]')
    expect(bskyLink.exists()).toBe(true)
    expect(bskyLink.attributes('target')).toBe('_blank')
  })

  it('should render ToggleDarkModeButton', async () => {
    const component = await mountSuspended(Header)

    const toggleButton = component.findComponent({ name: 'ToggleDarkModeButton' })
    expect(toggleButton.exists()).toBe(true)
  })
})
