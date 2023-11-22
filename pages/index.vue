<template>
  <section class="todo-list-section">
    <NewListForm @add-list="onAddList" />
    <v-card class="center todo-list">
      <TodoListControl @change="onSelectList" :todoLists="todoListTitles" />
      <Todos
        v-if="isListSelected && !isListEmpty"
        :todos="todos"
        @save-todo="onSaveEditedTodo"
        @delete-todo="onDeleteTodo"
      />
      <p v-else-if="!isListSelected" class="message">
        please select a todo list
      </p>
      <p v-else-if="isListEmpty" class="message">List is empty, add new todo</p>
      <TodoInputForm @add-todo="onAddTodo" :disableForm="isListSelected"/>

    </v-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'


import Todos from '~/components/Todos.vue'
import NewListForm from '~/components/NewListForm.vue'
import TodoInputForm from '~/components/TodoInputForm.vue'
import TodoListControl from '~/components/TodoListControl.vue'

import { Todo, TodoList } from '~/types'

export default Vue.extend({
  layout: 'default',
  middleware: ['check-auth', 'auth'],
  components: {
    NewListForm,
    TodoInputForm,

    TodoListControl,
    Todos,
  },
  data() {
    return {
      todos: [] as Todo[],
      todoListsData: [] as TodoList[],
      selectedListId: '',
      isListSelected: false,
      isListEmpty: true,
    }
  },
  methods: {
    selectTodos(listId: string) {
      if (listId) {
        this.isListSelected = true
        const selectedListIndex: number = this.getTodoListIndex(listId)
        this.todos = this.todoListsData[selectedListIndex].todos
      } else {
        this.isListSelected = false
      }
    },
    //Finds index of a todo list with given id
    getTodoListIndex(listId: string): number {
      return this.todoListsData.findIndex(
        (todoList: TodoList) => todoList.listId === listId
      )
    },
    //replaces edited todo with old one in the state
    replaceTodo(listId: string, updatedTodo: Todo): void {
      const listIndex: number = this.getTodoListIndex(listId)
      const todoIndex: number = this.todoListsData[listIndex].todos.findIndex(
        (todo: Todo) => todo.todoId === updatedTodo.todoId
      )
      this.todoListsData[listIndex].todos.splice(todoIndex, 1, updatedTodo)
    },
    //updates todos array in state with new todo list selected by user
    onSelectList(listId: string): void {
      this.selectedListId = listId
      this.selectTodos(listId)
    },
    // adds new todo to  a todolist with specific id (with api request and saving in the state)
    async onAddTodo(todoData: { title: string; description: string }) {
      this.isListEmpty = false
      const currentListId: string = this.selectedListId

      const res = await this.$todoApi.addTodo(currentListId, todoData)
      const allTodos = res.data.data.todos
      const currentListIndex: number = this.getTodoListIndex(currentListId)
      const newTodo: Todo = {
        todoId: allTodos[allTodos.length - 1]._id,
        todoTitle: allTodos[allTodos.length - 1].title,
        todoDescription: allTodos[allTodos.length - 1].description,
      }
      this.todoListsData[currentListIndex].todos.push(newTodo)
    },
    //add new list to database(api request)
    async onAddList(newListTitle: string) {
      const res = await this.$todoApi.addList({ listTitle: newListTitle })
      console.log(res.data.data._id)

      const newTodoList: TodoList = {
        listId: res.data.data._id,
        listTitle: newListTitle,
        todos: [] as Todo[],
      }
      this.todoListsData.push(newTodoList)
    },

    // save edited todo in the database and in the state
    async onSaveEditedTodo(newTodo: Todo) {
      await this.$todoApi.editTodo(newTodo.todoId, {
        title: newTodo.todoTitle,
        description: newTodo.todoDescription,
      })

      this.replaceTodo(this.selectedListId, newTodo)
    },

    //delete todo from data base and the state
    async onDeleteTodo(todoId: string) {
      await this.$todoApi.deleteTodo(todoId)

      const listIndex: number = this.getTodoListIndex(this.selectedListId)
      const todoIndex: number = this.todoListsData[listIndex].todos.findIndex(
        (todo: Todo) => todo.todoId === todoId
      )
      this.todoListsData[listIndex].todos.splice(todoIndex, 1)
    },

    async getAllTodoLists() {
      const res = await this.$todoApi.getTodoLists()
      res.data.data.map((todoList: any) => {
        const todos: Todo[] = []
        todoList.todos.map((todo: any) => {
          const newTodo: Todo = {
            todoId: todo._id,
            todoTitle: todo.title,
            todoDescription: todo.description,
          }
          todos.push(newTodo)
        })
        const newTodoList: TodoList = {
          listId: todoList._id,
          listTitle: todoList.listTitle,
          todos: todos,
        }
        this.todoListsData.push(newTodoList)
      })
      // this.selectTodos(this.selectedListId)
    },
  },

  computed: {
    todoListTitles() {
      const todoLists: { listId: string; listTitle: string }[] = []
      this.todoListsData.map((todoList: TodoList) => {
        todoLists.push({
          listId: todoList.listId,
          listTitle: todoList.listTitle,
        })
      })
      return todoLists
    },
  },

  watch: {
    selectedListId() {
      this.todos.length === 0
        ? (this.isListEmpty = true)
        : (this.isListEmpty = false)
    },
  },
  mounted() {
    this.getAllTodoLists()
  },
})
</script>

<style scoped>
.todo-list {
  overflow: hidden;
}

.message {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  padding: 50px 0;
}
</style>
