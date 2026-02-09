import { projects } from 'db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from './init'

import { createProjectSchema } from '@/schema/createProjectSchema'
import type { TRPCRouterRecord } from '@trpc/server'
import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const projectsRouter = {
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany()
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      })
    }),
  add: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(projects).values({
        id: randomUUID(),
        title: input.title,
        slug: input.slug,
        description: input.description,
        tags: input.tags,
        imageUrl: input.image,
        projectUrl: input.image,
        published: input.published,
        featured: input.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        projectUrl: z.string().optional(),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db
        .update(projects)
        .set({
          title: data.title,
          slug: data.slug,
          description: data.description,
          tags: data.tags,
          imageUrl: data.image,
          projectUrl: data.projectUrl,
          published: data.published,
          featured: data.featured,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id))
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  projects: projectsRouter,
})
export type TRPCRouter = typeof trpcRouter
