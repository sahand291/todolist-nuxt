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
          <v-col align-self="center" cols="12" md="5" class="px-2 py-0">
            <v-text-field
              v-model="description"
              type="text"
              name="decription"
              id="decription"
              placeholder="description"
            />
          </v-col>
          <v-col align-self="center" cols="12" md="3" class="px-2 py-0">
            <v-file-input
              accept="image/png, image/jpeg"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="image"
              class="pa-0 image-input"
              v-model="imageData"
            ></v-file-input>
          </v-col>
          <v-col align-self="center" cols="12" md="1">
            <v-btn type="submit" class="btn" block>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class NewListForm extends Vue {
  @Prop(String) readonly disableForm: number | undefined

  public title: string = ''
  public description: string = ''
  public imageData: any = null

  addTodo() {
    if (!this.disableForm) {
      this.$toast.error('Please select a list to add new todo')
      return
    }
    if (this.description.trim().length > 0 && this.title.trim().length > 0) {
      this.$emit(
        'add-todo',
        {
          title: this.title,
          description: this.description,
        },
        this.imageData
      )
      this.title = ''
      this.description = ''
      this.imageData = null
    } else {
      this.$toast.error('todo title & todo description could not be empty')
    }
  }
}
</script>

<style lang="scss" scoped>
.new-todo-form {
  border-radius: 0;
  .image-input {
    font-size: 12px;
  }
}
</style>
