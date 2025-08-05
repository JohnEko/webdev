'use client'

import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import  {SubmitHandler, useForm} from 'react-hook-form'
import FormField from '../common/FormField'
import Button from '../common/Button'
import Heading from '../common/Heading'
import SocialAuth from './SocialAuth'
import { signUp } from '@/actions/auth/register'
import { startTransition, useState, useTransition } from 'react'
import Alert from '../common/Alert'

const RegisterForm = () => {
    // using react usetransition instead of usestate
  const [isPending, setTransition] = useTransition()
  //show the error on the UI
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterSchemaType>({resolver:zodResolver(RegisterSchema)})
 
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    //before we set the error we need to make sure the error and success are both null
    setSuccess('')
    setError('')
    startTransition(() => {
        signUp(data).then((res) => {
            setError(res.error)
            setSuccess(res.success)
        })
        
    })

}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-[500] m-auto mt-8 gap-2'>
        <Heading title='Create WebDev Blog Account' lg center/>
        <FormField 
            id='name'
            register={register}
            errors={errors}
            placeholder='name'
            disabled={isPending}
        />
        
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

        <FormField 
            id='confirmPassword'
            register={register}
            errors={errors}
            placeholder='confirmPassword'
            type='password'
            disabled={isPending}
        />
        <div>
            {error && <Alert message={error} error/>}
            {success && <Alert message={success} success/>}
        </div>
        <Button type='submit' label={isPending ? "Submitting..." : 'Register'} disabled={isPending}/>
        <div className='flex justify-center my-2'>Or</div>
        <SocialAuth />
    </form>
  )
}

export default RegisterForm