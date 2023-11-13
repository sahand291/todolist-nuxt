import { mount } from '@vue/test-utils'
import Todos from '@/components/Todos.vue'

describe('Todos', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Todos)
    expect(wrapper.vm).toBeTruthy()
  })
})
