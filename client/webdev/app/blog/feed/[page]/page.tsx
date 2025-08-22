import { getPublishedBlogs } from '@/actions/blogs/get-published-blogs'
import Alert from '@/components/common/Alert'
import React from 'react'


interface BlogFeedProps{
    params: Promise<{page: string}>
}


const BlogFeed = async ({params}: BlogFeedProps) => {
    const { page } = await params
    // convert the string to int using parseInt
    const currentPage = parseInt(page, 10) || 1

    const {success, error} = await getPublishedBlogs({ page: currentPage, limit: 5})

    if(error) return <Alert message='Error fetching bogs' />

    if(success) return <Alert message='No post' />

    const { blog, hasMore}: any = success

  return (
    <div>BlogFeed</div>
  )
}

export default BlogFeed