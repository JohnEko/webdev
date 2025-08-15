'use server'

import { generatePasswordResetToken, getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import { PasswordResetSchema, PasswordResetSchemaType } from "@/schemas/PasswordResetSchema";



export const passwordReset = async (values: PasswordResetSchemaType, token?: string | null) => {
    
    if(!token){
        return {error: "Invalid reset token"}
    }
    
    const validatedFields = PasswordResetSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Invalid Password"}
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(password)
    
}