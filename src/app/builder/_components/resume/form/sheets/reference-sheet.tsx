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
import { useResumeStore } from '@/providers/resume-store-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, PlusCircle } from 'lucide-react'
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
  const { resume, setReferences } = useResumeStore((state) => state)

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
      id: `${values.name} - ${values.reference}`,
      name: values.name,
      reference: values.reference,
    }

    if (defaultValues) {
      const updatedReferences = references.map((r) =>
        r === defaultValues ? reference : r,
      )
      setReferences(updatedReferences)
    } else {
      setReferences([...references, reference])
    }

    form.reset()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Reference' : 'Add Reference'}
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
            {defaultValues ? 'Edit Reference' : 'Add Reference'}
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
            </div>
            <Button type="submit">Save Reference</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
