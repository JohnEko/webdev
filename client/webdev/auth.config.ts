import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas/LoginSchema"
import { getUserByEmail } from "./lib/user"
import bcrypt from "bcryptjs"
import bcryptjs from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
//using github to loggin
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
//validating user using email and passworfd
        const validatedFields = LoginSchema.safeParse(credentials)

        if(validatedFields.success){
          const {email, password} = validatedFields.data

          const user = await getUserByEmail(email)
          if(!user || !user.password) return null

          const isCorrectPassword = await bcryptjs.compare(password, user.password)

          if(isCorrectPassword) return user
        }

        return null
        
      }
    })
  ],
} satisfies NextAuthConfig