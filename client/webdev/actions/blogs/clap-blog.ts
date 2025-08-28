"use server"

import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"
import { error } from "console"
import { success } from "zod"

export const clapBlog = async (blogId: string, userId: string) =>{
    const blog = await db.blog.findUnique({
        where: {id: blogId}
    })

    if(!blog) return {error: "Blog not found"}

    const user = await getUserById(userId)

    if(!user) return {error: "User dose not exist"}

    // lets find if we have an existing clap or likes

    const clap = await db.clap.findUnique({
        where: {
            userId_blogId: {userId, blogId}
        }
    })

    if(clap){
        await db.clap.delete({
            where:{id: clap.id}
        })
        return {success: "Unclapped"}
    }else{
        await db.clap.create({
            data: {userId, blogId}
        })
        return {success: "clap"}
    }
}