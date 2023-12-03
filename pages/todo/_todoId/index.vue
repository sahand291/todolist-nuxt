<template>
  <v-card justify="center" width="500">
    <div class="accent">
      <v-card-title>
        <h2>{{ thisTodo.todoTitle }}</h2>
      </v-card-title>
    </div>
    <v-card-text>
      {{ thisTodo.todoDescription }}
      <img :src="fetchedImageData" alt="sdfsdf">
    </v-card-text>
    <form>
      <input type="file" @change="handleImageFile" />
    </form>
    <v-card-actions>
      <v-btn @click="logFile">imageFile</v-btn>
      <v-btn @click="uploadFile">upload photo</v-btn>
      <v-btn @click="downloadFile">download photo</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

import axios from 'axios'
import Cookies from 'js-cookie'
import { Todo } from '~/Api/todo/index.d'


export default Vue.extend({
  data() {
    return {
      thisTodo: {} as Todo,
      todoId: '',
      imageFile: '' as any,
      fetchedImageData: '' as any,
      imageId: '',
    }
  },
  methods: {
    handleImageFile(event: any) {
      this.imageFile = event.target.files[0]
    },
    logFile() {
      console.log(this.imageFile)
    },
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.imageFile)

      await axios
        .post(
          'http://127.0.0.1:3000/files/upload/65649814fde6b352e08e2693',
          formData,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          console.log('Photo uploaded successfully.')
          console.log(response.data.data.id)
          console.log(response)

          this.imageId = response.data.data.id
        })
        .catch((error) => {
          console.error('Error uploading photo:', error)
        })
    },

    downloadFile() {
      console.log(this.imageId)
      const accessToken = Cookies.get('Authorization')
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      axios
        .get(`http://127.0.0.1:3000/files/serveimage/${this.thisTodo.imageId}`, {
          headers,
          responseType: 'blob',
        })
        .then((response) => {
          console.log('Photo retrieved successfully:', response.data)
          console.log(response)
          const reader = new FileReader()
          reader.onload = () => {
            this.fetchedImageData = reader.result
          }
          reader.readAsDataURL(response.data)
        })
        .catch((error) => {
          console.error('Error retrieving photo:', error)
        })
    },
  },
  async mounted() {
    this.todoId = this.$route.params.todoId
    const todo = await this.$todoApi.getOneTodo(this.$route.params.todoId)
  
    this.thisTodo = todo!
  },
})
</script>
