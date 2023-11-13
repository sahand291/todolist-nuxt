<template>
  <div class="container">
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Header from '~/components/UI/Header.vue'

export default defineComponent({
  components: { Header },
})
</script>

<style></style>
