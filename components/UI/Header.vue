<template>
  <section>
    <header class="mb-4 hidden-sm-and-down">
      <v-toolbar class="ma-0">
        <v-toolbar-title>Todo List</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="blue darken-2 mr-2" @click="changeTheme"
            >dark mode</v-btn
          >
          <v-btn v-if="showLoginBtn" class="red darken-1" @click="signout">
            <v-icon left>mdi-logout</v-icon>
            <span> Logout </span>
          </v-btn>
        </div>
      </v-toolbar>
    </header>
    <header class="mb-4 hidden-md-and-up">
      <v-toolbar class="ma-0">
        <v-toolbar-title>Todo List</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar>
    </header>
    <v-navigation-drawer right v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import cookie from 'js-cookie'
import LogoutIcon from './icons/LogoutIcon.vue'

export default defineComponent({
  data() {
    return {
      drawer: false,
    }
  },
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
}
</style>
