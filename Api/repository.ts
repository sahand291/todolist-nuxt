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

  constructor(private resource: string) {
    this.apiURL = window.$nuxt.$config.baseURL + resource


    
  }

  async post<T>(payload: T) {
    const headers = this.headers
    try {
      console.log(this.resource)
      const res = await axios.post(this.apiURL, payload, {
        headers,
      })
      return res
    } catch (error: any) {
     console.log(error.message  )     
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
      console.log(error.data);

      this.checkAuth(error)
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
    }
  }

  private checkAuth(error: any) {
    if (error.response.status === 401) {
      window.$nuxt.$router.push('/auth')
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
  }
}
