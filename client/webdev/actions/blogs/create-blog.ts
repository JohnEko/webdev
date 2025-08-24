'use server'

import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema"


export const createBlog = async (values: BlogSchemaType) => {
    const vFileds = BlogSchema.safeParse(values)

    if(!vFileds.success) return {error: 'Invalid fileds'}

    const {userId, isPublished} = vFileds.data

    const user = await getUserById(userId)

    if(!user) return {error: 'User dose not exist'}

    if(isPublished && !user.emailVerified){
        return {error: "Not authorized verify your email"}
    }

    await db.blog.create({
        data: {...vFileds.data}
    })

    if(isPublished){
        return {success: "Blog Published"}
    }

    return {success: 'Blog saved'}
}