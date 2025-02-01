'use client'

import { Profile } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResume } from '@/providers/resume-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileFormSchema = z.object({
  network: z.string().min(1, 'Network is required'),
  username: z.string().min(1, 'Username is required'),
  url: z.string().url('URL is invalid'),
})

export const ProfileSheet = ({
  defaultValues,
}: {
  defaultValues?: Profile
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setBasics } = useResume()

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
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Profile' : 'Add Profile'}
        >
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            {defaultValues ? (
              <IconPencil className="size-4" />
            ) : (
              <IconPlus className="size-6" />
            )}
          </Button>
        </TooltipWrapper>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            {defaultValues ? 'Edit Profile' : 'Add Profile'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. LinkedIn" {...field} />
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
                    <Input placeholder="e.g. john-doe" {...field} />
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
                    <Input
                      placeholder="e.g. https://linkedin.com/in/john-doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Profile</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
