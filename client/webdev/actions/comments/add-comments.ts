'use server'

import { getUserById } from "@/lib/user"
import { CommentSchema, CommentSchemaType } from "@/schemas/CommentSchema"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const addComments = async (
    {
    values, 
    userId, 
    blogId, 
    repliedToUserId, 
    parentId
    } : {
    values: CommentSchemaType,
    userId: string,
    blogId: string,
    repliedToUserId?: string,
    parentId?: string
    }) => {

        const vFields = CommentSchema.safeParse(values)

        if(!vFields.success) return {error: "Invalid fileds"}

        const { content } = vFields.data

        const user = await getUserById(userId)
        if(!user) return {error: "user not found"}

        const blog = await db.blog.findUnique({where: {id: blogId}})

        if(!blog) return { error: "Blog not found"}

        if(parentId){
            const parentComment = await db.comment.findUnique({
                where: {id: parentId}
            })

            if(!parentComment) return {error: "parent comment not found"}
        }

        if(repliedToUserId){
            const repliedUser = getUserById(repliedToUserId)

            if(!repliedUser) return {error: "repliying-to user not found"}
        }

        await db.comment.create({
            data: {
                userId,
                blogId,
                parentId,
                repliedToUserId,
                content
            }
        })
        revalidatePath(`/blog/${blogId}`)

        return {success: "Comment added successfully"}


}