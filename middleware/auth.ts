import { Context } from "@nuxt/types"

 export default (ctx: Context) => {

   if (!ctx.store.getters.getToken) {
     ctx.redirect('/auth')
   }
 }