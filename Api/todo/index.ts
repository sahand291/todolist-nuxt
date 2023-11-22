import { Context } from '@nuxt/types'
import { Plugin } from '@nuxt/types'
import Api from '~/Api/repository'


class TodoApi{
  constructor(private ctx: Context) {
  }
    getTodoLists() {
      const repositoryApi = new Api('todolist')
      return repositoryApi.get({
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
    }

    addTodo(id: string, todo: { title: string; description: string }) {
      const repositoryApi = new Api(`todolist/addtodo/${id}`)
      return repositoryApi.post(todo, {
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
    }

    addList(newListTitle: {listTitle: string}) {
      const repositoryApi = new Api(`todolist`)
      return repositoryApi.post(newListTitle, {
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
    }

    deleteTodo(todoId: string) {
      const repositoryApi = new Api(`todolist/deleteTodo`)
      return repositoryApi.delete(todoId, {
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
    }

    deleteList(listId: string) {
      const repositoryApi = new Api(`todolist`)
      return repositoryApi.delete(listId, {
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
    }

    editTodo(id: string, todo: { title: string; description: string }) {
      const repositoryApi = new Api(`todolist/updateTodo`)

      return repositoryApi.patch(id, todo, {
        headers: {
          Authorization: `Bearer ${this.ctx.store.getters.getToken}`,
        },
      })
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

