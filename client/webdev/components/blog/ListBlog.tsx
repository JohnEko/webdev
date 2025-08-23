import { Blog, User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import BlogCard from './BlogCard'

export type BlogWithUser = Blog & {
    user: Pick<User, 'id' | 'name' | 'image'>
}

interface ListBlogProps {
    blog: BlogWithUser[]
    hasMore: boolean
    currentPage: number
    isUserProfile?: boolean
}

const ListBlog = ({blog, hasMore, currentPage, isUserProfile}: ListBlogProps) => {
// then hoop the list blog in our feeds page.tsx
  return (
    <div className='flex flex-col max-w-[800px] m-auto justify-between min-h-[85vh] px-4 pt-2'>
        <section>
            {blog.map((blog) => <BlogCard key={blog.id} blog={blog} isUserProfile={isUserProfile}/> )}
        </section>
{/* Pagination of the page to the next page */}
        <div className='flex justify-between mt-4'>
            {<Link href={`/blog/feed/${currentPage -1}`}>
                <span>Previouse</span>
            </Link>}

            { 
            <Link href={`/blog/feed/${currentPage + 1}`}>
                <span>Next</span>
            </Link>}
            
            
        </div>

    </div>
  )
}

export default ListBlog