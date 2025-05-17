'use client'

import type { Honor } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useAppForm } from '@/components/ui/ts-form'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslations } from 'next-intl'

const honorTypeSchema = z.object({
  id: z.string(),
  year: z.string(),
  position: z.string(),
  honor: z.string(),
  location: z.string(),
})

export const HonorTypeSheet = ({
  defaultValues,
  onUpdate,
}: {
  honorTypeId: string
  defaultValues?: Honor
  onUpdate: (honor: Honor) => void
}) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations('HonorTypeSheet')

  const form = useAppForm({
    validators: {
      onChange: honorTypeSchema,
    },
    defaultValues: {
      id: defaultValues?.id || `${Date.now()}`,
      year: defaultValues?.year || '',
      position: defaultValues?.position || '',
      honor: defaultValues?.honor || '',
      location: defaultValues?.location || '',
    },
    onSubmit: ({ value }) => {
      const honor: Honor = {
        ...value,
        id: `${value.honor} - ${value.year}`,
      }

      onUpdate(honor)
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
          tooltip={defaultValues ? t('editTooltip') : t('addTooltip')}
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
            {defaultValues ? t('editTitle') : t('addTitle')}
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
                      <field.FormLabel>{t('year')}</field.FormLabel>
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
                      <field.FormLabel>{t('position')}</field.FormLabel>
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
                  name="honor"
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{t('honor')}</field.FormLabel>
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
                      <field.FormLabel>{t('location')}</field.FormLabel>
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
            <SheetFooter className="mt-auto">
              <Button type="submit">
                {defaultValues ? t('updateButton') : t('addButton')}
              </Button>
            </SheetFooter>
          </form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  )
}
