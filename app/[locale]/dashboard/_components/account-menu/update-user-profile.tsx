'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/auth-client'
import { UploadButton } from '@/lib/uploadthing'
import { useSession } from '@/providers/session-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconEdit } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
})

export const UpdateUserProfileDialog = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const { session } = useSession()

  async function updateUserImage(url: string | null) {
    await client.updateUser({
      image: url,
    })
    queryClient.invalidateQueries({
      queryKey: ['session'],
    })
  }

  async function updateUserName(name: string) {
    setLoading(true)
    await client.updateUser({
      name,
    })
    queryClient.invalidateQueries({
      queryKey: ['session'],
    })
    setLoading(false)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user.name,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUserName(values.name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Update your profile</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? undefined} />
                  <AvatarFallback>{session?.user.name[0] ?? ''}</AvatarFallback>
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
                {session?.user.image && (
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
