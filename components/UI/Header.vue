<template>
  <header>
    <v-card class="header">
      <h1>Todo list</h1>
      <div>
        <v-btn class="blue darken-2" @click="changeTheme">dark mode</v-btn>
        <v-btn v-if="showLoginBtn" class="red darken-1  " @click="signout">
          <v-icon left>mdi-logout</v-icon>
          <span> Logout </span>
        </v-btn>
      </div>
    </v-card>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import cookie from 'js-cookie'
import LogoutIcon from './icons/LogoutIcon.vue'

export default defineComponent({
  methods: {
    signout() {
      localStorage.removeItem('Authorization')
      cookie.remove('Authorization')
      this.$router.push('/auth')
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
  computed: {
    showLoginBtn() {
      return this.$store.getters.getToken
    },
  },
  components: { LogoutIcon },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  margin: 20px 0;
}

</style>
