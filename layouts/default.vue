<template>
  <v-app class="grey lighten-4">
    <div class="container">
      <Header />
      <Nuxt />
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Header from '~/components/UI/Header.vue'

export default defineComponent({
  components: { Header },
})
</script>

<style></style>
