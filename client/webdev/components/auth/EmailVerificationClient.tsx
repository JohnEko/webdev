'use client'

import { verifyEmail } from '@/actions/auth/email-verification'
import  Heading  from '../common/Heading'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Alert from '../common/Alert'
import Button from '../common/Button'

const EmailVerificationClient = () => {
    const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [pending, setPending] = useState(true)


  useEffect(() => {
    setPending(true)
    if(!token) return setError("Missing verification token")
    
        verifyEmail(token).then(res =>{
            setSuccess(res.success)
            setError(res.error)
        })
        setPending(false)
    //verifyEmail(token)
  }, [token])
  return (
    <div>
        <Heading title="WEBDEV.blog" center/>
        {pending && <div>Verifying Email....</div>}
        {success && <Alert message={success} error/>}
        {error && <Alert message={error} error/>}
        {success && <Button type="submit" label="Login" onClick={() => router.push("/login")}/>}

    </div>
  )
}

export default EmailVerificationClient