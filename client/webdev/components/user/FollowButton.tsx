'use client'

import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const FollowButton = ({user, isFollowing: following, isList =false} : {user: User | Pick<User, 'id' | 'name' | 'image'>, isFollowing: boolean, isList: boolean}) => {
    const [isFollowing, setIsFollowing] = useState(following) 
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsFollowing(following)
    }, [following])

    const handleFollow = async () => {

        try {
            setLoading(true)

            const res = await axios.post(`/api/follow/${user.id}/`)
            if(res.data.success == 'followed'){
                setIsFollowing(true)
                //after following send notification

            } else if(res.data.success == 'unfollowed'){
                setIsFollowing(false)
            }

            router.refresh()

        } catch (error: any) {
            toast.error(error.response.data.error)
        }finally{setLoading(false)}

    }
  
    return (
    <Button 
        outlined
        label={loading ? "Loading..." : isFollowing ? "unfollow" : "follow"}
        onClick={handleFollow}
        disabled={loading}
        small={isList}
        />
  )
}

export default FollowButton
