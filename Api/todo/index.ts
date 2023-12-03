// **NEW API**
import { Context } from '@nuxt/types'
import { Plugin } from '@nuxt/types'
import Api from '~/Api/repository'

import { Todo, TodoList } from '~/Api/todo/index.d'

class TodoApi {
  constructor(private ctx: Context) {}

  async getTodoLists(): Promise<TodoList[] | undefined> {
    const repositoryApi = new Api('users/todolist')

    try {
      const todoListsData: TodoList[] = []

      const res = await repositoryApi.get()

      res?.data.data.list.map((todoList: any) => {
        const todos: Todo[] = []
        todoList.todos.map((todo: any) => {
          const newTodo: Todo = {
            todoId: todo.id,
            todoTitle: todo.title,
            todoDescription: todo.description,
            imageId: '65674805578774aa37b6c8f8', //TODO image id should accessable from api
          }
          todos.push(newTodo)
        })
        const newTodoList: TodoList = {
          listId: todoList.id,
          listTitle: todoList.listTitle,
          todos: todos,
        }
        todoListsData.push(newTodoList)
      })
      return todoListsData
    } catch (error) {}
  }

  async getOneTodo(todoId: string): Promise<Todo | undefined> {
    const repositoryApi = new Api(`users/todo/${todoId}`)

    try {
      const res = await repositoryApi.get()

      const thisTodo: Todo = {
        todoId: res?.data.data.id,
        todoTitle: res?.data.data.title,
        todoDescription: res?.data.data.description,
        imageId: '65674805578774aa37b6c8f8', //TODO image id should accessable from api
      }

      return thisTodo
    } catch (error) {}
  }

  async addTodo(
    listId: string,
    todo: { title: string; description: string },
    todoImage: any
  ): Promise<Todo | undefined> {
    const repositoryApi = new Api(`users/todo/${listId}`)
    let imageId: string | undefined = undefined
    try {
      const res = await repositoryApi.post({
        title: todo.title,
        description: todo.description,
      })
      if (todoImage) {
        console.log(todoImage)
        imageId = await this.uploadImage(res?.data.data.id, todoImage)
      }

      const newTodo: Todo = {
        todoId: res?.data.data.id,
        todoTitle: res?.data.data.title,
        todoDescription: res?.data.data.description,
        imageId: imageId,
      }

      return newTodo
    } catch (error) {
      console.log('dsfsdfs')
      throw new Error('failed to add todo')
    }
  }

  addList(newListTitle: { listTitle: string }) {
    const repositoryApi = new Api(`users/todolist`)

    return repositoryApi.post(newListTitle)
  }

  deleteTodo(todoId: string) {
    const repositoryApi = new Api(`users/todo/${todoId}`)

    return repositoryApi.delete()
  }

  deleteList(listId: string) {
    const repositoryApi = new Api(`users/todolist/${listId}`)

    return repositoryApi.delete()
  }

  editTodo(
    listId: string,
    todoId: string,
    todo: { title: string; description: string }
  ) {
    const repositoryApi = new Api(`todolist/updateTodo/${listId}/${todoId}`)

    return repositoryApi.patch(todo)
  }

  async uploadImage(todoId: string, imageFile: any) {
    const repositoryApi = new Api(`files/upload/${todoId}`)

    const formData = new FormData()
    formData.append('file', imageFile)

    try {
      const response = await repositoryApi.postImage(formData)

      return response?.data.data.id
    } catch (error) {
      throw new Error('failed to upload image')
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $todoApi: TodoApi
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $todoApi: TodoApi
  }
  interface Context {
    $todoApi: TodoApi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $todoApi: TodoApi
  }
}

const todoApiPlugin: Plugin = (context, inject) => {
  inject('todoApi', new TodoApi(context))
}

export default todoApiPlugin
