<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :todoTitle="todo.todoTitle"
      :todoDsc="todo.todoDescription"
      :todoId="todo.todoId"
      :todo="todo"
      :key="todo.todoId"
      @save-todo="onSaveTodo"
      @delete-todo="onDeleteTodo"
    />
  </ul>
</template>

<script lang="ts">
import TodoItem from './TodoItem.vue'

import { Todo } from '~/Api/todo/index.d'

import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({ components: { TodoItem } })
export default class Todos extends Vue {
  @Prop() readonly todos!: Todo[]

  onSaveTodo(newTodo: Todo) {
    this.$emit('save-todo', newTodo)
  }
  onDeleteTodo(id: string) {
    this.$emit('delete-todo', id)
  }
}
</script>
