<template>
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
          <v-list-item
            @click="addTodoList()"
          >
            <v-list-item-title>Add new todo list</v-list-item-title>
            
          </v-list-item>
          <v-list-item
            @click="deleteTodoList()"
          >
            <v-list-item-title>Delete todo list</v-list-item-title>
            
          </v-list-item>

        </v-list>
      </v-menu>

  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo, TodoList } from '~/types'

export default defineComponent({
  props: {
    todoLists: {
      type: [] as PropType<{ listId: string; listTitle: string }[]>,
      required: true,
    },
  },
  data() {
    return {
      selectedListId: '',
    }
  },
  methods: {
    onselectTodoList(id: string) {
      console.log('** listId: ' + id)

      this.selectedListId = id
      this.$emit('change', id)
    },
    addTodoList() {
      console.log('add Todo');
           
    },
    deleteTodoList() {
      console.log('delete todo');
      
    }
  },
  computed: {
    selectedListTitle() {
      const id: string = this.selectedListId ? this.selectedListId : ''
      if (id) {
        return this.todoLists.find((list) => list.listId === id)?.listTitle
      } else {
        return false
      }
    },
  },
})
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
  .icon {
    width: 24px;
  }
  .selector {
    position: relative;
    display: inline-block;
    font-size: 16px;
    select {
      width: 200px;
      height: 35px;
      background-color: #fff;
      border-radius: 5px;
      border: 2px solid #1c7ed6;
      outline: none;
      padding: 0 10px;
      width: 100%;
      cursor: pointer;
      /* appearance: none; */
    }
  }
}
</style>
