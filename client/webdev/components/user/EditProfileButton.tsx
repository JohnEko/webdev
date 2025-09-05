'use client'

import React from 'react'
import Button from '../common/Button'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

const EditProfileButton = ({user} : {user: User}) => {
    const router = useRouter()
  return (
    <div>
        <Button  label='Edit' onClick={() => router.push(`/user/edit/${user.id}`)}/>
    </div>
  )
}

export default EditProfileButton