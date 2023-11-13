import { Context } from "@nuxt/types"

 export default (ctx: Context) => {


  ctx.store.dispatch("initAuth", ctx.req )
 }