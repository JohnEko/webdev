

import React, { useState } from 'react'
import { CommentWithUser } from './ListComments'
import UserSummary from '../blog/UserSummary'
import { Span } from 'next/dist/trace'
import CommentReactions from './CommentReactions'
import { useSession } from 'next-auth/react'
import AddCommentsForm from './AddCommentsForm'

const ReplyCard = ({reply} : {reply: CommentWithUser}) => {
    const session = useSession()
    const userId = session.data?.user.userId

    const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <div className='p-4 pr-0 flex flex-col gap-2'>
        <UserSummary  user={reply.user} createdDate={reply.createdAt}/>
        {/* person we reply to */}
        <p>{reply.repliedToUser && 
            <span className='bg-secondary px-2 py-1 rounded text-sm cursor-pointer'>@{reply.repliedToUser.name}</span>}
            {reply.content}</p>

            <CommentReactions comment={reply} setShowForm={setShowForm} isReply={true}/>
            {/* to show the reply form */}
            {(showForm ) && <div className='border-1-2 pl-2 my-2 ml-4'>
                {userId && showForm && <AddCommentsForm blogId={reply.blogId} userId={userId} 
                parentId={reply.parentId ? reply.parentId : undefined} repliedToId={reply.userId} placeholder='Reply'/>}
            </div>}
    </div>
    
  )
}

export default ReplyCard