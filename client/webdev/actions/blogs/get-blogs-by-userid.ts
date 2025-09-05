"use server"

import { db } from "@/lib/db"

//help to get the limit og a page in the blog this is Pagination
//we accepting our search params in publish blogs
//also search for title
export const getBlogsByUserId = async({page =1,  limit=5, userId}:{
    page: number,
    limit: number,
    userId: string
}) => {

    const skip = (page -1) * limit
    

    try {
        const blog = await db.blog.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc"},
            where: {
                userId
            },
            include: {
                user:{
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                _count:{
                    select:{
                        claps: true,
                        comment: true
                    }
                },
                claps: {
                    where: {
                        userId
                    },
                    select:{
                        id: true
                    }
                },
                bookmark: {
                    where: {
                        userId
                    },
                    select: {
                        id: true
                    }

                }
            }
        })

        const totalBlogCount = await db.blog.count({
            where: {
             userId
            }
        })

        const hasMore = totalBlogCount > page * limit

        return {success: {blog, hasMore}}
    } catch (error) {
        return {error: "Error fetching blogs!"}
        
    }
}