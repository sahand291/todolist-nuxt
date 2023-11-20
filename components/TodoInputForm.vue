<template>
  <section class="todo-input-section">
    <v-form form @submit.prevent="addTodo">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="title"
              type="text"
              name="title"
              id="title"
              placeholder="title"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="description"
              type="text"
              name="decription"
              id="decription"
              placeholder="description"
            />
          </v-col>
          <v-col align-self="center">
            <v-btn type="submit" class="btn blue darken-2" :disabled="!disableForm">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <p v-if="isFormEmpty" class="message">
      todo title & todo description could not be empty
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AddIcon from './UI/icons/AddIcon.vue'

export default defineComponent({
  props: {
    disableForm: {
      type: Boolean
    }
  },
  data() {
    return {
      title: '',
      description: '',
      isFormEmpty: false,
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

}


.btn {
  color: #fff;
}

.icon {
  width: 24px;
}

/* .input {
  height: 40px;
  border: 2px solid #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 15px;
}
.input:focus {
  outline: #339af0 solid 2px;
} */

.message {
  font-size: 12px;
  color: red;
}
</style>
