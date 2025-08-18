import {z} from 'zod'

//validating our blog with types
export const BlogSchema = z.object({
    userId: z.string(),
    title: z
        .string()
        .min(10, {message: "titleis too short"})
        .max(150, {message: "title is too long, max character 150"}),
    content: z.string().min(10, "content is too short"),
    coverImage: z.string().optional(),
    isPublished: z.boolean(),
    tags: z.array(z.string())
})

export type BlogSchemaType = z.infer<typeof BlogSchema>