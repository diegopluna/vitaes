'use client'

import { Publication } from '@/@types/resume'
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

const publicationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  releaseDate: z.string().min(1, 'Release date is required'),
  url: z.string().optional(),
  summary: z.string().optional(),
})

export const PublicationsSheet = ({
  defaultValues,
}: {
  defaultValues?: Publication
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setPublications } = useResume()

  const publications = resume.publications

  const form = useForm<z.infer<typeof publicationFormSchema>>({
    resolver: zodResolver(publicationFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      publisher: defaultValues?.publisher || '',
      releaseDate: defaultValues?.releaseDate || '',
      url: defaultValues?.url || '',
      summary: defaultValues?.summary || '',
    },
  })

  function onSubmit(values: z.infer<typeof publicationFormSchema>) {
    const publication: Publication = {
      ...values,
      url: values.url || '',
      summary: values.summary || '',
      id: `${values.name}-${values.publisher}`,
    }

    if (defaultValues) {
      setPublications(
        publications.map((p) => (p.id === defaultValues.id ? publication : p)),
      )
    } else {
      setPublications([...publications, publication])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit publication' : 'Add publication'}
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
            {defaultValues ? 'Edit publication' : 'Add publication'}
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
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Date</FormLabel>
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
            <Button type="submit">Save publication</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
