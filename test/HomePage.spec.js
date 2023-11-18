import { mount, shallowMount } from '@vue/test-utils'
import HomePage from '@/pages/index.vue'

describe('HomePage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(HomePage, {
      methods: {
        getAllTodoLists() {},
      },
    })
  })

  test('HomePage is created', () => {
    expect(wrapper).toBeTruthy()
  })
})
