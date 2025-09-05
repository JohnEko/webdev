'use client'

import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Heading from '../common/Heading'
import FormField from '../common/FormField'
import Alert from '../common/Alert'
import Button from '../common/Button'
import { EditProfileSchema, EditProfileSchemaType } from '@/schemas/EditProfileSchema'
import { editUser } from '@/actions/users/edit-user'
import { tags } from '@/lib/tags'
import { User } from '@prisma/client'

const EditUserForm = ({user, isCredentials}: {user: User, isCredentials: boolean}) => {

    const [isPending, startTransition] = useTransition()
    const [isDeleting, startDeleting] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [deleteError, setDeleteError] = useState<string | undefined>('')
    const [deleteSuccess, setDeleteSuccess] = useState<string | undefined>('')

    const {register, handleSubmit, formState: {errors}} = useForm<EditProfileSchemaType>({
        resolver:zodResolver(EditProfileSchema),
        defaultValues: {
            name: user.name || undefined,
            email: user.email || undefined,
            bio: user.bio || undefined,
            tags: user.tags || undefined
        },
    })
    
    const onSubmit: SubmitHandler<EditProfileSchemaType> = (data) => {
        setSuccess('') 
        setError('')
        startTransition(() => {
            if (typeof user.id === 'string') {
              editUser(data, user.id).then((res) => {
                if(res?.error){
                  setError(res.error)
                }
                if(res?.success){
                  setSuccess(res.success)
                }
              })
            } 
          })
      }
    

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-[500] m-auto mt-8 gap-2'>
        <Heading title='Update Profile'/>
        <FormField 
            id='name'
            register={register}
            errors={errors}
            placeholder='name'
            disabled={isPending}
            label='name'
        />

        {isCredentials && <FormField 
            id='EMAIL'
            register={register}
            errors={errors}
            placeholder='email'
            disabled={isPending || !isCredentials}
            label='Email'
        />}

        <FormField 
            id='bio'
            register={register}
            errors={errors}
            placeholder='bio'
            disabled={isPending}
            label='bio'
        />

        <fieldset className="flex flex-col">
                    <legend className="mb-2 pr-2">Select Tags</legend>
                    <div className="flex gap-4 flex-wrap w-full">
                      {tags.map((tag) => {
                        if(tag == "All") return null
        
                        return <label key={tag} className="flex item-center space-x-2">
                          <input 
                            type="checkbox"
                            value={tag}
                            {...register("tags")}
                            disabled={false}
                          />
                          <span>{tag}</span>
                        </label>
                      })}
        
                    </div>
        
                    </fieldset>

        {error && <Alert message={error} error/>}
        {success && <Alert message={success} success/>}

       
        <Button type='submit' label={isPending ? "Saving..." : 'Save Changes'} disabled={isPending} />
        
    </form>
    <div className='max-w-[500px] m-auto mt-12'>
      <div className='text-rose-500'>
        <Heading title='Danger Zone'/>
      </div>
      {deleteError && <Alert message={deleteError} error/>}
      {deleteSuccess && <Alert message={deleteSuccess} success/>}
    </div>
    </>
  )
}

export default EditUserForm 