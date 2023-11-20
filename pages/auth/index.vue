<template>
  <v-container>
    <v-card class="form-container">
      <v-form @submit.prevent="onSubmit()" class="form">
        <h1 class="form-title">{{ isSigninMode ? 'Login' : 'Signup' }}</h1>
        <div class="input-section">
          <label for="username">
            Username
            <span class="error">{{
              usernameValidation ? '' : '(please enter valid username)'
            }}</span></label
          >
          <input
            class="input"
            type="text"
            name="username"
            id="username"
            placeholder="Sahand"
            v-model="enteredUsername"
            @focusout="validateUsername"
          />
        </div>
        <div class="input-section">
          <label for="password"
            >Password
            <span class="error">{{
              passwordValidation ? '' : '(please enter valid password)'
            }}</span></label
          >
          <input
            class="input"
            type="password"
            name="password"
            placeholder="password"
            id="password"
            v-model="enteredPassword"
            @focusout="validatePassword"
          />
        </div>
        <v-btn class="blue darken-2 white--text" type="submit">
          {{ isSigninMode ? 'Login' : 'Signup' }}
        </v-btn>
        <a type="button" @click="switchMode"
          >Switch to {{ isSigninMode ? 'Signup' : 'Login' }}</a
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import Cart from '~/components/UI/Cart.vue'
import cookie from 'js-cookie'

export default Vue.extend({
  components: { Cart },
  data() {
    return {
      enteredUsername: '',
      enteredPassword: '',
      isSigninMode: true,
      usernameValidation: true,
      passwordValidation: true,
    }
  },

  methods: {
    async onSubmit() {
      if (this.isSigninMode) {
        const res = await this.$auth.sigin({
          username: this.enteredUsername,
          password: this.enteredPassword,
        })

        this.$store.commit('setToken', res.data.data.token)
        cookie.set('Authorization', res.data.data.token)
        localStorage.setItem('Authorization', res.data.data.token)
        if (res.data.data.token) {
          this.$router.push('/')
        }
      } else {
        const res = await this.$auth.signup({
          username: this.enteredUsername,
          password: this.enteredPassword,
        })

        console.log(res)
      }
    },

    switchMode() {
      this.isSigninMode = !this.isSigninMode
    },

    validateUsername() {
      this.usernameValidation = this.enteredUsername.trim().length !== 0
    },

    validatePassword() {
      this.passwordValidation = this.enteredPassword.trim().length !== 0
    },
  },
})
</script>

<style lang="scss" scoped>
.form-container {
  width: 400px;
  margin: 0 auto;
  .form {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    gap: 20px;
    a {
      color: #1c7ed6;
      text-decoration: underline;
      align-self: center;
    }
  }
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    padding-left: 15px;
  }
}
.input {
  height: 40px;
  border: 2px solid #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 15px;
  &:focus {
    outline: #339af0 solid 2px;
  }
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #1c7ed6;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
}

.error {
  font-size: 12px;
  color: red;
}
</style>
