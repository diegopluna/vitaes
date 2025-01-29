'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { client } from '@/lib/auth-client'
import { UploadButton } from '@/lib/uploadthing'
import { IconEdit } from '@tabler/icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const UpdateUserProfileDialog = () => {
  const queryClient = useQueryClient()
  const session = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await client.getSession()
      return session.data
    },
  })

  async function updateUserImage(url: string | null) {
    await client.updateUser({
      image: url,
    })
    queryClient.invalidateQueries({
      queryKey: ['session'],
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Update your profile</DialogTitle>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src={session.data?.user.image ?? undefined} />
              <AvatarFallback>
                {session.data?.user.name[0] ?? ''}
              </AvatarFallback>
            </Avatar>
            <UploadButton
              className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:ring-0 h-14 mt-1 ut-button:ut-uploading:after:bg-secondary"
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                await updateUserImage(res[0].url)
              }}
              onUploadError={(error: Error) => {
                toast.error(error.message)
              }}
            />
            {session.data?.user.image && (
              <Button
                className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                variant="ghost"
                onClick={async () => {
                  await updateUserImage(null)
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
