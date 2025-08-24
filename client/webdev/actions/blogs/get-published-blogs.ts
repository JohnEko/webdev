"use server"

import { db } from "@/lib/db"

//help to get the limit og a page in the blog this is Pagination
//we accepting our search params in publish blogs
export const getPublishedBlogs = async({page =1,  limit=5, searchObj}:{
    page: number,
    limit: number,
    searchObj: {tag: string}
}) => {

    const skip = (page -1) * limit
    const {tag} = searchObj

    try {
        const blog = await db.blog.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc"},
            where: {isPublished: true,
                ...(tag ? {tags: {has:tag}}: {})
            },
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