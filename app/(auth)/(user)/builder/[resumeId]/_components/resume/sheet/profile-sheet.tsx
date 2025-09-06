'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { TooltipWrapper } from '@/components/tooltip-wrapper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Profile } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'

export function ProfileSheet({ defaultValues }: { defaultValues?: Profile }) {
  const t = useTranslations('profile-sheet')

  const profileFormSchema = z.object({
    network: z.string().min(1, t('network-required')),
    username: z.string().min(1, t('username-required')),
    url: z.url(t('url-invalid')),
  })
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const basics = resume.basics

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      network: defaultValues?.network || '',
      username: defaultValues?.username || '',
      url: defaultValues?.url || '',
    },
  })

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    const profile: Profile = {
      ...values,
      id: `${values.network}`,
    }

    if (defaultValues) {
      setResumeField('basics', {
        ...basics,
        profiles: basics.profiles.map((p) =>
          p.id === defaultValues.id ? profile : p,
        ),
      })
    } else {
      setResumeField('basics', {
        ...basics,
        profiles: [...basics.profiles, profile],
      })
    }
    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? t('edit-profile') : t('add-profile')}
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
      <SheetContent side="left" className="p-4">
        <SheetHeader>
          <SheetTitle>
            {defaultValues ? t('edit-profile') : t('add-profile')}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('network')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('network-placeholder')} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('username')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('username-placeholder')} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('url')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('url-placeholder')} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">{t('save')}</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
