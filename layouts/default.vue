<template>
  <v-app id="app">
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

<style lang="scss" scoped>
#app {
    background-color: var(--v-background-base);
}
</style>
