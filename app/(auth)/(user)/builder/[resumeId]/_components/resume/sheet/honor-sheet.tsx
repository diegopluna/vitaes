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
import type { Honor, HonorsPerLabel } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { HonorTypeSheet } from './honor-type-sheet'

// TODO: i18n this
const honorsFormSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  honors: z.array(
    z.object({
      id: z.string(),
      year: z.string(),
      position: z.string(),
      honor: z.string(),
      location: z.string(),
    }),
  ),
})

const honorTypeKey = Symbol('honor-type')

function getHonorsTypeData(honor: Honor, parentId: string): ItemData<Honor> {
  return {
    [honorTypeKey]: true,
    itemId: honor.id,
    parentId,
  }
}

function isHonorsTypeData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Honor> {
  return data[honorTypeKey] === true
}

const HonorsTypeDragList = DragList<Honor>

export function HonorSheet({
  defaultValues,
}: {
  defaultValues?: HonorsPerLabel
}) {
  const t = useTranslations('honor-sheet')
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const honors = resume.honors

  const form = useForm({
    resolver: zodResolver(honorsFormSchema),
    defaultValues: {
      id: defaultValues?.id || `${Date.now()}`,
      label: defaultValues?.label || '',
      honors: defaultValues?.honors || [],
    },
  })

  const onSubmit = (value: z.infer<typeof honorsFormSchema>) => {
    const honor: HonorsPerLabel = {
      ...value,
      id: `${value.label}`,
      honors: value.honors.map((h) => {
        return {
          id: `${h.honor} - ${h.year}`,
          honor: h.honor,
          location: h.location,
          position: h.position,
          year: h.year,
        } as Honor
      }),
    }
    if (defaultValues) {
      setResumeField('honors', {
        ...honors,
        content: honors.content.map((h) =>
          h.id === defaultValues.id ? honor : h,
        ),
      })
    } else {
      setResumeField('honors', {
        ...honors,
        content: [...honors.content, honor],
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
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('label')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="honors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('honors')}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              field.onChange([
                                ...field.value,
                                {
                                  id: `${Date.now()} - ${Math.random()}`,
                                  year: '',
                                  position: '',
                                  honor: '',
                                  location: '',
                                },
                              ])
                            }}
                          >
                            <IconPlus className="size-4" />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center text-sm">
                              {t('no-honors-added', {
                                label: honors.label.toLowerCase(),
                              })}
                            </p>
                          )}
                          <HonorsTypeDragList
                            items={field.value}
                            getItemData={(item) =>
                              getHonorsTypeData(item, form.getValues('id'))
                            }
                            isItemData={isHonorsTypeData}
                            setItems={field.onChange}
                            itemType="Honor"
                            EditSheet={({ defaultValues }) => (
                              <HonorTypeSheet
                                defaultValues={defaultValues}
                                honorTypeId={form.getValues('id')}
                                onUpdate={(honor) => {
                                  if (defaultValues) {
                                    // Update existing honor
                                    const updatedHonors = field.value.map(
                                      (h) =>
                                        h.id === defaultValues.id ? honor : h,
                                    )
                                    field.onChange(updatedHonors)
                                  } else {
                                    // Add new honor
                                    field.onChange([...field.value, honor])
                                  }
                                }}
                              />
                            )}
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((h) => h.id !== id),
                              )
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
