import {z} from 'zod'


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message: "password must be 6 character or more long"})
})

export type LoginSchemaType = z.infer<typeof LoginSchema>