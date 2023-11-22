<template>
  <header>
    <v-card class="header">
      <h1>Todo list</h1>
      <v-btn class="blue darken-2" @click="changeTheme">dark mode</v-btn>
      <button v-if="showLoginBtn" class="btn" @click="signout">
        <span> Logout </span>
        <LogoutIcon />
      </button>
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

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  margin: 20px 0;
}
.icon {
  width: 24px;
  color: #fff;
}

.btn {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 40px;

  border: none;
  color: #fff;
  background-color: #f03e3e;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
}
</style>
