import { projects } from 'db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from './init'

import { createProjectSchema } from '@/schema/createProjectSchema'
import type { TRPCRouterRecord } from '@trpc/server'

const projectsRouter = {
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany()
  }),
  add: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(projects).values({
        title: input.title,
        slug: input.slug,
        description: input.description,
        tags: input.tags,
        image: input.image,
        projectUrl: input.projectUrl,
        published: input.published,
        featured: input.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  projects: projectsRouter,
})
export type TRPCRouter = typeof trpcRouter
