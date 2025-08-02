'use client'

import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import  {useForm} from 'react-hook-form'

const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({resolver:zodResolver(LoginSchema)})

  return (

    <form action=""></form>
  )
}

export default LoginForm