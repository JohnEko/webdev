"use server"

import { db } from "@/lib/db"
import { success } from "zod"

//help to get the limit og a page in the blog this is Pagination
export const getPublishedBlogs = async({page =1,  limit=5}) => {

    const skip = (page -1) * limit

    try {
        const blog = await db.blog.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc"},
            where: {isPublished: true},
            include: {
                user:{
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        })

        const totalBlogCount = await db.blog.count({
            where: {
                isPublished: true
            }
        })

        const hasMore = totalBlogCount > page * limit

        return {success: {blog, hasMore}}
    } catch (error) {
        return {error: "Error fetching blogs!"}
        
    }
}