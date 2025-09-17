'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { TooltipWrapper } from '@/components/tooltip-wrapper'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Project, StringWithId } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const projectLanguageKey = Symbol('project-language')
const projectDescriptionKey = Symbol('project-description')

function getProjectLanguageData(
  language: StringWithId,
): ItemData<StringWithId> {
  return {
    [projectLanguageKey]: true,
    itemId: language.id,
  }
}

function isProjectLanguageData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[projectLanguageKey] === true
}

function getProjectDescriptionData(
  description: StringWithId,
): ItemData<StringWithId> {
  return {
    [projectDescriptionKey]: true,
    itemId: description.id,
  }
}

function isProjectDescriptionData(
  data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
  return data[projectDescriptionKey] === true
}

const ProjectLanguageDragList = HighlightDragList<StringWithId>
const ProjectDescriptionDragList = HighlightDragList<StringWithId>

export function ProjectSheet({ defaultValues }: { defaultValues?: Project }) {
  const t = useTranslations('project-sheet')

  const projectExperienceFormSchema = z.object({
    title: z.string().min(1, t('title-required')),
    programmingLanguages: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
    repository: z.string().min(1, t('repository-required')),
    description: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
    link: z.url(t('link-invalid')).optional(),
    startDate: z.string().min(1, t('start-date-required')),
    endDate: z.string(),
  })

  const [open, setOpen] = useState(false)
  const { resume, setResumeField } = useResumeStore((s) => s)

  const projects = resume.projects

  const form = useForm({
    resolver: zodResolver(projectExperienceFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      programmingLanguages: defaultValues?.programmingLanguages || [],
      repository: defaultValues?.repository || '',
      description: defaultValues?.description || [],
      link: defaultValues?.link || '',
      startDate: defaultValues?.startDate || '',
      endDate: defaultValues?.endDate || '',
    },
  })

  const onSubmit = (value: z.infer<typeof projectExperienceFormSchema>) => {
    const project: Project = {
      ...value,
      endDate: value.endDate || '',
      id: `${value.title}`,
      programmingLanguages: value.programmingLanguages.map((p) => {
        return {
          id: p.value,
          value: p.value,
        } as StringWithId
      }),
      description: value.description.map((d) => {
        return {
          id: d.value,
          value: d.value,
        } as StringWithId
      }),
    }
    if (defaultValues) {
      setResumeField('projects', {
        ...projects,
        content: projects.content.map((w) =>
          w.id === defaultValues.id ? project : w,
        ),
      })
    } else {
      setResumeField('projects', {
        ...projects,
        content: [...projects.content, project],
      })
    }
    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TooltipWrapper tooltip={defaultValues ? t('edit') : t('add')}>
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
          <SheetTitle>{defaultValues ? t('edit') : t('add')}</SheetTitle>
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('title')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repository"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('repository')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('link')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('start-date')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('end-date')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="programmingLanguages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('programming-languages')}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={(e) => {
                              e.preventDefault()
                              field.onChange([
                                ...field.value,
                                { id: `${Date.now()}`, value: '' },
                              ])
                            }}
                          >
                            <IconPlus size={14} />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center text-sm">
                              {t('no-programming-languages-added')}
                            </p>
                          )}
                          <ProjectLanguageDragList
                            items={field.value}
                            getItemData={getProjectLanguageData}
                            isItemData={isProjectLanguageData}
                            setItems={field.onChange}
                            itemType="Language"
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((h) => h.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((h) => {
                                  if (h.id === id) {
                                    return { ...h, value: text }
                                  }
                                  return h
                                }),
                              )
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center justify-between w-full">
                          <span>{t('description')}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={(e) => {
                              e.preventDefault()
                              field.onChange([
                                ...field.value,
                                { id: `${Date.now()}`, value: '' },
                              ])
                            }}
                          >
                            <IconPlus size={14} />
                          </Button>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-2 px-2 items-center">
                          {field.value.length === 0 && (
                            <p className="text-center text-sm">
                              {t('no-description-added')}
                            </p>
                          )}
                          <ProjectDescriptionDragList
                            items={field.value}
                            getItemData={getProjectDescriptionData}
                            isItemData={isProjectDescriptionData}
                            setItems={field.onChange}
                            itemType="Description"
                            onDelete={(id) => {
                              field.onChange(
                                field.value.filter((h) => h.id !== id),
                              )
                            }}
                            onChangeText={(id, text) => {
                              field.onChange(
                                field.value.map((h) => {
                                  if (h.id === id) {
                                    return { ...h, value: text }
                                  }
                                  return h
                                }),
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
              {t('save')}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
