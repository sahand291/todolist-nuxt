import { Context } from "@nuxt/types"

 export default (ctx: Context) => {

  console.log('[MIDDLEWARE]: INIT');
  
  ctx.store.dispatch("initAuth", ctx.req )
 }