<template>
  <v-card flat class="new-todo-form accent">
    <v-form @submit.prevent="addTodo">
      <v-container>
        <v-row>
          <v-col align-self="center" cols="12" md="3" class="px-2 py-0">
            <v-text-field
              v-model="title"
              type="text"
              name="title"
              id="title"
              placeholder="title"
            />
          </v-col>
          <v-col align-self="center" cols="12" md="7" class="px-2 py-0">
            <v-text-field
              v-model="description"
              type="text"
              name="decription"
              id="decription"
              placeholder="description"
            />
          </v-col>
          <v-col align-self="center" cols="12" md="1">
            <v-file-input
              :hide-input="$vuetify.breakpoint.mdAndUp"
              accept="image/png, image/jpeg"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="image"
              class="pa-0"
              v-model="imageData"
            ></v-file-input>
          </v-col>
          <v-col align-self="center" cols="12" md="1">
            <v-btn type="submit" class="btn" block :disabled="!disableForm">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <p v-if="isFormEmpty" class="message">
      todo title & todo description could not be empty
    </p>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  props: {
    disableForm: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: '',
      description: '',
      imageData: null as any,
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
        }, this.imageData)
        this.title = ''
        this.description = ''
        this.imageData = null
      } else {
        this.isFormEmpty = true
      }
    },
  },
  
})
</script>

<style scoped>
.new-todo-form {
  border-radius: 0;
}

</style>
