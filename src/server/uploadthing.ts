import { db } from 'db/drizzle'
import { projects } from 'db/schema'
import { eq } from 'drizzle-orm'
import { auth } from 'lib/auth'
import type { FileRouter } from 'uploadthing/server'
import { UploadThingError, createUploadthing } from 'uploadthing/server'
import z from 'zod'

const f = createUploadthing()

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .middleware(async ({ req, input }) => {
      console.log('Upload middleware hit')

      const user = await auth.api.getSession({ headers: req.headers })
      if (!user) throw new UploadThingError('Unauthorized')

      return { userId: user.user.id, projectId: input.projectId }
    })
    .onUploadComplete(async ({ metadata, file, }) => {
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.ufsUrl)

      await db
        .update(projects)
        .set({ imageUrl: file.ufsUrl })
        .where(eq(projects.id, metadata.projectId))

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
