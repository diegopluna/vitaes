'use client'

import { Comittee } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useAppForm } from '@/components/ui/ts-form'

const comitteeExperienceFormSchema = z.object({
  year: z.string().min(1, 'Year is required'),
  position: z.string().min(1, 'Position is required'),
  organization: z.string().min(1, 'Organization is required'),
  location: z.string().min(1, 'Location is required'),
})

export const ComitteeSheet = ({
  defaultValues,
}: {
  defaultValues?: Comittee
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore(s => s)

  const comittees = resume.comittees

  const form = useAppForm({
    validators: {
      onChange: comitteeExperienceFormSchema,
    },
    defaultValues: {
      year: defaultValues?.year || '',
      position: defaultValues?.position || '',
      organization: defaultValues?.organization || '',
      location: defaultValues?.location || '',
    },
    onSubmit: ({ value }) => {
      const comittee: Comittee = {
        ...value,
        id: `${value.position} - ${value.organization}`,
      }
      if (defaultValues) {
        setResumeField(
          'comittees',
          comittees.map(w => (w.id === defaultValues.id ? comittee : w)),
        )
      } else {
        setResumeField('comittees', [...comittees, comittee])
      }
      setOpen(false)
      form.reset()
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    },
    [form],
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Comittee' : 'Add Comittee'}
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
      <SheetContent side="left" className="p-4">
        <SheetHeader>
          <SheetTitle>
            {defaultValues ? 'Edit Comittee' : 'Add Comittee'}
          </SheetTitle>
        </SheetHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
                <form.AppField
                  name="year"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Year</field.FormLabel>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="position"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Position</field.FormLabel>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="organization"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Organization</field.FormLabel>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="location"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>Location</field.FormLabel>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              Save Comittee
            </Button>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
