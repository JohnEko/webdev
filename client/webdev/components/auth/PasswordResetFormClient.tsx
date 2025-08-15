'use client'


import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Heading from '../common/Heading'
import FormField from '../common/FormField'
import Alert from '../common/Alert'
import Button from '../common/Button'
import { passwordEmail } from '@/actions/auth/password-email'
import { useSearchParams } from 'next/navigation'
import { PasswordResetSchema, PasswordResetSchemaType } from '@/schemas/PasswordResetSchema'

const PasswordResetFormClient = () => {
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const {register, handleSubmit, formState: {errors}} = useForm<PasswordResetSchemaType>({
        resolver:zodResolver(PasswordResetSchema)})
    
    //get our token
    const token = searchParams.get('token')
    const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => { 
        setError('')
        startTransition(() => {
            // passwordEmail(data).then((res) => {
            //   if(res?.error){
            //     setError(res.error)
    
            //   }
              
            //   if(res?.success){
            //     setSuccess(res.success)
            //   }
            // })
          })
      }
    

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-[500] m-auto mt-8 gap-2'>
        <Heading title='Enter you new WEBDEV password' lg center/>
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

        {error && <Alert message={error} error/>}
        {success && <Alert message={success} success/>}

       
        <Button type='submit' label={isPending ? "Submitting..." : 'Save New Password'} disabled={isPending} />
        
    </form>
  )
}

export default PasswordResetFormClient