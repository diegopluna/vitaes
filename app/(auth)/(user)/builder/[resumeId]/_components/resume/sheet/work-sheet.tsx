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
import type { StringWithId, Work } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const workHighlightKey = Symbol('work-highlight')

function getWorkHighlightData(highlight: StringWithId): ItemData<StringWithId> {
  return {
    [workHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isWorkHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[workHighlightKey] === true
}

const WorkHighlightDragList = HighlightDragList<StringWithId>

export function WorkSheet({ defaultValues }: { defaultValues?: Work }) {
  const t2 = useTranslations()
  const t = useTranslations('work-sheet')

  const workExperienceFormSchema = z.object({
    company: z.string().min(1, t('company-required')),
    location: z.string().min(1, t('location-required')),
    position: z.string().min(1, t('position-required')),
    startDate: z.string().min(1, t('start-date-required')),
    endDate: z.string(),
    highlights: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
  })

  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const works = resume.work

  const form = useForm({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      company: defaultValues?.company || '',
      location: defaultValues?.location || '',
      position: defaultValues?.position || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      highlights: defaultValues?.highlights || [],
    },
  })

  const onSubmit = (value: z.infer<typeof workExperienceFormSchema>) => {
    const work: Work = {
      ...value,
      endDate: value.endDate || '',
      id: `${value.company} - ${value.position}`,
      highlights: value.highlights.map((highlight) => {
        return {
          id: highlight.value,
          value: highlight.value,
        } as StringWithId
      }),
    }
    if (defaultValues) {
      setResumeField('work', {
        ...works,
        content: works.content.map((w) =>
          w.id === defaultValues.id ? work : w,
        ),
      })
    } else {
      setResumeField('work', {
        ...works,
        content: [...works.content, work],
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('company')}</FormLabel>
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('start-date')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('end-date')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="highlights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('highlights')}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={(e) => {
                              e.preventDefault()
                              field.onChange([
                                ...field.value,
                                { id: `${Date.now()}`, value: '' },
                              ])
                            }}
                          >
                            <IconPlus size={14} />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center text-sm">
                              {t('no-highlights-added')}
                            </p>
                          )}
                          <WorkHighlightDragList
                            items={field.value}
                            getItemData={getWorkHighlightData}
                            isItemData={isWorkHighlightData}
                            setItems={field.onChange}
                            itemType={t2('highlight-type')}
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((h) => h.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((h) => {
                                  if (h.id === id) {
                                    return { ...h, value: text }
                                  }
                                  return h
                                }),
                              )
                            }}
                          />
                        </div>
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
