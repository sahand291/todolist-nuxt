// **NEW API**
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

export default class Api {
  private token = Cookies.get('Authorization')
  private apiURL = ''
  private headers = {
    Authorization: `Bearer ${this.token}`,
  }
  private checkAuth(error: any) {
    if (error.response.status === 401) {
      window.$nuxt.$router.push('/auth')
    }
  }

  constructor(private resource: string) {
    this.apiURL = window.$nuxt.$config.baseURL + resource
  }

  async post<T>(payload: T) {
    const headers = this.headers
    try {
      const res = await axios.post(this.apiURL, payload, {
        headers,
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
  async get() {
    const headers = this.headers

    try {
      const res = await axios.get(this.apiURL, {
        headers,
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
  async put<T>(payload: T) {
    const headers = this.headers

    try {
      const res = await axios.put(this.apiURL, payload, {
        headers,
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
  async delete() {
    const headers = this.headers

    try {
      const res = await axios.delete(this.apiURL, {
        headers,
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
  async patch<T>(payload: T) {
    const headers = this.headers

    try {
      const res = await axios.patch(this.apiURL, payload, {
        headers,
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }

  async postImage<T>(payload: T) {
    try {
      const res = await axios.post(this.apiURL, payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
  async getImage() {
    try {
      const res = await axios.get(this.apiURL, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      return res
    } catch (error: any) {
      this.checkAuth(error)
      throw new Error(error)
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
  }
}
