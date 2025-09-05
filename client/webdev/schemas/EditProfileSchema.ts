
import { tags } from '@/lib/tags'
import {z} from 'zod'

export const EditProfileSchema = z.object({
    
    name:z
        .string()
        .min(4, {message: "Name must be 4 or more character long"})
        .max(30, {message: "Name must be 30 or fewer character long"}),
    email: z.string().email(),
    bio: z.string().optional(),
    tags: z.array(z.string())

})

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>