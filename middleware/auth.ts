import { Context } from '@nuxt/types'

export default (ctx: Context) => {
  console.log('[MIDDLEWARE]: AUTH')

  if (!ctx.store.getters.getToken) {
    ctx.redirect('/auth')
    console.log(!ctx.store.getters.getToken);
    
    console.log('ridirected from auth middleware');
    
  }
}
