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
import type { Language } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'

export function LanguageSheet({ defaultValues }: { defaultValues?: Language }) {
  const t = useTranslations('language-sheet')

  const languageExperienceFormSchema = z.object({
    language: z.string().min(1, t('language-required')),
    fluency: z.string().min(1, t('fluency-required')),
  })

  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const languages = resume.languages

  const form = useForm({
    resolver: zodResolver(languageExperienceFormSchema),
    defaultValues: {
      language: defaultValues?.language || '',
      fluency: defaultValues?.fluency || '',
    },
  })

  const onSubmit = (value: z.infer<typeof languageExperienceFormSchema>) => {
    const language: Language = {
      ...value,
      id: `${value.language}`,
    }
    if (defaultValues) {
      setResumeField('languages', {
        ...languages,
        content: languages.content.map((w) =>
          w.id === defaultValues.id ? language : w,
        ),
      })
    } else {
      setResumeField('languages', {
        ...languages,
        content: [...languages.content, language],
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
            <ScrollArea className="flex-1 h-0">
              <div className="grid gap-4 py-4 px-1">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('language')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fluency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fluency')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              {t('save')}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
