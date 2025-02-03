'use client'

import { Award } from '@/@types/resume'
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
import { Textarea } from '@/components/ui/textarea'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResume } from '@/providers/resume-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  awarder: z.string().min(1, 'Awarder is required'),
  summary: z.string().optional(),
})

export const AwardsSheet = ({ defaultValues }: { defaultValues?: Award }) => {
  const [open, setOpen] = useState(false)
  const { resume, setAwards } = useResume()

  const awards = resume.awards

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      date: defaultValues?.date || '',
      awarder: defaultValues?.awarder || '',
      summary: defaultValues?.summary || '',
    },
  })

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const award: Award = {
      ...values,
      summary: values.summary || '',
      id: `${values.title}-${values.date}`,
    }

    if (defaultValues) {
      setAwards(awards.map((a) => (a.id === defaultValues.id ? award : a)))
    } else {
      setAwards([...awards, award])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? 'Edit award' : 'Add award'}>
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
          <SheetTitle>{defaultValues ? 'Edit Award' : 'Add Award'}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="awarder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Awarder</FormLabel>
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
            <Button type="submit">Save Award</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
