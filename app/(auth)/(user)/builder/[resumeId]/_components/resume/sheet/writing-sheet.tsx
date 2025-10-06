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
import type { StringWithId, Writing } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const writingHighlightKey = Symbol('writing-highlight')

function getWritingHighlightData(
  highlight: StringWithId,
): ItemData<StringWithId> {
  return {
    [writingHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isWritingHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[writingHighlightKey] === true
}

const WritingHighlightDragList = HighlightDragList<StringWithId>

export function WritingSheet({ defaultValues }: { defaultValues?: Writing }) {
  const t = useTranslations('writing-sheet')

  const writingExperienceFormSchema = z.object({
    title: z.string().min(1, t('title-required')),
    role: z.string().min(1, t('role-required')),
    medium: z.string().min(1, t('medium-required')),
    startDate: z.string().min(1, t('start-date-required')),
    endDate: z.string(),
    description: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
  })

  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const writings = resume.writings

  const form = useForm({
    resolver: zodResolver(writingExperienceFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      role: defaultValues?.role || '',
      medium: defaultValues?.medium || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      description: defaultValues?.description || [],
    },
  })

  const onSubmit = (value: z.infer<typeof writingExperienceFormSchema>) => {
    const writing: Writing = {
      ...value,
      endDate: value.endDate || '',
      id: `${value.title} - ${value.role}`,
      description: value.description.map((d) => {
        return {
          id: d.value,
          value: d.value,
        } as StringWithId
      }),
    }
    if (defaultValues) {
      setResumeField('writings', {
        ...writings,
        content: writings.content.map((w) =>
          w.id === defaultValues.id ? writing : w,
        ),
      })
    } else {
      setResumeField('writings', {
        ...writings,
        content: [...writings.content, writing],
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
            className="flex flex-1 flex-col h-full"
          >
            <ScrollArea className="flex-1">
              <div className="grid gap-4 py-4 px-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('title')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('role')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('medium')}</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('description')}</span>
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
                              {t('no-writings-added', {
                                label: writings.label.toLowerCase(),
                              })}
                            </p>
                          )}
                          <WritingHighlightDragList
                            items={field.value}
                            getItemData={getWritingHighlightData}
                            isItemData={isWritingHighlightData}
                            setItems={field.onChange}
                            itemType="Description"
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
