'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/user"

export const verifyEmail = async (token: string) => {
    const emailVerificationToken = await db.emailVerification.findFirst({
        where: {token}
    })

    if(!emailVerificationToken) return {error: "Verification token dose not exist"}

    const isExpired = new Date(emailVerificationToken.expires) < new Date()

    if(isExpired) return {error: "Verification token expire!"}

    const existingUser = await getUserByEmail(emailVerificationToken.email)

    if(!existingUser) return {error: "User dose not exist"}

    await db.user.update({
        where: {id: existingUser.id},
        data: {emailVerified: new Date(), email: emailVerificationToken.email}
    })

    return {success: "Email verified!"}
}