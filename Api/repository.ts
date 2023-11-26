// **NEW API**
import axios from 'axios'

type Headers = {
  headers: { Authorization: string }
}

export default class Api {
  constructor(private resource: string) {}
  post<T>(payload: T, headers?: any) {
    console.log(payload, headers)
    return axios.post(
      `http://localhost:3000/${this.resource}`,
      {
        username: 'string',
        password: 'string'
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
  }
  get(headers?: Headers) {
    return axios.get(`http://localhost:3000/${this.resource}`, headers)
  }
  put<T>(payload: T) {
    return axios.put(`http://localhost:3000/${this.resource}`, payload)
  }
  delete(id: string, headers?: Headers) {
    return axios.delete(`http://localhost:3000/${this.resource}/${id}`, headers)
  }
  patch<T>(
    id: string,
    payload: T,
    headers?: { headers: { Authorization: string } }
  ) {
    return axios.patch(
      `http://localhost:3000/${this.resource}/${id}`,
      payload,
      headers
    )
  }
}
