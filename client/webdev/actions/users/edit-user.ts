'user server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/lib/user"
import { EditProfileSchema, EditProfileSchemaType } from "@/schemas/EditProfileSchema"
import { success } from "zod"

export const editUser = async (values: EditProfileSchemaType, userId: string) => {
    const vFields = EditProfileSchema.safeParse(values)

    if(!vFields.success) return {error: 'Invalid fields'}

    const session = await auth()

    if(session?.user.userId !== userId) return {error: 'Not authorized user'}

    const user = await getUserById(userId)

    if(!user) return {error: 'User dose not exist'}

    await db.user.update({
        where: {id: userId},
        data: {
            ...vFields.data
        }
    })

    return {success: "User profile updated"}

}