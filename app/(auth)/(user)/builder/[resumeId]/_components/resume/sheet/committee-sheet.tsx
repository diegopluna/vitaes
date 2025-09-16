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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Committee } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'

export function ComitteeSheet({
  defaultValues,
}: {
  defaultValues?: Committee
}) {
  const t = useTranslations('comittee-sheet')

  const comitteeExperienceFormSchema = z.object({
    year: z.string().min(1, t('year-required')),
    position: z.string().min(1, t('position-required')),
    organization: z.string().min(1, t('organization-required')),
    location: z.string().min(1, t('location-required')),
  })

  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const comittees = resume.committees

  const form = useForm({
    resolver: zodResolver(comitteeExperienceFormSchema),
    defaultValues: {
      year: defaultValues?.year || '',
      position: defaultValues?.position || '',
      organization: defaultValues?.organization || '',
      location: defaultValues?.location || '',
    },
  })

  const onSubmit = (value: z.infer<typeof comitteeExperienceFormSchema>) => {
    const comittee: Committee = {
      ...value,
      id: `${value.position} - ${value.organization}`,
    }
    if (defaultValues) {
      setResumeField('committees', {
        ...resume.committees,
        content: comittees.content.map((w) =>
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
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? t('edit') : t('add')}>
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
          <SheetTitle>{defaultValues ? t('edit') : t('add')}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col h-5/6"
          >
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('year')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('position')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('organization')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('location')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button type="submit" className="mt-4">
              {t('save')}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
