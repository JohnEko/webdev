'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"


export const getBlogById = async({blogId}: { blogId: string}) => {
    if(!blogId) return {error: "No Blog Id found"}

     //get our session
    const session = await auth()
    const userId = session?.user.userId

    try {
        const blog = await db.blog.findUnique({
            where: {id: blogId},
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }

                },

                _count:{
                    select:{
                        claps: true
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
        return {success: {blog}}
        
    } catch (error) {
        return { error: "Error fetching blog content"}
        
    }

}