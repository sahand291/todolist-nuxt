export type Todo = {
  todoId: string
  todoTitle: string
  todoDescription: string
}

export type TodoList = {
  listId: string,
  listTitle: string,
  todos: Todo[]
}

export type User = {
  username: string,
  password: string
}
