'use client'

import { Highlight, Skill } from '@/@types/resume'
import { z } from 'zod'
import { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'
import { useState } from 'react'
import { useResume } from '@/providers/resume-provider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { Button } from '@/components/ui/button'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

const skillFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.string().min(1, 'Level is required'),
  keywords: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const keywordKey = Symbol('keyword')

function getKeywordData(keyword: Highlight): ItemData<Highlight> {
  return {
    [keywordKey]: true,
    itemId: keyword.id,
  }
}

function isKeywordData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Highlight> {
  return data[keywordKey] === true
}

const KeywordDragList = HighlightDragList<Highlight>

export const SkillsSheet = ({ defaultValues }: { defaultValues?: Skill }) => {
  const [open, setOpen] = useState(false)
  const { resume, setSkills } = useResume()

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
      ...values,
      id: values.name,
    }

    if (defaultValues) {
      setSkills(skills.map((s) => (s.id === defaultValues.id ? skill : s)))
    } else {
      setSkills([...skills, skill])
    }

    form.reset()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? 'Edit Skill' : 'Add Skill'}>
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            {defaultValues ? (
              <IconPencil className="size-4" />
            ) : (
              <IconPlus className="size-6" />
            )}
          </Button>
        </TooltipWrapper>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{defaultValues ? 'Edit Skill' : 'Add Skill'}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col h-5/6"
          >
            <ScrollArea>
              <div className="grid gap-4 py-4 px-1">
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
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between">
                          <span>Keywords</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              field.onChange([
                                ...field.value,
                                { id: `${Date.now()}`, text: '' },
                              ])
                            }}
                          >
                            <IconPlus className="size-4" />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center text-sm">
                              No keywords added
                            </p>
                          )}
                          <KeywordDragList
                            items={field.value}
                            getItemData={getKeywordData}
                            isItemData={isKeywordData}
                            setItems={field.onChange}
                            itemType="Keyword"
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((k) => k.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((k) => {
                                  if (k.id === id) {
                                    return { ...k, text }
                                  }
                                  return k
                                }),
                              )
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button type="submit" className="mt-4">
              Save Skill
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
