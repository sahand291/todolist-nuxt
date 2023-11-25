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
import { defineComponent, PropType } from 'vue'

import TodoItem from './TodoItem.vue'

import { Todo } from '~/types'

export default defineComponent({
  components: { TodoItem },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },
  methods: {
    onSaveTodo(newTodo: Todo) {
      this.$emit('save-todo', newTodo)
    },
    onDeleteTodo(id: string) {
      this.$emit('delete-todo', id)
    },
  },
})
</script>
