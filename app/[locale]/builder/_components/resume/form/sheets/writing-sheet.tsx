'use client'

import { StringWithId, Writing } from '@/@types/resume'
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
import { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useAppForm } from '@/components/ui/ts-form'
import { useTranslations } from 'next-intl'

const writingExperienceFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  role: z.string().min(1, 'Role is required'),
  medium: z.string().min(1, 'Medium is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  description: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
})

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

export const WritingSheet = ({
  defaultValues,
}: {
  defaultValues?: Writing
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('WritingSheet')

  const writings = resume.writings

  const form = useAppForm({
    validators: {
      onChange: writingExperienceFormSchema,
    },
    defaultValues: {
      title: defaultValues?.title || '',
      role: defaultValues?.role || '',
      medium: defaultValues?.medium || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      description: defaultValues?.description || [],
    },
    onSubmit: ({ value }) => {
      const writing: Writing = {
        ...value,
        endDate: value.endDate || '',
        id: `${value.title} - ${value.role}`,
        description: value.description.map(d => {
          return {
            id: d.value,
            value: d.value,
          } as StringWithId
        }),
      }
      if (defaultValues) {
        setResumeField('writings', {
          ...writings,
          content: writings.content.map(w =>
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
              ? t('edit', { label: writings.label })
              : t('add', { label: writings.label })
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
              ? t('edit', { label: writings.label })
              : t('add', { label: writings.label })}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
                <form.AppField
                  name="title"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('title')}</field.FormLabel>
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
                  name="role"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('role')}</field.FormLabel>
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
                  name="medium"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('medium')}</field.FormLabel>
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
                  name="startDate"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('startDate')}</field.FormLabel>
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
                  name="endDate"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('endDate')}</field.FormLabel>
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
                  name="description"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('description')}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={e => {
                              e.preventDefault()
                              field.handleChange([
                                ...field.state.value,
                                { id: `${Date.now()}`, value: '' },
                              ])
                            }}
                          >
                            <IconPlus size={14} />
                          </Button>
                        </div>
                      </field.FormLabel>
                      <field.FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.state.value.length === 0 && (
                            <p className="text-center text-sm">
                              {t('noneAdded', {
                                label: writings.label.toLowerCase(),
                              })}
                            </p>
                          )}
                          <WritingHighlightDragList
                            items={field.state.value}
                            getItemData={getWritingHighlightData}
                            isItemData={isWritingHighlightData}
                            setItems={field.handleChange}
                            itemType="Description"
                            onDelete={id => {
                              field.handleChange(
                                field.state.value.filter(h => h.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.handleChange(
                                field.state.value.map(h => {
                                  if (h.id === id) {
                                    return { ...h, text }
                                  }
                                  return h
                                }),
                              )
                            }}
                          />
                        </div>
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              {t('save', { label: writings.label })}
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
