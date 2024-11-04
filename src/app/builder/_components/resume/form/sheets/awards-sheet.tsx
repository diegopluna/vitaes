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
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResumeStore } from '@/providers/resume-store-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const awardFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  awarder: z.string().min(1, 'Awarder is required'),
  summary: z.string().min(1, 'Summary is required'),
})

export const AwardSheet = ({ defaultValues }: { defaultValues?: Award }) => {
  const [open, setOpen] = useState(false)
  const { resume, setAwards } = useResumeStore((state) => state)

  const awards = resume.awards

  const form = useForm<z.infer<typeof awardFormSchema>>({
    resolver: zodResolver(awardFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      date: defaultValues?.date || '',
      awarder: defaultValues?.awarder || '',
      summary: defaultValues?.summary || '',
    },
  })

  function onSubmit(values: z.infer<typeof awardFormSchema>) {
    const award: Award = {
      id: `${values.title} - ${values.awarder}`,
      ...values,
    }

    if (defaultValues) {
      setAwards(awards.map((a) => (a.id === defaultValues.id ? award : a)))
    } else {
      setAwards([...awards, award])
    }

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? 'Edit Award' : 'Add Award'}>
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
          <SheetTitle>{defaultValues ? 'Edit Award' : 'Add Award'}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Award</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
