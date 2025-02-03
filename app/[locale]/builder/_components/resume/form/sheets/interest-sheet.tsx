'use client'

import { Highlight, Interest } from '@/@types/resume'
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

const interestFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  keywords: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

const keywordKey = Symbol('interest-keyword')

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

export const InterestSheet = ({
  defaultValues,
}: {
  defaultValues?: Interest
}) => {
  const [open, setOpen] = useState(false)
  const { resume, setInterests } = useResume()

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
      ...values,
      id: values.name,
    }

    if (defaultValues) {
      setInterests(
        interests.map((i) => (i.id === defaultValues.id ? interest : i)),
      )
    } else {
      setInterests([...interests, interest])
    }

    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper
          tooltip={defaultValues ? 'Edit Interest' : 'Add Interest'}
        >
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
          <SheetTitle>
            {defaultValues ? 'Edit Interest' : 'Add Interest'}
          </SheetTitle>
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
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between">
                          <span>Keywords</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              field.onChange([
                                ...field.value,
                                { id: `${Date.now()}`, text: '' },
                              ])
                            }
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
                                field.value.map((k) =>
                                  k.id === id ? { ...k, text } : k,
                                ),
                              )
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button className="mt-4" type="submit">
              Save Interest
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
