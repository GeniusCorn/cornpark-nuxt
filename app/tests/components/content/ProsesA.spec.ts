import { ProseA } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('proseA', () => {
  it('should render', async () => {
    const component = await mountSuspended(ProseA)

    expect(component.html()).toBeDefined()
  })
})
