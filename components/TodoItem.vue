<template>
  <li v-if="!isEditing" class="todo-card">
    <div class="todo-details">
      <h3>{{ todoTitle }}</h3>
      <p>{{ todoDsc }}</p>
    </div>
    <div class="controls">
      <button @click="editMode()" class="btn btn-edit">
       <EditIcon/>
      </button>
      <button @click="deleteTodo(todoId)" class="btn btn-delete">
        <DeleteIcon />
      </button>
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
      <button @click="saveTodo(todoId)" class="btn btn-edit">
        <SaveIcon/>
      </button>
      <button @click="deleteTodo(todoId)" class="btn btn-delete">
        <DeleteIcon />
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo } from '~/types'


import DeleteIcon from '~/components/UI/icons/DeleteIcon.vue'
import EditIcon from '~/components/UI/icons/EditIcon.vue'
import SaveIcon from './UI/icons/SaveIcon.vue'

export default Vue.extend({
  components: {
    DeleteIcon,
    EditIcon,
    SaveIcon
},
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
})
</script>

<style scoped>
.todo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #e9ecef;
  margin: 20px;
  padding: 5px 10px;
}

.todo-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.controls {
  display: flex;
  gap: 5px;
}
.btn {
  border: none;
  padding: 6px;
  border-radius: 5px;
}

.btn-delete {
  background-color: #f03e3e;
}

.btn-edit {
  background-color: #1c7ed6;
}



.input {
  height: 40px;
  border: 2px solid #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 15px;
}
.input:focus {
  outline: #339af0 solid 2px;
}
</style>
