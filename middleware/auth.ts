import { Context } from '@nuxt/types'
import Cookies from 'js-cookie'
export default (ctx: Context) => {
  let token: string | undefined

  if (ctx.req) {
    const tokenCookie = ctx.req.headers.cookie
      ?.split(';')
      .find((c: string) => c.trim().startsWith('Authorization='))
    token = tokenCookie?.split('=')[1] ?? ''
  } else {
    token = Cookies.get('Authorization')
  }

  ctx.store.commit('setToken', token)

  if (!token) {
    ctx.redirect('/auth')
  }
}
