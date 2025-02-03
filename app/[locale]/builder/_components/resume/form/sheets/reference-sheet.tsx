'use client'

import { Reference } from '@/@types/resume'
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
import { useResume } from '@/providers/resume-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const referenceFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  reference: z.string().min(1, 'Reference is required'),
})

export const ReferenceSheet = ({
  defaultValues,
}: {
  defaultValues?: Reference
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setReferences } = useResume()

  const references = resume.references

  const form = useForm<z.infer<typeof referenceFormSchema>>({
    resolver: zodResolver(referenceFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      reference: defaultValues?.reference || '',
    },
  })

  function onSubmit(values: z.infer<typeof referenceFormSchema>) {
    const reference: Reference = {
      ...values,
      id: values.name,
    }

    if (defaultValues) {
      setReferences(
        references.map((r) => (r.id === defaultValues.id ? reference : r)),
      )
    } else {
      setReferences([...references, reference])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Reference' : 'Add Reference'}
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
            {defaultValues ? 'Edit Reference' : 'Add Reference'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Reference</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
