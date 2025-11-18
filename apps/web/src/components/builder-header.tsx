import { Link, useParams } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'
import { UserButton } from '@daveyplate/better-auth-ui'
import { useResumeStore } from '@/context/use-resume-store'
import { Button } from './ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { useAppForm } from './form/form-context'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { orpc } from '@/utils/orpc'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { LanguageSelector } from './language-selector'
import { m } from '@/paraglide/messages'
import { op } from '@/lib/op'

export default function BuilderHeader({
  documentUrl,
}: {
  documentUrl: string
}) {
  const { id } = useParams({ from: '/_protected/builder/$id' })
  const {
    lastSaved,
    isSaving,
    resumeName,
    setResumeName,
    setIsSaving,
    setLastSaved,
  } = useResumeStore()
  const [distanceToNow, setDistanceToNow] = useState<string>(
    formatDistanceToNow(lastSaved, { addSuffix: true }),
  )
  const updateResumeName = useMutation(orpc.updateResumeName.mutationOptions())
  useEffect(() => {
    const id = setInterval(() => {
      setDistanceToNow(formatDistanceToNow(lastSaved, { addSuffix: true }))
    }, 1000)
    return () => clearInterval(id)
  }, [lastSaved])

  const form = useAppForm({
    defaultValues: {
      name: resumeName,
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, { message: m['validation.name']() }),
      }),
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: (values) => {
        if (values.formApi.state.isValid) {
          setResumeName(values.formApi.state.values.name)
          setIsSaving(true)
          updateResumeName
            .mutateAsync({ id, name: values.formApi.state.values.name })
            .then((savedResume) => {
              setLastSaved(savedResume.updatedAt)
            })
            .catch(() => {
              toast.error(m['editor.failedToUpdateName']())
            })
            .finally(() => {
              setIsSaving(false)
            })
        }
      },
    },
  })

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex flex-row gap-4 text-lg items-center">
          <Link to="/dashboard">
            <ArrowLeft className="size-6" />
          </Link>
          <form.AppField
            name="name"
            children={(field) => <field.FormInput />}
          />
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isSaving
              ? m['editor.saving']()
              : m['editor.lastSaved']({ distanceToNow })}
          </span>
          <Button variant="outline" asChild>
            <a
              href={documentUrl}
              download={`${resumeName}.pdf`}
              onClick={() => op.track('Resume Downloaded', { resumeId: id })}
            >
              <Download className="size-4" />
              {m['editor.download']()}
            </a>
          </Button>
          <ModeToggle />
          <LanguageSelector />
          <UserButton
            className="bg-transparent"
            localization={{
              SIGN_OUT: m['userButton.signOut'](),
              SETTINGS: m['userButton.settings'](),
            }}
          />
        </div>
      </div>
      <hr />
    </div>
  )
}
