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
import type { Presentation, StringWithId } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const presentationDescriptionKey = Symbol('presentation-description')

function getPresentationDescriptionData(
  description: StringWithId,
): ItemData<{ id: string; value: string }> {
  return {
    [presentationDescriptionKey]: true,
    itemId: description.id,
  }
}

function isPresentationDescriptionData(
  data: Record<string | symbol, unknown>,
): data is ItemData<{ id: string; value: string }> {
  return data[presentationDescriptionKey] === true
}

const PresentationDescriptionDragList = HighlightDragList<StringWithId>

export function PresentationSheet({
  defaultValues,
}: {
  defaultValues?: Presentation
}) {
  const t = useTranslations('presentation-sheet')
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const presentations = resume.presentations

  const presentationFormSchema = z.object({
    event: z.string().min(1, t('event-required')),
    role: z.string().min(1, t('role-required')),
    location: z.string().min(1, t('location-required')),
    date: z.string().min(1, t('date-required')),
    description: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
  })

  const form = useForm({
    resolver: zodResolver(presentationFormSchema),
    defaultValues: {
      event: defaultValues?.event || '',
      role: defaultValues?.role || '',
      location: defaultValues?.location || '',
      date: defaultValues?.date || '',
      description: defaultValues?.description || [],
    },
  })

  const onSubmit = (value: z.infer<typeof presentationFormSchema>) => {
    const presentation: Presentation = {
      ...value,
      id: `${value.role} - ${value.event}`,
      description: value.description.map((d) => {
        return {
          id: d.id,
          value: d.value,
        } as StringWithId
      }),
    }

    if (defaultValues) {
      setResumeField('presentations', {
        ...presentations,
        content: presentations.content.map((p) =>
          p.id === defaultValues.id ? presentation : p,
        ),
      })
    } else {
      setResumeField('presentations', {
        ...presentations,
        content: [...presentations.content, presentation],
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
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('event')}</FormLabel>
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('date')}</FormLabel>
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
                              {t('no-presentations-added', {
                                label: presentations.label.toLowerCase(),
                              })}
                            </p>
                          )}
                          <PresentationDescriptionDragList
                            items={field.value}
                            getItemData={getPresentationDescriptionData}
                            isItemData={isPresentationDescriptionData}
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
