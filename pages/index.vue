<template>
  <section class="todo-list-section">
    <NewListForm @add-list="onAddList" />
    <Cart class="center">
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
      <TodoInputForm @add-todo="onAddTodo" />
    </Cart>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import NewListForm from '~/components/NewListForm.vue'
import TodoInputForm from '~/components/TodoInputForm.vue'
import Cart from '~/components/UI/Cart.vue'
import TodoListControl from '~/components/TodoListControl.vue'
import Todos from '~/components/Todos.vue'
import { Todo, TodoList } from '~/types'

export default Vue.extend({
  layout: 'default',
  middleware: ['check-auth', 'auth'],
  components: {
    NewListForm,
    TodoInputForm,
    Cart,
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
    //selects all todos of a todolist with specific id that selected by
    //user and stores the in todos: [] state
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
    onAddTodo(todoData: { title: string; description: string }) {
      this.isListEmpty = false
      const currentListId: string = this.selectedListId
      //save todo in the database with API request
      this.$todoApi.addTodo(currentListId, todoData).then((res: any) => {
        const allTodos = res.data.data.todos
        //save new todo(todo id) recieved from response of API in the current todos[] at the state
        //(new todo is in the last item of todos array of returne todo list from the API)
        const currentListIndex: number = this.getTodoListIndex(currentListId)
        const newTodo: Todo = {
          todoId: allTodos[allTodos.length - 1]._id,
          todoTitle: allTodos[allTodos.length - 1].title,
          todoDescription: allTodos[allTodos.length - 1].description,
        }
        this.todoListsData[currentListIndex].todos.push(newTodo)
      })
    },
    //add new list to database(api request)
    onAddList(newListTitle: string) {
      this.$todoApi.addList({ listTitle: newListTitle }).then((res) => {
        console.log(res.data.data._id)

        const newTodoList: TodoList = {
          listId: res.data.data._id,
          listTitle: newListTitle,
          todos: [] as Todo[],
        }
        this.todoListsData.push(newTodoList)
      })
    },
    // save edited todo in the database and in the state
    onSaveEditedTodo(newTodo: Todo) {
      // save todo in database
      this.$todoApi.editTodo(newTodo.todoId, {
        title: newTodo.todoTitle,
        description: newTodo.todoDescription,
      })
      // update todo in the state
      this.replaceTodo(this.selectedListId, newTodo)
    },
    //delete todo from data base and the state
    onDeleteTodo(todoId: string) {
      this.$todoApi.deleteTodo(todoId)

      const listIndex: number = this.getTodoListIndex(this.selectedListId)
      const todoIndex: number = this.todoListsData[listIndex].todos.findIndex(
        (todo: Todo) => todo.todoId === todoId
      )
      this.todoListsData[listIndex].todos.splice(todoIndex, 1)
    },
    getAllTodoLists() {
      //API call to get all todo lists
      this.$todoApi.getTodoLists().then((res: any) => {
        // map recievied data in my TodoList type and save them in the state
        //
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
      })
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
.message {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  padding: 50px 0;
}
</style>
