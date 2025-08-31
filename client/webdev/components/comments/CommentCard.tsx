'use client'

import React, { useState } from 'react'
import { CommentWithUser } from './ListComments'
import UserSummary from '../blog/UserSummary'
import CommentReactions from './CommentReactions'
import { useSession } from 'next-auth/react'
import AddCommentsForm from './AddCommentsForm'
import ListReplies from './ListReplies'

const CommentCard = ({comment} : {comment: CommentWithUser}) => {
    const session = useSession()
    const userId = session.data?.user.userId
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showReplies, setShowReples] = useState<boolean>(false)



  return (
    <div className='border-2 p-4 flex flex-col gap-2 rounded-md mt-6'>
        <UserSummary  user={comment.user} createdDate={comment.createdAt}/>
        <p>{comment.content}</p>

        {/* comment Reaction or Reply */}
        <CommentReactions comment={comment} setShowForm={setShowForm} setShowReplies={setShowReples}/>
        
        {/* to show the reply form */}
        {(showForm || showReplies) && <div className='border-1-2 pl-2 my-2 ml-4'>
            {userId && showForm && <AddCommentsForm blogId={comment.blogId} userId={userId} 
            parentId={comment.id} repliedToId={comment.userId} placeholder='Add Reply'/>}

            {showReplies && <ListReplies comment={comment} userId={userId}/>}
        </div>}
    </div>
  )
}

export default CommentCard