<template>
  <Cart>
    <form @submit.prevent="onSubmit()" class="auth-form">
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
      <button class="login-btn" type="submit">
        {{ isSigninMode ? 'Login' : 'Signup' }}
      </button>
      <a type="button" @click="switchMode"
        >Switch to {{ isSigninMode ? 'Signup' : 'Login' }}</a
      >
    </form>
  </Cart>
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
    onSubmit() {
      if (this.isSigninMode) {
        console.log('login')
        this.$auth
          .sigin({
            username: this.enteredUsername,
            password: this.enteredPassword,
          })
          .then((res) => {
            console.log(res.data.data.token)
            this.$store.commit('setToken', res.data.data.token)
            cookie.set('Authorization', res.data.data.token)
            localStorage.setItem('Authorization', res.data.data.token)
            if (res.data.data.token) {
              this.$router.push('/')
            }
          })
      } else {
        console.log('signin')
        this.$auth
          .signup({
            username: this.enteredUsername,
            password: this.enteredPassword,
          })
          .then((res) => console.log(res))
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

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 50px;
  width: 400px;
  margin: 0 auto;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-section label {
  padding-left: 15px;
}

.input {
  height: 40px;
  border: 2px solid #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 15px;
}
.input:focus {
  outline: #339af0 solid 2px;
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

form a {
  color: #1c7ed6;
  text-decoration: underline;
  align-self: center;
}

.error {
  font-size: 12px;
  color: red;
}
</style>
