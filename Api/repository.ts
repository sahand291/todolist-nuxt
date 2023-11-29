// **NEW API**
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

export default class Api {
  private token = Cookies.get('Authorization')

  constructor(private resource: string) {}
  async post<T>(payload: T) {
    try {
      const res = await axios.post(
        `http://localhost:3000/${this.resource}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
  async get() {
    try {
      const res = await axios.get(`http://localhost:3000/${this.resource}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
  async put<T>(payload: T) {
    try {
      const res = await axios.put(
        `http://localhost:3000/${this.resource}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
  async delete() {
    try {
      const res = await axios.delete(`http://localhost:3000/${this.resource}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
  async patch<T>(payload: T) {
    try {
      const res = await axios.patch(
        `http://localhost:3000/${this.resource}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      return res
    } catch (error: any) {
      window.$nuxt.$router.push('/auth')
    }
  }

  async postImage<T>(payload: T) {
    try {
      const res = await axios.post(
        `http://localhost:3000/${this.resource}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
  async getImage() {
    try {
      const res = await axios.get(`http://localhost:3000/${this.resource}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return res
    } catch (error: any) {
      if (error.response.status === 401) {
        window.$nuxt.$router.push('/auth')
      }
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
  }
}
