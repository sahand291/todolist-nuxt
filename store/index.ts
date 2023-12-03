import { GetterTree, ActionTree, MutationTree } from 'vuex'



export const state = () => ({
  token: null as string | null,
  isLog: Boolean,
  test: String,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getToken: (state) => state.token,
}

export const mutations: MutationTree<RootState> = {
  setToken: (state, token: string) => (state.token = token),
}

export const actions: ActionTree<RootState, RootState> = {}
