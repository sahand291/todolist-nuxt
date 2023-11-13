<template>
  <section class="todo-input-section">
    <form @submit.prevent="addTodo" class="todo-input-form">
      <input
        class="input"
        v-model="title"
        type="text"
        name="title"
        id="title"
        placeholder="title"
      />
      <input
        class="input"
        v-model="description"
        type="text"
        name="decription"
        id="decription"
        placeholder="description"
      />
      <button type="submit" class="btn">
        <AddIcon />
      </button>
    </form>
    <p v-if="isFormEmpty" class="message">
      todo title & todo description could not be empty
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AddIcon from './UI/icons/AddIcon.vue'

export default defineComponent({
  data() {
    return {
      title: '',
      description: '',
      isFormEmpty: false
    }
  },
  methods: {
    addTodo() {
      if (this.title.trim().length > 0 && this.title.trim().length > 0) {
        this.isFormEmpty = false
        this.$emit('add-todo', {
          title: this.title,
          description: this.description,
        })
        this.title = ''
        this.description = ''
      } else {
        this.isFormEmpty = true
      }
    },
  },
  components: { AddIcon },
})
</script>

<style scoped>
.todo-input-section {
  background-color: #f1f3f5;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.todo-input-form {
  display: flex;
  gap: 10px;
}

.btn {
  height: 40px;
  width: 40px;
  border: none;
  color: #fff;
  background-color: #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
}

.icon {
  width: 24px;
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

.message {
  font-size: 12px;
  color: red;
}
</style>
