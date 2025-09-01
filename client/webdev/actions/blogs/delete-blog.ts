
'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const deleteBlog = async (blogId: string) => {
    const session = await auth()
    const userId = session?.user.userId

    const blog = await db.blog.findUnique({where: {id: blogId}})

    if(!blog) return { error: "Blog not found"}

    if(blog.userId === userId) return {error: "unauthorized"}

    await db.comment.delete({
        where:{id: blog.id}
    })
    return {success: "Blog deleted"}
}