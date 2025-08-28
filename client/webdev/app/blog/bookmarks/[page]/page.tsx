import { getBookmarks } from '@/actions/blogs/get-bookmarks'
import ListBlog from '@/components/blog/ListBlog'
import Alert from '@/components/common/Alert'
import Heading from '@/components/common/Heading'
import React from 'react'


interface BookmarksProps{
    params: Promise<{page: string}>
    
}

const BookmarkPage = async ({params}: BookmarksProps) => {
  
    const { page } = await params
    
        // convert the string to int using parseInt
        const currentPage = parseInt(page, 10) || 1
    
        const {success, error} = await getBookmarks({page: currentPage, limit:5})
    
        if(error) return <Alert message='Error fetching bogs' />
    
        if(!success) return <Alert message='No blogs' />
    
        const { blogs, hasMore} = success
    
      return (
        <div>
            <div className='max-w-[800px] m-auto mt-4 px-4'>
                <Heading title='Bookmarks' lg/>
            </div>
          <ListBlog  blog={blogs} hasMore={hasMore} currentPage={currentPage} />
          
        </div>
      )

}

export default BookmarkPage