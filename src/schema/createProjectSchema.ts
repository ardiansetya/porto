import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Title minimal 3 karakter').max(255),
  slug: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug harus lowercase dan menggunakan dash (-)',
    }),
  description: z.string().min(10, 'Description terlalu singkat'),
  tags: z.array(z.string().min(1).max(50)).max(15).default([]),
  image: z.string('Image harus berupa URL valid').optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>
