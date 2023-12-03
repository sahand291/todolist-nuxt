<template>
  <v-container>
    <v-card class="form-container">
      <v-form @submit.prevent="onSubmit()" class="form">
        <h1 class="form-title">{{ isSigninMode ? 'Login' : 'Signup' }}</h1>
        <div class="input-section">
          <v-text-field
            label="username"
            type="text"
            :rules="usernameRules"
            v-model="enteredUsername"
            required
          />
        </div>
        <div class="input-section">
          <v-text-field
            label="password"
            type="password"
            :rules="passwordRules"
            v-model="enteredPassword"
            required
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

import cookie from 'js-cookie'
import { User } from '~/Api/auth/index.d'

export default Vue.extend({
  data() {
    return {
      enteredUsername: '',
      enteredPassword: '',
      isSigninMode: true,

      usernameRules: [
        (v: any) => !!v || 'Username is required',
        (v: any) => v.length >= 3 || 'Username must be more than 3 characters',
      ],

      passwordRules: [
        (v: any) => !!v || 'Password is required',
        (v: any) => v.length >= 3 || 'Password must be more than 3 characters',
      ],
    }
  },

  methods: {
    async onSubmit() {
      const userData: User = {
        username: this.enteredUsername,
        password: this.enteredPassword
      }

      if (this.isSigninMode) {
        try {
          const res = await this.$auth.sigin(userData)

          this.$store.commit('setToken', res?.data.data.accessToken)
          cookie.set('Authorization', res?.data.data.accessToken)

          if (res?.data.data.accessToken) {
            this.$router.push('/')
          }
        } catch (error) {
          console.log(error)
          this.$toast.error('testing toast: user and password is not correct')
          // TODO show error message to the userData
        }
      } else {
        try {
          const res = await this.$auth.signup(userData)

          console.log(res)
        } catch (error) {
          console.log(error)
          // TODO:
        }
      }
    },

    switchMode() {
      this.isSigninMode = !this.isSigninMode
    },

    validateUsername() {
 
    },

    validatePassword() {
  
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
