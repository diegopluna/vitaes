'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Profile } from '@/@types/resume'
import { useResumeStore } from '@/providers/resume-store-provider'

const profileFormSchema = z.object({
  network: z.string().min(1, 'Network is required'),
  username: z.string().min(1, 'Username is required'),
  url: z.string().url('Must be a valid URL'),
})

export const ProfileModal = ({
  defaultValues,
}: {
  defaultValues?: Profile
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setBasics } = useResumeStore((state) => state)

  const basics = resume.basics

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      network: defaultValues?.network || '',
      username: defaultValues?.username || '',
      url: defaultValues?.url || '',
    },
  })

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const profile: Profile = {
      ...values,
      id: `${values.network}-${values.username}`,
    }
    if (defaultValues) {
      setBasics({
        ...basics,
        profiles: basics.profiles.map((p) =>
          p.id === profile.id ? profile : p,
        ),
      })
    } else {
      setBasics({ ...basics, profiles: [...basics.profiles, profile] })
    }
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Profile' : 'Add Profile'}
        >
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            {defaultValues ? (
              <Pencil className="size-4" />
            ) : (
              <PlusCircle className="size-6" />
            )}
          </Button>
        </TooltipWrapper>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Edit Profile' : 'Add Profile'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter network name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Profile</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
