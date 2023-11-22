import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Todo, TodoList } from '~/types'

export const state = () => ({
  token: null as string | null,
  isLog: Boolean,
  test: String
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getToken: (state) => state.token,
  
}

export const mutations: MutationTree<RootState> = {
  setToken: (state, token: string) => (state.token = token),
}

export const actions: ActionTree<RootState, RootState> = {
  initAuth(ctx, req): void {
    let token: string | null = null
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const tokenCookie = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('Authorization='))
      if (!tokenCookie) {
        return
      }
      token = tokenCookie.split('=')[1]
      console.log('[COOKIE]: ' + token);
      
    } 
    else {
      
      token = localStorage.getItem('Authorization')
      console.log('[LOCAL]: ' + token);

    }
    ctx.commit('setToken', token)
  },
}
