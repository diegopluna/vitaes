'use client'

import { Highlight, Work } from '@/@types/resume'
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
import { Textarea } from '@/components/ui/textarea'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResume } from '@/providers/resume-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const workExperienceFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  url: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const workHighlightKey = Symbol('work-highlight')

function getWorkHighlightData(highlight: Highlight): ItemData<Highlight> {
  return {
    [workHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isWorkHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Highlight> {
  return data[workHighlightKey] === true
}

const WorkHighlightDragList = HighlightDragList<Highlight>

export const WorkSheet = ({ defaultValues }: { defaultValues?: Work }) => {
  const [open, setOpen] = useState(false)
  const { resume, setWork } = useResume()

  const works = resume.work

  const form = useForm<z.infer<typeof workExperienceFormSchema>>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      position: defaultValues?.position || '',
      url: defaultValues?.url || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      summary: defaultValues?.summary || '',
      highlights: defaultValues?.highlights || [],
    },
  })

  function onSubmit(values: z.infer<typeof workExperienceFormSchema>) {
    const work: Work = {
      ...values,
      url: values.url || '',
      summary: values.summary || '',
      endDate: values.endDate || '',
      id: `${values.name} - ${values.position}`,
      highlights: values.highlights.map((highlight) => {
        return {
          id: highlight.text,
          text: highlight.text,
        }
      }),
    }
    if (defaultValues) {
      setWork(works.map((w) => (w.id === defaultValues.id ? work : w)))
    } else {
      setWork([...works, work])
    }
    setOpen(false)
    form.reset()
  }

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
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            {defaultValues ? 'Edit Work Experience' : 'Add Work Experience'}
          </SheetTitle>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
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
                      <FormLabel>Start Date</FormLabel>
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
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="highlights"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center justify-between">
                            <span>Highlights</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8"
                              onClick={(e) => {
                                e.preventDefault()
                                field.onChange([
                                  ...field.value,
                                  { id: `${Date.now()}`, text: '' },
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
                                No work highlight added
                              </p>
                            )}
                            <WorkHighlightDragList
                              items={field.value}
                              getItemData={getWorkHighlightData}
                              isItemData={isWorkHighlightData}
                              setItems={field.onChange}
                              itemType="Highlight"
                              onDelete={(id) => {
                                field.onChange(
                                  field.value.filter((h) => h.id !== id),
                                )
                              }}
                              onChangeText={(id, text) => {
                                field.onChange(
                                  field.value.map((h) => {
                                    if (h.id === id) {
                                      return { ...h, text }
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
                    )
                  }}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              Save Work Experience
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
