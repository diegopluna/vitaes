'use client'

import { StringWithId, Work } from '@/@types/resume'
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

const workExperienceFormSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  highlights: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
})

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

export const WorkSheet = ({ defaultValues }: { defaultValues?: Work }) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)

  const works = resume.work

  const form = useAppForm({
    validators: {
      onChange: workExperienceFormSchema,
    },
    defaultValues: {
      company: defaultValues?.company || '',
      location: defaultValues?.location || '',
      position: defaultValues?.position || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      highlights: defaultValues?.highlights || [],
    },
    onSubmit: ({ value }) => {
      const work: Work = {
        ...value,
        endDate: value.endDate || '',
        id: `${value.company} - ${value.position}`,
        highlights: value.highlights.map(highlight => {
          return {
            id: highlight.value,
            value: highlight.value,
          } as StringWithId
        }),
      }
      if (defaultValues) {
        setResumeField(
          'work',
          works.map(w => (w.id === defaultValues.id ? work : w)),
        )
      } else {
        setResumeField('work', [...works, work])
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
            defaultValues ? 'Edit Work Experience' : 'Add Work Experience'
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
            {defaultValues ? 'Edit Work Experience' : 'Add Work Experience'}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
                <form.AppField
                  name="company"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Name</field.FormLabel>
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
                      <field.FormLabel>Location</field.FormLabel>
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
                  name="position"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Position</field.FormLabel>
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
                      <field.FormLabel>Start Date</field.FormLabel>
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
                      <field.FormLabel>End Date</field.FormLabel>
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
                  name="highlights"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>Highlights</span>
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
                              No work highlight added
                            </p>
                          )}
                          <WorkHighlightDragList
                            items={field.state.value}
                            getItemData={getWorkHighlightData}
                            isItemData={isWorkHighlightData}
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
              Save Work Experience
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
