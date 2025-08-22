'use client'

import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import FormField from "../common/FormField"
import AddCover from "./AddCover"
import { useEffect, useState, useTransition } from "react"
import CoverImage from "./CoverImage"
import { tags } from "@/lib/tags"
import BlockNoteEditor from "../editor/BlockNoteEditor"
import Button from "../common/Button"
import Alert from "../common/Alert"
import { createBlog } from "@/actions/blogs/create-blog"

//uploading images to edgestore
const CreateBlogForm = () => {

  const session = useSession()
  const userId = session.data?.user.userId
  const [uploadedCover, setUploadedCover] = useState<string>()
  const [content, setContent] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPublishing, startPublishing] = useTransition()
  const [isSavingAsDraft, startSavingAsDraft] = useTransition()


  console.log(uploadedCover)

  const {register, handleSubmit, formState: {errors}, setValue} = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userId,
      isPublished: false
    }
  })

  useEffect(() => {
    if(uploadedCover){
      setValue('coverImage', uploadedCover, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [uploadedCover])

   useEffect(() => {
    if(typeof content === 'string'){
      setValue('content', content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [content])
  //create other funtion for content
  const onChange = (content: string) => {
    setContent(content)

  }
  
  const onPublish:SubmitHandler<BlogSchemaType> = (data) => {
    console.log(data)
    setSuccess('')
    setError('')

    if(data.tags.length > 4){
      return setError("Select only 4 tags")

    }
    startPublishing(() => {
      createBlog({...data, isPublished: true}).then(data => {
        if(data.error) {
          setError(data.error)
        }

        if(data.success) {
          setSuccess(data.success)
        }
      })
    })

  }

  const onSaveDraft:SubmitHandler<BlogSchemaType> = (data) => {
    console.log(data)
    setSuccess('')
    setError('')

    // if(data.tags.length > 4){
    //   return setError("Select only 4 tags")

    // }
    startSavingAsDraft(() => {
      createBlog({...data, isPublished: false}).then(data => {
        if(data.error) {
          setError(data.error)
        }

        if(data.success) {
          setSuccess(data.success)
        }
      })
    })

  }


  return (
    <form onSubmit={handleSubmit(onPublish)}
      className=" flex flex-col justify-between max-w[1200px] m-auto min-h-[85vh]">
      <div>
          {!!uploadedCover && <CoverImage url={uploadedCover} isEditor={true} setUploadedCover={setUploadedCover}/>}
          {!uploadedCover && <AddCover  setUploadedCover={setUploadedCover}/>}    
          <FormField 
            id="title"
            register={register}
            errors={errors}
            placeholder="Blog Title"
            disabled={false}
            inputClassNames="border-none text-5xl font bold bg-transperent px-0"
          />

          <fieldset className="flex flex-col border-y mb-4 py-2">
            <legend className="mb-2 pr-2">Select 4 Tags</legend>
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
              {errors.tags && errors.tags.message && <span className="text-sm text-rose-400">
                Select atleast one tag, max of 4!
            </span>}

            </fieldset>
            <BlockNoteEditor onChange={onChange}/>
            {errors.content && errors.content.message && <span className="text-sm text-rose-400">
              {errors.content.message}
            </span>}
            
      </div>

{/* //this bottom div helps in publishing the blog ,saving to draft and deleting the blog */}
      <div className="border-t pt-2">
        {errors.userId && errors.userId.message && <span className="text-sm text-rose-400">
              Missing a userId
            </span>}
            {success && <Alert message={success} success/>}
            {error && <Alert message={error} error/>} 

        <div className="flex item-center justify-between gap-6">
          <div>
            <Button type="button" label="Delete"/>
          </div>

          <div className="flex gap-4">
            <Button type="submit" label={isPublishing ? "Publishing" : "Publish"} className="bg-blue-700"/>
            <Button type="button" label={isSavingAsDraft ? "Saving..." : "Save as Draft"} 
            onClick={handleSubmit(onSaveDraft)}/>
          </div>

        </div>
      </div>

    </form>
  )
}

export default CreateBlogForm