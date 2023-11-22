<template>
  <v-card flat class="lists-section accent">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
      />
    </svg>
    <label class="selector">
      <select
        name="lists"
        id="lists"
        v-model="selectedListId"
        @change="onselectTodoList"
      >
        <option v-for="todoList in todoLists" :value="todoList.listId">
          {{ todoList.listTitle }}
        </option>
      </select>
    </label>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
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
      selectedListId: {
        type: String,
        default: null,
      },
    }
  },
  methods: {
    onselectTodoList() {
      this.$emit('change', this.selectedListId)
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
