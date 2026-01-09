import { initTRPC } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { db } from 'db/drizzle'
import { auth } from 'lib/auth'
import superjson from 'superjson'

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await auth.api.getSession({ headers: opts.req.headers })

  return {
    session,
    db,
  }
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new Error('unauthorized')
  }
  return next()
})
