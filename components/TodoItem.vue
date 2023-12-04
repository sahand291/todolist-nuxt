<template>
  <li v-if="!isEditing" class="todo-card">
    <div class="todo-details">
      <h3>{{ todoTitle }}</h3>
      <p>{{ todoDsc }}</p>
    </div>
    <div class="controls">
      <v-btn fab small :to="`/todo/${todoId}`">
        <v-icon> mdi-dots-horizontal-circle-outline </v-icon>
      </v-btn>
      <v-btn fab small @click="editMode()">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn fab small @click="deleteTodo(todoId)">
        <v-icon> mdi-trash-can</v-icon>
      </v-btn>
    </div>
  </li>

  <li v-else class="todo-card">
    <div class="todo-details">
      <input
        class="input"
        type="text"
        name="title"
        id="title"
        v-model="editedTodoTitle"
      />
      <input
        class="input"
        type="text"
        name="description"
        id="description"
        v-model="editedTodoDescriptoin"
      />
    </div>
    <div class="controls">
      <v-btn @click="saveTodo(todoId)">
        <v-icon>mdi-save</v-icon>
      </v-btn>
      <v-btn @click="deleteTodo(todoId)">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo } from '~/Api/todo/index.d'

export default Vue.extend({
  props: {
    todoTitle: {
      type: String,
    },
    todoDsc: {
      type: String,
    },
    todoId: {
      type: String,
    },
  },
  data() {
    return {
      isEditing: false,
      editedTodoTitle: '',
      editedTodoDescriptoin: '',
    }
  },
  methods: {
    deleteTodo(id: string) {
      this.$emit('delete-todo', id)
      // this.$todo.deleteTodo(id)
    },
    editMode() {
      this.isEditing = true
      this.editedTodoTitle = this.todoTitle
      this.editedTodoDescriptoin = this.todoDsc
    },
    saveTodo(id: string) {
      this.isEditing = false
      this.$emit('save-todo', {
        todoId: id,
        todoTitle: this.editedTodoTitle,
        todoDescription: this.editedTodoDescriptoin,
      } as Todo)
    },
  },
  mounted() {},
})
</script>

<style lang="scss" scoped>
.todo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #e9ecef;
  margin: 20px;
  padding: 5px 10px;

  .todo-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .controls {
    display: flex;
    gap: 5px;
  }
}
</style>
