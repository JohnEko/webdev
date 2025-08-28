"use server"

import { db } from "@/lib/db"
import { getUserById } from "@/lib/user"


export const BookmarkBlog = async (blogId: string, userId: string) =>{
    const blog = await db.bookmark.findUnique({
        where: {id: blogId}
    })

    if(!blog) return {error: "Blog not found"}

    const user = await getUserById(userId)

    if(!user) return {error: "User dose not exist"}

    // lets find if we have an existing clap or likes

    const bookmark = await db.clap.findUnique({
        where: {
            userId_blogId: {userId, blogId}
        }
    })

    if(bookmark){
        await db.clap.delete({
            where:{id: bookmark.id}
        })
        return {success: "Bookmark removed"}
    }else{
        await db.bookmark.create({
            data: {userId, blogId}
        })
        return {success: "Bookmark"}
    }
}