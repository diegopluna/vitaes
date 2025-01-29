import { auth } from '@/lib/auth'
import { createUploadthing, FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      })

      if (!session?.user) throw new UploadThingError('Unauthorized')

      return {
        userId: session.user.id,
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url:', file.url)

      return {
        uploadedBy: metadata.userId,
        url: file.url,
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
