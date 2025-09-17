'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconFilePlus, IconLoader2 } from '@tabler/icons-react'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'

const formSchema = z.object({
  name: z.string().min(1),
})

export function NewResumeCard() {
  const locale = useLocale()
  const t = useTranslations('new-resume-card')
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const createResume = useMutation(api.resume.functions.create)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await createResume({ locale, name: values.name })
        .then((id) => {
          setOpen(false)
          form.reset()
          router.push(`/builder/${id.toString()}`)
        })
        .catch(() => {
          toast.error(t('failed-to-create'))
        })
    })
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
                {t('create-new')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
            {t('choose-template')}
          </CardContent>
          <CardFooter className="space-x-4 mt-auto">
            <div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('add-resume')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('resume-name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isPending}
              >
                {isPending && <IconLoader2 className="w-4 h-4 animate-spin" />}
                {t('add')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
