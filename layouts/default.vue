<template>
  <v-app id="app">
    <Header />
    <v-container>
      <Nuxt />
    </v-container>
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
