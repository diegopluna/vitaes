'use client'

import { Education, Highlight } from '@/@types/resume'
import { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'
import { z } from 'zod'
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

const educationFormSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  url: z.string().optional(),
  area: z.string().min(1, 'Area of study is required'),
  studyType: z.string().min(1, 'Study type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const coursesKey = Symbol('courses')

function getCoursesData(course: Highlight): ItemData<Highlight> {
  return {
    [coursesKey]: true,
    itemId: course.id,
  }
}

function isCourseData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Highlight> {
  return data[coursesKey] === true
}

const CourseDragList = HighlightDragList<Highlight>

export const EducationSheet = ({
  defaultValues,
}: {
  defaultValues?: Education
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setEducation } = useResume()

  const educations = resume.education

  const form = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institution: defaultValues?.institution || '',
      url: defaultValues?.url || '',
      area: defaultValues?.area || '',
      studyType: defaultValues?.studyType || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
      score: defaultValues?.score || '',
      courses: defaultValues?.courses || [],
    },
  })

  function onSubmit(values: z.infer<typeof educationFormSchema>) {
    const education: Education = {
      ...values,
      url: values.url || '',
      score: values.score || '',
      endDate: values.endDate || '',
      id: `${values.institution} - ${values.area}`,
      courses: values.courses.map((course) => {
        return {
          id: course.text,
          text: course.text,
        }
      }),
    }

    if (defaultValues) {
      setEducation(
        educations.map((e) => (e.id === defaultValues.id ? education : e)),
      )
    } else {
      setEducation([...educations, education])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit education' : 'Add education'}
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
            {defaultValues ? 'Edit Education' : 'Add Education'}
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
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
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
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area of Study</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Study Type</FormLabel>
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
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between">
                          <span>Courses</span>
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
                            <IconPlus className="size-4" />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center">No courses added</p>
                          )}
                          <CourseDragList
                            items={field.value}
                            getItemData={getCoursesData}
                            isItemData={isCourseData}
                            setItems={field.onChange}
                            itemType="Course"
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((c) => c.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((c) => {
                                  if (c.id === id) {
                                    return { ...c, text }
                                  }
                                  return c
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
              Save Education
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
