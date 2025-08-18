'use server'

import { db } from "@/lib/db";
import { generatePasswordResetToken, getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import { getUserByEmail } from "@/lib/user";
import { PasswordResetSchema, PasswordResetSchemaType } from "@/schemas/PasswordResetSchema";
import bcrypt from "bcryptjs";
import { success } from "zod";



export const passwordReset = async (values: PasswordResetSchemaType, token?: string | null) => {
    
    if(!token){
        return {error: "Token dose not exist"}
    }
    
    const validatedFields = PasswordResetSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Invalid Password"}
    }

    const existingToken = await getPasswordResetTokenByToken(token)
    if(!existingToken) return {error: 'Invalid token'}

    const isExpired = new Date(existingToken.expires) < new Date()

    if(isExpired){
        return {error: "Token expired"}
    }
 //check if there is a user
    const user = await getUserByEmail(existingToken.email)

    if(!user) return {error: "User dose not exist"}

    //get the password from the filed and hashed inin our register actions
    const { password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)
    
    //lets update our user and verify the user
    await db.user.update({
        where: {id: user.id},
        data: {
            password: hashedPassword,
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    //delete token after user have reset there password
    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Password Updated"}

}