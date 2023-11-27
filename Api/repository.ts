// **NEW API**
import axios from 'axios'
import Cookies from 'js-cookie'


export default class Api {
  private token = Cookies.get('Authorization')

  constructor(private resource: string) {}
  post<T>(payload: T) {
    return axios.post(`http://localhost:3000/${this.resource}`, payload, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
  get() {
    return axios.get(`http://localhost:3000/${this.resource}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
  put<T>(payload: T) {
    return axios.put(`http://localhost:3000/${this.resource}`, payload, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
  delete() {
    return axios.delete(`http://localhost:3000/${this.resource}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
  patch<T>(payload: T) {
    return axios.patch(
      `http://localhost:3000/${this.resource}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
  }
}
