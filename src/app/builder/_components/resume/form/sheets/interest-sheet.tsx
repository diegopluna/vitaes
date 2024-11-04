'use client'

import { Interest } from '@/@types/resume'
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

const interestFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  keywords: z.array(z.string().min(1, 'Keyword is required')),
})

// TODO: Add keywords
export const InterestSheet = ({
  defaultValues,
}: {
  defaultValues?: Interest
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setInterests } = useResumeStore((state) => state)

  const interests = resume.interests

  const form = useForm<z.infer<typeof interestFormSchema>>({
    resolver: zodResolver(interestFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      keywords: defaultValues?.keywords || [],
    },
  })

  function onSubmit(values: z.infer<typeof interestFormSchema>) {
    const interest: Interest = {
      id: values.name,
      ...values,
    }

    if (defaultValues) {
      setInterests(interests.map((i) => (i.id === interest.id ? interest : i)))
    } else {
      setInterests([...interests, interest])
    }

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Interest' : 'Add Interest'}
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
            {defaultValues ? 'Edit Interest' : 'Add Interest'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
            </div>
            <Button type="submit">Save Interest</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
