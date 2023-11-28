// **NEW API**
import { Context } from '@nuxt/types'
import { Plugin } from '@nuxt/types'
import Api from '~/Api/repository'

import { Todo, TodoList } from '~/types'

class TodoApi {
  constructor(private ctx: Context) {}

  async getTodoLists() : Promise<TodoList[] | undefined> {
    const repositoryApi = new Api('users/todolist')
    
    try {
    const todoListsData: TodoList[] = []
    const res = await  repositoryApi.get()

    res?.data.data.list.map((todoList: any)  => {
      const todos: Todo[] = []
      todoList.todos.map((todo: any) => {
        const newTodo: Todo = {
          todoId: todo.id,
          todoTitle: todo.title,
          todoDescription: todo.description,
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
    return todoListsData;
    } catch (error) {
      
    }
  }

  async addTodo(id: string, todo: { title: string; description: string }) : Promise<Todo | undefined> {
    const repositoryApi = new Api(`users/todo/${id}`)
    try {
      const res = await repositoryApi.post(todo)
      const newTodo: Todo = {
        todoId: res?.data.data.id,
        todoTitle: res?.data.data.title,
        todoDescription: res?.data.data.description,
      }
      return newTodo
    } catch (error) {
      
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
