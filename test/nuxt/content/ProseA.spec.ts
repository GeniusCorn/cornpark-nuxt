import { ProseA } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

describe('ProseA', () => {
  it('should render', async () => {
    const component = await mountSuspended(ProseA)

    expect(component.html()).toBeDefined()
  })
})
