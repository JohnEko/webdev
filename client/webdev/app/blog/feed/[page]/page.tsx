import { getPublishedBlogs } from '@/actions/blogs/get-published-blogs'
import ListBlog from '@/components/blog/ListBlog'
import Alert from '@/components/common/Alert'
import React from 'react'

//this is a server conponent

interface BlogFeedProps{
    params: Promise<{page: string}>
    searchParams: Promise<{
      tag:string
    }>
}


const BlogFeed = async ({params, searchParams}: BlogFeedProps) => {
    const { page } = await params
    const searchObj = await searchParams

    // convert the string to int using parseInt
    const currentPage = parseInt(page, 10) || 1

    const {success, error} = await getPublishedBlogs({ page: currentPage, limit: 5, searchObj})

    if(error) return <Alert message='Error fetching bogs' />

    if(!success) return <Alert message='No post' />

    const { blog, hasMore} = success

  return (
    <div>
      <ListBlog  blog={blog} hasMore={hasMore} currentPage={currentPage} />
      
    </div>
  )
}

export default BlogFeed