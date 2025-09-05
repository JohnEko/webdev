import Link from 'next/link'
import React from 'react'
import { BlogWithUser } from './ListBlog'
import Image from 'next/image'
import UserSummary from './UserSummary'
import Tags from '../common/Tags'
import Reactions from './Reactions'
import { auth } from '@/auth'


const BlogCard = async ({blog, isUserProfile}: {blog: BlogWithUser, isUserProfile?: boolean}) => {
   const session = await auth()
   const userId = session?.user.userId
   const isOwner = userId === blog.userId
   const isAdmin = session?.user.role === 'ADMIN'
  
    return (
    <div className='border-b border-slate-300 dark:border-slate-700 py-6 cursor-pointer'>

        <div className='flex items-center justify-between'>
           {blog.user && <UserSummary user={blog.user} createdDate={blog.createdAt} />}
           {isOwner && isUserProfile && !blog.isPublished && <p className='text-rose-500'>Draft</p>}
           {(isOwner || isAdmin) && isUserProfile && <Link className='text-orange-400' href={`/blog/edit/${blog.id}`}>Edit</Link>}
          
        </div>
        <div className='my-2 flex justify-between gap-6'>
            <div className='flex flex-col justify-between w-full'>
                <Link href={`/blog/details/${blog.id}`} className='text-xl sm:text-2xl font-bold'>
                    {blog.title}
                </Link>

                {!!blog.tags.length && <div className='flex items-center gap-4 flex-wrap mb-2 my-2'>
                   {blog.tags.map((tag)=> <Tags key={tag}>{tag}</Tags>)} 
                </div>}
                
                <Reactions blog={blog}/>
            </div>

        </div>
        {/* this should be container for our image */}

        {blog.coverImage &&
            <Link href={`/blog/${blog.id}`} className='w-full max-w-[160px] h-[100px] relative overflow-hidden'>
            <Image 
                src={blog.coverImage}
                fill 
                alt={blog.title} 
                className='object-cover rounded-md'
                loading='lazy'
                />
        </Link>
        }
        

    </div>
  )
}

export default BlogCard