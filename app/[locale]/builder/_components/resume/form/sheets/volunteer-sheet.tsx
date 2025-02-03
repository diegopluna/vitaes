'use client'

import { Highlight, Volunteer } from '@/@types/resume'
import { z } from 'zod'
import { ItemData } from '../dnd/drag'
import { useState } from 'react'
import { useResume } from '@/providers/resume-provider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { Button } from '@/components/ui/button'
import { IconPencil, IconPlus } from '@tabler/icons-react'
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
import { Textarea } from '@/components/ui/textarea'
import { HighlightDragList } from '../dnd/highlight-list'

const volunteerExperienceFormSchema = z.object({
  organization: z.string().min(1, 'Organization is required'),
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

const volunteerHighlightKey = Symbol('volunteer-highlight')

function getVolunteerHighlightData(highlight: Highlight): ItemData<Highlight> {
  return {
    [volunteerHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isVolunteerHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Highlight> {
  return data[volunteerHighlightKey] === true
}

const VolunteerHighlightDragList = HighlightDragList<Highlight>

export const VolunteerSheet = ({
  defaultValues,
}: {
  defaultValues?: Volunteer
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setVolunteer } = useResume()

  const volunteers = resume.volunteer

  const form = useForm<z.infer<typeof volunteerExperienceFormSchema>>({
    resolver: zodResolver(volunteerExperienceFormSchema),
    defaultValues: {
      organization: defaultValues?.organization || '',
      position: defaultValues?.position || '',
      url: defaultValues?.url || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      summary: defaultValues?.summary || '',
      highlights: defaultValues?.highlights || [],
    },
  })

  function onSubmit(values: z.infer<typeof volunteerExperienceFormSchema>) {
    const volunteer: Volunteer = {
      ...values,
      url: values.url || '',
      summary: values.summary || '',
      endDate: values.endDate || '',
      id: `${values.organization} - ${values.position}`,
      highlights: values.highlights.map((highlight) => ({
        id: highlight.id,
        text: highlight.text,
      })),
    }

    if (defaultValues) {
      setVolunteer(
        volunteers.map((v) =>
          v === defaultValues ? { ...v, ...volunteer } : v,
        ),
      )
    } else {
      setVolunteer([...volunteers, volunteer])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={
            defaultValues
              ? 'Edit volunteer experience'
              : 'Add volunteer experience'
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
            {defaultValues
              ? 'Edit Volunteer Experience'
              : 'Add Volunteer Experience'}
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
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between">
                          <span>Highlights</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => {
                              form.setValue('highlights', [
                                ...field.value,
                                {
                                  id: Math.random().toString(),
                                  text: '',
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
                              No volunteer highlights added
                            </p>
                          )}
                          <VolunteerHighlightDragList
                            items={field.value}
                            getItemData={getVolunteerHighlightData}
                            isItemData={isVolunteerHighlightData}
                            setItems={field.onChange}
                            itemType="Highlight"
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter(
                                  (highlight) => highlight.id !== id,
                                ),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((highlight) =>
                                  highlight.id === id
                                    ? { ...highlight, text }
                                    : highlight,
                                ),
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
              Save Volunteer Experience
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
