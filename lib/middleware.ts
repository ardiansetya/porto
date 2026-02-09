import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { authClient } from './auth-client'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders() as HeadersInit
  const { data: session } = await authClient.getSession({
    fetchOptions: { headers },
  })

  if (!session) {
    throw redirect({ to: '/' })
  }

  return await next({
    context: {
      user: {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
      },
    },
  })
})
