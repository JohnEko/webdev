'use client'

import React, { useState } from 'react'
import { PiHandsClapping } from 'react-icons/pi'
import { FaBookmark, FaRegBookmark, FaRegComment } from 'react-icons/fa'
import { FaHandsClapping } from 'react-icons/fa6'

import { BlogWithUser } from './ListBlog'
import { useSession } from 'next-auth/react'
import { clapBlog } from '@/actions/blogs/clap-blog'
import { useRouter } from 'next/navigation'
import { BookmarkBlog } from '@/actions/blogs/bookmark-blog'


const Reactions = ({ blog }: {blog: BlogWithUser}) => {
    const session = useSession()
    const router = useRouter()
    const userId = session.data?.user.userId
    const [clapCount, setClapCount] = useState(blog._count.claps)
    const [userHasClap, setUserHasClap] = useState(!!blog.claps.length)
    const [userHasBookmarked, setUserHasBookedmarked] = useState(!!blog.bookmark.length)

    

    const handleClap = async () => {
        if(!userId) return

        setClapCount((prevCount) => userHasClap ? prevCount -1 : prevCount + 1)
        //if user has clap in a post it stays but if not you cant clap twise
        setUserHasClap(preState => !preState)

        //lets save it in our database
        await clapBlog(blog.id, userId)
        router.refresh()

    }

    const handleBookmarked = async () => {
       if(!userId) return

        
        //if user has clap in a post it stays but if not you cant clap twise
        setUserHasBookedmarked(preState => !preState)

        //lets save it in our database
        await BookmarkBlog(blog.id, userId)
        router.refresh() 
    }

  return (
    <div className='flex justify-between items-center w-full text-sm'>
        <div className='flex items-center gap-4'>
            {/* different icons to be used  */}
            <span onClick={handleClap} className='mr-4 flex items-center gap-1 cursor-pointer4'>
                {userHasClap ? <FaHandsClapping  size={20}/> : <PiHandsClapping  size={20}/>}
                {clapCount}
            </span>
            <span className='flex items-center gap-1 cursor-pointer4'>
                <FaRegComment  size={18}/>
                {3}
            </span>
        </div>
        {/* for the bookmart sections */}
        <div>
            <span onClick={handleBookmarked}>
                {userHasBookmarked ? <FaBookmark  size={18} /> : <FaRegBookmark  size={18}/>}
                
            </span>
        </div>
    </div>
    
  )
}

export default Reactions