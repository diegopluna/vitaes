'use client'

import { Volunteer } from '@/@types/resume'
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResumeStore } from '@/providers/resume-store-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const volunteerExperienceFormSchema = z.object({
  organization: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  url: z.string().url(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  summary: z.string().min(1, 'Summary is required'),
  highlights: z.array(z.string().min(1, 'Highlight is required')),
})

// TODO: Add highlights
export const VolunteerSheet = ({
  defaultValues,
}: {
  defaultValues?: Volunteer
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setVolunteer } = useResumeStore((state) => state)

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
      id: `${values.organization} - ${values.position}`,
    }
    if (defaultValues) {
      setVolunteer(
        volunteers.map((v) => (v.id === volunteer.id ? volunteer : v)),
      )
    } else {
      setVolunteer([...volunteers, volunteer])
    }
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={
            defaultValues
              ? 'Edit Volunteer Experience'
              : 'Add Volunteer Experience'
          }
        >
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            {defaultValues ? (
              <Pencil className="size-4" />
            ) : (
              <PlusCircle className="size-4" />
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Volunteer Experience</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
