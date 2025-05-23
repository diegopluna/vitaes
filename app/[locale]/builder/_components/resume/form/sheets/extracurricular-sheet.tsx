'use client'

import { StringWithId, Extracurricular } from '@/@types/resume'
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

const extracurricularExperienceFormSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  organization: z.string().min(1, 'Organization is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  description: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
})

const extracurricularHighlightKey = Symbol('extracurricular-highlight')

function getExtracurricularHighlightData(
  highlight: StringWithId,
): ItemData<StringWithId> {
  return {
    [extracurricularHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isExtracurricularHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[extracurricularHighlightKey] === true
}

const ExtracurricularHighlightDragList = HighlightDragList<StringWithId>

export const ExtracurricularSheet = ({
  defaultValues,
}: {
  defaultValues?: Extracurricular
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('ExtracurricularSheet')

  const extracurriculars = resume.extracurriculars

  const form = useAppForm({
    validators: {
      onChange: extracurricularExperienceFormSchema,
    },
    defaultValues: {
      role: defaultValues?.role || '',
      organization: defaultValues?.organization || '',
      location: defaultValues?.location || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      description: defaultValues?.description || [],
    },
    onSubmit: ({ value }) => {
      const extracurricular: Extracurricular = {
        ...value,
        endDate: value.endDate || '',
        id: `${value.role} - ${value.organization}`,
        description: value.description.map(d => {
          return {
            id: d.value,
            value: d.value,
          } as StringWithId
        }),
      }
      if (defaultValues) {
        setResumeField('extracurriculars', {
          ...extracurriculars,
          content: extracurriculars.content.map(w =>
            w.id === defaultValues.id ? extracurricular : w,
          ),
        })
      } else {
        setResumeField('extracurriculars', {
          ...extracurriculars,
          content: extracurriculars.content.filter(
            w => w.id !== extracurricular.id,
          ),
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
              ? t('edit', { label: extracurriculars.label })
              : t('add', { label: extracurriculars.label })
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
              ? t('edit', { label: extracurriculars.label })
              : t('add', { label: extracurriculars.label })}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
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
                                label: extracurriculars.label.toLowerCase(),
                              })}
                            </p>
                          )}
                          <ExtracurricularHighlightDragList
                            items={field.state.value}
                            getItemData={getExtracurricularHighlightData}
                            isItemData={isExtracurricularHighlightData}
                            setItems={field.handleChange}
                            itemType="Highlight"
                            onDelete={id => {
                              field.handleChange(
                                field.state.value.filter(h => h.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.handleChange(
                                field.state.value.map(h => {
                                  if (h.id === id) {
                                    return { ...h, value: text }
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
              {t('save', { label: extracurriculars.label })}
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
