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
import type { Education, StringWithId } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const educationHighlightKey = Symbol('education-highlight')

function getEducationHighlightData(
  highlight: StringWithId,
): ItemData<StringWithId> {
  return {
    [educationHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isEducationHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[educationHighlightKey] === true
}

const EducationHighlightDragList = HighlightDragList<StringWithId>

export function EducationSheet({
  defaultValues,
}: {
  defaultValues?: Education
}) {
  const t = useTranslations('education-sheet')

  const educationExperienceFormSchema = z.object({
    school: z.string().min(1, t('school-required')),
    location: z.string().min(1, t('location-required')),
    degree: z.string().min(1, t('degree-required')),
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

  const form = useForm({
    resolver: zodResolver(educationExperienceFormSchema),
    defaultValues: {
      school: defaultValues?.school || '',
      location: defaultValues?.location || '',
      degree: defaultValues?.degree || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      description: defaultValues?.description || [],
    },
  })

  const onSubmit = (value: z.infer<typeof educationExperienceFormSchema>) => {
    const education: Education = {
      ...value,
      endDate: value.endDate || '',
      id: `${value.school} - ${value.degree}`,
      description: value.description.map((d) => {
        return {
          id: d.value,
          value: d.value,
        } as StringWithId
      }),
    }
    if (defaultValues) {
      setResumeField('education', {
        ...resume.education,
        content: resume.education.content.map((w) => {
          if (w.id === defaultValues.id) {
            return education
          }
          return w
        }),
      })
    } else {
      setResumeField('education', {
        ...resume.education,
        content: [...resume.education.content, education],
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
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('school')}</FormLabel>
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
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('degree')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
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
                </div>
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
                              {t('no-education-highlight-added', {
                                label: resume.education.label,
                              })}
                            </p>
                          )}
                          <EducationHighlightDragList
                            items={field.value}
                            getItemData={getEducationHighlightData}
                            isItemData={isEducationHighlightData}
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
