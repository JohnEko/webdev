import React from 'react'
import Button from '../common/Button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import Login from '@/app/(auth)/login/page'
import { LOGIN_REDIRECT } from '@/routes'

const SocialAuth = () => {
  //login with google or any social network
  const handleOnClick = (provider: 'google') => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT
    })
  }
  return (
    <div className='flex gap-2 flac-col md:flex-row'>
        <Button type='button' label='Continue with Github' outlined icon={FaGithub} onClick={() => {}}/>
        <Button type='button' label='Continue with Google' 
        outlined icon={FaGoogle} onClick={() => handleOnClick('google')}/>

    </div>
  )
}

export default SocialAuth