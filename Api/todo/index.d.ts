export type Todo = {
  todoId: string
  todoTitle: string
  todoDescription: string
  imageId: string | undefined
}

export type TodoList = {
  listId: string,
  listTitle: string,
  todos: Todo[]
}

