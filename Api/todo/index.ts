// **NEW API**
import { Context } from '@nuxt/types'
import { Plugin } from '@nuxt/types'
import Api from '~/Api/repository'

class TodoApi {
  constructor(private ctx: Context) {}

  getTodoLists() {
    const repositoryApi = new Api('users/todolist')

    return repositoryApi.get()
  }

  addTodo(id: string, todo: { title: string; description: string }) {
    const repositoryApi = new Api(`users/todo/${id}`)

    return repositoryApi.post(todo)
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
