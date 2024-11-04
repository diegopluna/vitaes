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
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useResumeStore } from '@/providers/resume-store-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const publicationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  releaseDate: z.string().min(1, 'Date is required'),
  url: z.string().url(),
  summary: z.string().min(1, 'Summary is required'),
})

export const PublicationSheet = ({
  defaultValues,
}: {
  defaultValues?: Publication
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setPublications } = useResumeStore((state) => state)

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
      id: `${values.name} - ${values.publisher}`,
      ...values,
    }

    if (defaultValues) {
      setPublications(
        publications.map((p) => (p.id === publication.id ? publication : p)),
      )
    } else {
      setPublications([...publications, publication])
    }

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Publication' : 'Add Publication'}
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
            {defaultValues ? 'Edit Publication' : 'Add Publication'}
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Publication</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
