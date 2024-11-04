'use client'

import { Skill } from '@/@types/resume'
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

const skillFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.string().min(1, 'Level is required'),
  keywords: z.array(z.string().min(1, 'Keyword is required')),
})

// TODO: Add keywords
export const SkillSheet = ({ defaultValues }: { defaultValues?: Skill }) => {
  const [open, setOpen] = useState(false)
  const { resume, setSkills } = useResumeStore((state) => state)

  const skills = resume.skills

  const form = useForm<z.infer<typeof skillFormSchema>>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      level: defaultValues?.level || '',
      keywords: defaultValues?.keywords || [],
    },
  })

  function onSubmit(values: z.infer<typeof skillFormSchema>) {
    const skill: Skill = {
      id: values.name,
      ...values,
    }

    if (defaultValues) {
      setSkills(skills.map((s) => (s.id === skill.id ? skill : s)))
    } else {
      setSkills([...skills, skill])
    }

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? 'Edit Skill' : 'Add Skill'}>
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
          <SheetTitle>{defaultValues ? 'Edit Skill' : 'Add Skill'}</SheetTitle>
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Skill</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
