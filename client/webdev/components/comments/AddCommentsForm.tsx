'use client'

import { CommentSchema, CommentSchemaType } from '@/schemas/CommentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../common/Button'
import TexteraField from '../common/TexAreaField'
import { addComments } from '@/actions/comments/add-comments'
import { toast } from 'react-hot-toast'

interface IAddCommentsProps{
    blogId: string
    userId: string
    parentId?: string
    repliedToId?: string
    placeholder?: string
    creatorId?: string
}

const AddCommentsForm = ({blogId, userId, parentId, repliedToId, placeholder, creatorId}: IAddCommentsProps) => {
    
    const [isPending, startTransition] = useTransition()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CommentSchemaType>({
        resolver: zodResolver(CommentSchema)
    })

    const onSubmit: SubmitHandler<CommentSchemaType> = (data) =>{
        // calling our server action
        startTransition(() => {
           addComments({values:data, userId, blogId, parentId, repliedToUserId: repliedToId}).then((res) =>{
            if(res.error) return toast.error(res.error)
            if(res.success){
                toast.success(res.success)
                reset()
            }
           })
        })

    }

  return (<form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col my-2'>
     <TexteraField
        id='content'
        register={register}
        errors={errors}
        placeholder={placeholder ? placeholder : "Add comment"}
        disabled={isPending} 
     />
    <div>
        <Button type='submit' label={isPending ? "Submitting..." : "Submit"} disabled={isPending}/>
    </div>
    </form>
  )
}

export default AddCommentsForm