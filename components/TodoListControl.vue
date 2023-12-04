<template>
  <section>
    <v-card flat class="lists-section accent">
      <div>
        <!--  -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu-close</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="todoList in todoLists"
              :key="todoList.listId"
              @click="onselectTodoList(todoList.listId)"
            >
              <v-list-item-title>{{ todoList.listTitle }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!--  -->

        <h2>{{ selectedListTitle || 'Select a list' }}</h2>
      </div>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="newListDialog = true">
            <v-list-item-title>Add new todo list</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="showDeleteList" @click="deleteTodoList()">
            <v-list-item-title>Delete todo list</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>
    <v-dialog v-model="newListDialog" max-width="500px">
      <v-card>
        <v-card-title> Add new Todo List </v-card-title>
        <v-card-text>
          <v-text-field
            label="List name*"
            v-model="newListTitle"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addTodoList()"> Add </v-btn>
          <v-btn color="primary" text @click="newListDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class TodoListControl extends Vue {
  @Prop() readonly todoLists!: { listId: string; listTitle: string }[]

  public selectedListId: string = ''
  public newListDialog: boolean = false
  public newListTitle: string = ''
  public showDeleteList: boolean = false

  onselectTodoList(id: string) {
    this.showDeleteList = true

    this.selectedListId = id
    this.$emit('change', id)
  }
  addTodoList() {
    console.log('add Todo')
    if (this.newListTitle.trim().length > 0) {
      console.log('newlist')
      this.$emit('add-list', this.newListTitle)
      this.newListDialog = false
    }
  }
  deleteTodoList() {
    console.log('delete todo')
    this.$emit('delete-list', this.selectedListId)
  }

  get selectedListTitle() {
    const id: string = this.selectedListId ? this.selectedListId : ''
    if (id) {
      return this.todoLists.find((list) => list.listId === id)?.listTitle
    } else {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.lists-section {
  display: flex;
  justify-content: space-between;
  background-color: #f1f3f5;
  text-align: center;
  padding: 15px;
  border-radius: 0;
  div {
    display: flex;
    gap: 5px;
  }
}
</style>
