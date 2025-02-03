'use client'

import { Highlight, Project } from '@/@types/resume'
import { set, z } from 'zod'
import { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const projectFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const projectHighlightKey = Symbol('project-highlight')

function getProjectHighlightData(highlight: Highlight): ItemData<Highlight> {
  return {
    [projectHighlightKey]: true,
    itemId: highlight.id,
  }
}

function isProjectHighlightData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Highlight> {
  return data[projectHighlightKey] === true
}

const ProjectHighlightDragList = HighlightDragList<Highlight>

export const ProjectSheet = ({
  defaultValues,
}: {
  defaultValues?: Project
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setProjects } = useResume()

  const projects = resume.projects

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      url: defaultValues?.url || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      description: defaultValues?.description || '',
      highlights: defaultValues?.highlights || [],
    },
  })

  function onSubmit(values: z.infer<typeof projectFormSchema>) {
    const project: Project = {
      ...values,
      url: values.url || '',
      endDate: values.endDate || '',
      description: values.description || '',
      id: `${values.name}`,
      highlights: values.highlights.map((highlight) => {
        return {
          id: highlight.text,
          text: highlight.text,
        }
      }),
    }
    if (defaultValues) {
      setProjects(
        projects.map((w) => (w.id === defaultValues.id ? project : w)),
      )
    } else {
      setProjects([...projects, project])
    }
    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Project' : 'Add Project'}
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
            {defaultValues ? 'Edit Project' : 'Add Project'}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                                No project highlight added
                              </p>
                            )}
                            <ProjectHighlightDragList
                              items={field.value}
                              getItemData={getProjectHighlightData}
                              isItemData={isProjectHighlightData}
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
            <Button type="submit" className="mt-4">
              Save Project
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
