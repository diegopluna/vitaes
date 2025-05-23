'use client'

import { StringWithId, Certificate } from '@/@types/resume'
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

const certificateExperienceFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
})

const certificateHighlightKey = Symbol('certificate-highlight')

function getCertificateHighlightData(
  highlight: StringWithId,
): ItemData<StringWithId> {
  return {
    [certificateHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isCertificateHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[certificateHighlightKey] === true
}

const CertificateHighlightDragList = HighlightDragList<StringWithId>

export const CertificateSheet = ({
  defaultValues,
}: {
  defaultValues?: Certificate
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('CertificateSheet')

  const certificates = resume.certificates

  const form = useAppForm({
    validators: {
      onChange: certificateExperienceFormSchema,
    },
    defaultValues: {
      title: defaultValues?.title || '',
      issuer: defaultValues?.issuer || '',
      date: defaultValues?.date || '',
      description: defaultValues?.description || [],
    },
    onSubmit: ({ value }) => {
      const certificate: Certificate = {
        ...value,
        id: `${value.title}`,
        description: value.description.map(d => {
          return {
            id: d.value,
            value: d.value,
          } as StringWithId
        }),
      }
      if (defaultValues) {
        setResumeField('certificates', {
          ...certificates,
          content: certificates.content.map(w => {
            if (w.id === defaultValues.id) {
              return certificate
            }
            return w
          }),
        })
      } else {
        setResumeField('certificates', {
          ...certificates,
          content: [...certificates.content, certificate],
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
              ? t('edit', { label: certificates.label })
              : t('add', { label: certificates.label })
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
              ? t('edit', { label: certificates.label })
              : t('add', { label: certificates.label })}
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
                  name="issuer"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('issuer')}</field.FormLabel>
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
                  name="date"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('date')}</field.FormLabel>
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
                              {t('noDescription')}
                            </p>
                          )}
                          <CertificateHighlightDragList
                            items={field.state.value}
                            getItemData={getCertificateHighlightData}
                            isItemData={isCertificateHighlightData}
                            setItems={field.handleChange}
                            itemType={'Description'}
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
              {t('save', { label: certificates.label })}
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
