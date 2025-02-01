'use client'

import { Work } from '@/@types/resume'
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

const workExperienceFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  url: z.string().url('URL is invalid'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  summary: z.string().min(1, 'Summary is required'),
  highlights: z.array(z.string()).min(1, 'Highlights is required'),
})

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
      id: `${values.name} - ${values.position}`,
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <FormLabel>Highlights</FormLabel>
                        <FormControl>
                          {}
                          {field.value.map((highlight) => (
                            <></>
                          ))}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </ScrollArea>
            <Button type="submit">Save Work Experience</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
