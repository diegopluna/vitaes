'use client'

import { Committee } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useAppForm } from '@/components/ui/ts-form'
import { useTranslations } from 'next-intl'

const comitteeExperienceFormSchema = z.object({
  year: z.string().min(1, 'Year is required'),
  position: z.string().min(1, 'Position is required'),
  organization: z.string().min(1, 'Organization is required'),
  location: z.string().min(1, 'Location is required'),
})

export const ComitteeSheet = ({
  defaultValues,
}: {
  defaultValues?: Committee
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('ComitteeSheet')

  const comittees = resume.committees

  const form = useAppForm({
    validators: {
      onChange: comitteeExperienceFormSchema,
    },
    defaultValues: {
      year: defaultValues?.year || '',
      position: defaultValues?.position || '',
      organization: defaultValues?.organization || '',
      location: defaultValues?.location || '',
    },
    onSubmit: ({ value }) => {
      const comittee: Committee = {
        ...value,
        id: `${value.position} - ${value.organization}`,
      }
      if (defaultValues) {
        setResumeField('committees', {
          ...resume.committees,
          content: comittees.content.map(w =>
            w.id === defaultValues.id ? comittee : w,
          ),
        })
      } else {
        setResumeField('committees', {
          ...resume.committees,
          content: [...comittees.content, comittee],
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
          tooltip={
            defaultValues
              ? t('edit', { label: resume.committees.label })
              : t('add', { label: resume.committees.label })
          }
        >
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            {defaultValues ? (
              <IconPencil className="size-4" />
            ) : (
              <IconPlus className="size-4" />
            )}
          </Button>
        </TooltipWrapper>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <SheetHeader>
          <SheetTitle>
            {defaultValues
              ? t('edit', { label: resume.committees.label })
              : t('add', { label: resume.committees.label })}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
                <form.AppField
                  name="year"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('year')}</field.FormLabel>
                      <field.FormControl>
                        <Input
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
                  name="position"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('position')}</field.FormLabel>
                      <field.FormControl>
                        <Input
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
                  name="organization"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('organization')}</field.FormLabel>
                      <field.FormControl>
                        <Input
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
                  name="location"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('location')}</field.FormLabel>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              {t('save', { label: comittees.label })}
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
