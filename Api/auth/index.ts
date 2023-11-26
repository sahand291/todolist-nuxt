// **'NEW API'**
import { User } from '~/types'
import { Plugin } from '@nuxt/types'
import Api from '~/Api/repository'

class Auth {
  sigin(payload: User) {
    const repositoryApi = new Api('users/auth/signin')
    return repositoryApi.post(payload)
  }

  signup(payload: User) {
    const repositoryApi = new Api('users/auth/signup')
    return repositoryApi.post(payload)
  }
}


declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $auth: Auth
  }
  interface Context {
    $auth: Auth
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $auth: Auth
  }
}

const authPlugin: Plugin = (context, inject) => {
  inject('auth', new Auth())
}

export default authPlugin

