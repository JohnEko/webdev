"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { AuthError } from "next-auth";

// this helps us to comfirm the user is successful login

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {email, password } = validatedFields.data;

  //user email will be unique
  const user = await getUserByEmail(email)

  if(!user || !email || !password || !user.password){
    return {error: "Invalid credentials!"}
  }

//   if(!user.emailVerified){
//     return{error: "Email not verifield"}
//   }

  try {
    await signIn('credentials', {email, password, redirectTo: LOGIN_REDIRECT})
  } catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error: "Invalid credential"}
            default:
                return {error: "Something went wrong"}
        }
    }
    
  }

  
};
