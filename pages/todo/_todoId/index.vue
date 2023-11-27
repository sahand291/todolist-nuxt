<template>
  <v-card justify="center" width="500">
    <div class="accent">
      <v-card-title>
        <h2>Todo title</h2>
      </v-card-title>
    </div>
    <v-card-text>
      todo description Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quia assumenda est soluta iure necessitatibus dolores ratione facere! Hic
      eaque quas delectus, inventore, harum minus deleniti modi ea nobis
      veritatis sunt.
    </v-card-text>
    <v-card-actions>
      <v-btn>Edit</v-btn>
      <v-btn>Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      todoId: '',
    }
  },
  mounted() {
    this.todoId = this.$route.params.todoId
  },
})
</script>
