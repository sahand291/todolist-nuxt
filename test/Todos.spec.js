import { mount } from '@vue/test-utils'
import Todos from '@/components/Todos.vue'

describe('Todos', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Todos, {
      propsData: {
        todos: [
          {
            todoId: 'id',
            todoDescription: 'description',
            todoTitle: 'title',
          },
        ],
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
    expect(Todos).toBeDefined()
  })
  test('printHello method should return hello', () => {
    expect(Todos.methods.printHello()).toBe('hello')
  })
  // test('props defined', () => {
  //   const wrapper = mount(Todos, {
  //     propsData: {
  //       todos: [
  //         {
  //           todoId: 'thisisanid',
  //           todoTitle: 'todo',
  //           todoDescription: 'todo description',
  //         },
  //       ],
  //     },
  //   })
  //
  // })
})
