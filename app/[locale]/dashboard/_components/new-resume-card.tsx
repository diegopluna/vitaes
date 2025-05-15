'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconFilePlus } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAppForm } from '@/components/ui/ts-form'
import { z } from 'zod'
import { api } from '@/trpc/react'
import { useRouter } from '@/i18n/navigation'
import { toast } from 'sonner'

export const NewResumeCard = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const createResume = api.resume.create.useMutation()
  const form = useAppForm({
    validators: {
      onChange: z.object({
        resumeName: z.string().min(1, 'Resume name is required'),
      }),
    },
    defaultValues: {
      resumeName: '',
    },
    onSubmit: ({ value }) => {
      createResume.mutate(
        {
          name: value.resumeName,
        },
        {
          onSuccess: data => {
            const resume = data
            setOpen(false)
            form.reset()
            router.push(`/builder/${resume.id}`)
          },
          onError: () => {
            toast.error('Failed to create resume')
          },
        },
      )
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden rounded-none group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => setOpen(true)}
        >
          <CardHeader className="p-0 gap-0">
            <div className="h-full overflow-hidden">
              <div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out">
                <IconFilePlus className="w-12 h-12 text-black group-hover:text-primary group-hover:scale-110 transition-all durantion-300 ease-in-out" />
              </div>
            </div>
            <CardTitle className="py-6 pb-4 px-6">
              <span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
                Create New
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
            Choose a template to get started
          </CardContent>
          <CardFooter className="space-x-4 mt-auto">
            <div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Resume</DialogTitle>
        </DialogHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <form.AppField
                name="resumeName"
                children={field => (
                  <field.FormItem>
                    <field.FormLabel>Resume Name</field.FormLabel>
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.state.isSubmitting}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}
