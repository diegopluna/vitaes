'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAppForm } from '@/components/ui/ts-form'
import { authClient } from '@/lib/auth-client'
import { api } from '@/trpc/react'
import { IconEdit } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
})

export const UpdateUserProfileDialog = () => {
  const t = useTranslations('AccountMenu')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const apiUtils = api.useUtils()
  const { data } = api.auth.getSession.useQuery()
  const session = data?.session

  async function updateUserName(name: string) {
    setLoading(true)
    await authClient.updateUser({
      name,
    })
    apiUtils.auth.getSession.invalidate()
    setLoading(false)
  }

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      name: session?.user.name || '',
    },
    onSubmit: async ({ value }) => {
      await updateUserName(value.name)
      setOpen(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>{t('profile-page.update-profile')}</DialogTitle>
        <form.AppForm>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <form.AppField
                name="name"
                children={field => (
                  <field.FormItem>
                    <field.FormLabel>
                      {t('profile-page.full-name')}
                    </field.FormLabel>
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
                disabled={loading}
              >
                {t('profile-page.cancel')}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? t('profile-page.saving') : t('profile-page.save')}
              </Button>
            </DialogFooter>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}
