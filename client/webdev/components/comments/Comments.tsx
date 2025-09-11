

import React from 'react'
import { BlogWithUser } from '../blog/ListBlog'
import Heading from '../common/Heading'
import { auth } from '@/auth'
import AddCommentsForm from './AddCommentsForm'
import { getComments } from '@/actions/comments/get-comments'
import ListComments from './ListComments'

const Comments = async ({blog}: {blog: BlogWithUser}) => {
    const session = await auth()

    const userId = session?.user.userId

    const {success} = await getComments(blog.id, null, userId)

  return (
    <div>
        <Heading title='Comments'/>
    {/* add comments form, this can be below  */}
    {userId && <AddCommentsForm blogId={blog.id} userId={userId} creatorId={blog.userId} />}
    {/* list of comments */}
    {!!success?.comments.length && (
      <ListComments
        comments={success.comments.map((comment: any) => ({
          ...comment,
          user: {
            id: comment.user.id,
            name: comment.user.name,
            image: comment.user.image,
          },
        }))}
      />
    )}
   
    </div>
  )
}

export default Comments