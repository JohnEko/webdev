

import {Comment, User} from "@prisma/client"

export type CommentWithUser = Comment & {
    user: Pick<User, 'id' | 'name' | "image"> 
    repliedToUser: Pick<User, 'id' | 'name'> | null
    _count: {
            replies: number
    }
}

const ListComments = ({comments}: {comments: CommentWithUser[] }) => {
  return (
    <div className="mt-4" id="comments">
        {comments.map((c) => <div key={c.id} id={c.id}>
            {c.content}
        </div>)}
    </div>
  )
}

export default ListComments