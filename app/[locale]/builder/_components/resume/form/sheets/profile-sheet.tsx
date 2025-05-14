'use client'

import { Profile } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useAppForm } from '@/components/ui/ts-form'
import { useResumeStore } from '@/providers/resume-store-provider'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

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
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('ProfileSheet')

  const basics = resume.basics

  const form = useAppForm({
    validators: {
      onChange: profileFormSchema,
    },
    defaultValues: {
      network: defaultValues?.network || '',
      username: defaultValues?.username || '',
      url: defaultValues?.url || '',
    },
    onSubmit: ({ value }) => {
      const profile: Profile = {
        ...value,
        id: `${value.network}`,
      }

      if (defaultValues) {
        setResumeField('basics', {
          ...basics,
          profiles: basics.profiles.map(p =>
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
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    },
    [form],
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? t('editProfile') : t('addProfile')}
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
            {defaultValues ? t('editProfile') : t('addProfile')}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="space-y-8">
            <form.AppField
              name="network"
              children={field => (
                <field.FormItem>
                  <field.FormLabel>{t('network')}</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder={t('networkPlaceholder')}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <form.AppField
              name="username"
              children={field => (
                <field.FormItem>
                  <field.FormLabel>{t('username')}</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder={t('usernamePlaceholder')}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <form.AppField
              name="url"
              children={field => (
                <field.FormItem>
                  <field.FormLabel>{t('url')}</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder={t('urlPlaceholder')}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <Button type="submit">{t('saveProfile')}</Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
