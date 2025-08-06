'use client'

import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import  {SubmitHandler, useForm} from 'react-hook-form'
import FormField from '../common/FormField'
import Button from '../common/Button'
import Heading from '../common/Heading'
import SocialAuth from './SocialAuth'
import { startTransition, useState, useTransition } from 'react'
import { login } from '@/actions/auth/login'
import Alert from '../common/Alert'
import { useRouter } from 'next/navigation'
import { LOGIN_REDIRECT } from '@/routes'

const LoginForm = () => {

  const router = useRouter()

  const [isPending, setIsPending] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({resolver:zodResolver(LoginSchema)})
 
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    
    setError('')
    startTransition(() => {
        login(data).then((res) => {
          if(res?.error){
            setError(res?.error)

          }
          if(!res?.error){
            router.push(LOGIN_REDIRECT)
          }
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-[500] m-auto mt-8 gap-2'>
        <Heading title='Login to WebDev Blog' lg center/>
        <FormField 
            id='email'
            register={register}
            errors={errors}
            placeholder='email'
            disabled={isPending}
        />

        <FormField 
            id='password'
            register={register}
            errors={errors}
            placeholder='password'
            type='password'
            disabled={isPending}
        />
        {error && <Alert message={error} error/>}
        <Button type='submit' label={isPending ? "Submitting..." : 'Login'} disabled={isPending} />
        <div className='flex justify-center my-2'>Or</div>
        <SocialAuth />
    </form>
  )
}

export default LoginForm