
import Alert from '@/components/common/Alert'
import UserProfile from '@/components/user/UserProfile'
import { db } from '@/lib/db'
import React from 'react'

const Profile = async ({params}: {params: Promise<{id: string, page: string}>}) => {

    const {id, page} = await params

    const user = await db.user.findUnique({
        where: {id}
    })

    if(!user) return <Alert error message='User not found'/>
  return (
    <UserProfile user={user} page={page} />
  )
}

export default Profile