import { ScrollToTop } from '#components'
import {
  mockNuxtImport,
  mountSuspended,
} from '@nuxt/test-utils/runtime'

const {
  scrollToMock,
  useWindowScrollMock,
} = vi.hoisted(() => {
  return {
    scrollToMock: vi.fn(),
    useWindowScrollMock: vi.fn(() => {
      return {
        y: 0,
      }
    }),
  }
})

vi.stubGlobal('scrollTo', scrollToMock)

mockNuxtImport('useWindowScroll', () => {
  return useWindowScrollMock
})

describe('scroll to top button', () => {
  it('should be rendered', async () => {
    const component = await mountSuspended(ScrollToTop)

    expect(component.html()).toBeDefined()
  })

  it('should be hidden when scroll position <= 300', async () => {
    useWindowScrollMock.mockImplementation(() => ({
      y: 201,
    }))
    const component = await mountSuspended(ScrollToTop)

    expect(component.classes()).toContain('op0')
    expect(component.classes()).not.toContain('op30')
    expect(component.attributes('class')).toContain('pointer-events-none')
  })

  it('should be visible when scroll position > 300', async () => {
    useWindowScrollMock.mockImplementation(() => ({
      y: 301,
    }))
    const component = await mountSuspended(ScrollToTop)

    expect(component.classes()).toContain('op30')
    expect(component.classes()).not.toContain('op0')
    expect(component.attributes('class')).not.toContain('pointer-events-none')
  })

  it('should call window.scrollTo on click', async () => {
    const component = await mountSuspended(ScrollToTop)

    await component.trigger('click')
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    })
  })
})
