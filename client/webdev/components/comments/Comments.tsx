

import React from 'react'
import { BlogWithUser } from '../blog/ListBlog'
import Heading from '../common/Heading'
import { auth } from '@/auth'
import AddCommentsForm from './AddCommentsForm'

const Comments = async ({blog}: {blog: BlogWithUser}) => {
    const session = await auth()

    const userId = session?.user.userId

  return (
    <div>
        <Heading title='Comments'/>
    {/* add comments form, this can be below  */}
    {userId && <AddCommentsForm blogId={blog.id} userId={userId} creatorId={blog.userId} />}
    {/* list of comments */}
   
    </div>
  )
}

export default Comments