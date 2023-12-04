<template>
  <section class="todo-list-section">
    <v-card class="center todo-list">
      <TodoListControl
        @change="onSelectList"
        @add-list="onAddList"
        @delete-list="onDeleteList"
        :todoLists="todoListTitles"
      />
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
      <TodoInputForm @add-todo="onAddTodo" :disableForm="isListSelected" />
    </v-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import Todos from '~/components/Todos.vue'
import TodoInputForm from '~/components/TodoInputForm.vue'
import TodoListControl from '~/components/TodoListControl.vue'

import { Todo, TodoList } from '~/Api/todo/index.d'

export default Vue.extend({
  layout: 'default',
  middleware: ['check-auth', 'auth'],
  components: {
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
    async onAddTodo(
      todoData: {
        title: string
        description: string
      },
      imageData: any
    ) {
      this.isListEmpty = false
      try {
        const newTodo = await this.$todoApi.addTodo(
          this.selectedListId,
          todoData,
          imageData
        )

        const currentListIndex: number = this.getTodoListIndex(
          this.selectedListId
        )
        if (newTodo) {
          this.todoListsData[currentListIndex].todos.push(newTodo)
        }
      } catch (error) {
        //
      }
    },

    //add new list to database(api request)
    async onAddList(newListTitle: string) {
      // TODO return newTodoList from todo repository api
      const res = await this.$todoApi.addList({ listTitle: newListTitle })
      const newTodoList: TodoList = {
        listId: res?.data.data.id,
        listTitle: newListTitle,
        todos: [] as Todo[],
      }
      this.todoListsData.push(newTodoList)
    },

    // save edited todo in the database and in the state
    async onSaveEditedTodo(newTodo: Todo) {
      try {
        await this.$todoApi.editTodo(this.selectedListId, newTodo.todoId, {
          title: newTodo.todoTitle,
          description: newTodo.todoDescription,
        })

        this.replaceTodo(this.selectedListId, newTodo)
      } catch (error) {
        //
      }
    },

    //delete todo from data base and the state
    async onDeleteTodo(todoId: string) {
      try {
        await this.$todoApi.deleteTodo(todoId)

        const listIndex: number = this.getTodoListIndex(this.selectedListId)
        const todoIndex: number = this.todoListsData[listIndex].todos.findIndex(
          (todo: Todo) => todo.todoId === todoId
        )
        this.todoListsData[listIndex].todos.splice(todoIndex, 1)
      } catch (error) {}
    },

    async onDeleteList(listId: string) {
      try {
        await this.$todoApi.deleteList(listId)

        const listIndex: number = this.getTodoListIndex(this.selectedListId)
        this.todoListsData.splice(listIndex, 1)
        this.todos = []
        this.isListSelected = false
      } catch (error) {}
    },

    async getAllTodoLists() {
      try {
        const res = await this.$todoApi.getTodoLists()
        this.todoListsData = res ?? []
      } catch (error) {
        console.log('+++++++++++++++++++unable to load todo lists')
        console.log(error)
      }
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

<style lang="scss" scoped>
.todo-list {
  overflow: hidden;
  .message {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    padding: 50px 0;
  }
}
</style>
