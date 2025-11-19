import { safeCall } from '@/lib/utils'
import { getLocale } from '@/paraglide/runtime'
import { orpc } from '@/utils/orpc'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ResumeCard } from '@/components/resume-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RenameDialog } from '@/components/rename-dialog'
import { DeleteDialog } from '@/components/delete-dialog'
import { CreateResumeDialog } from '@/components/create-resume-dialog'
import { ShareDialog } from '@/components/share-dialog'
import { generateThumbnail } from '@/utils/generate-thumbnail'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSelector } from '@/components/language-selector'
import { UserButton } from '@daveyplate/better-auth-ui'
import { useState } from 'react'
import { m } from '@/paraglide/messages'
import { op } from '@/lib/op'
import type { Template } from '@vitaes/types/resume'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const currentLocale = getLocale()
  const navigate = useNavigate()

  const listResumes = useQuery(orpc.listResumes.queryOptions())

  const [renameDialog, setRenameDialog] = useState<{
    open: boolean
    resumeId: string | null
    currentName: string
  }>({
    open: false,
    resumeId: null,
    currentName: '',
  })

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    resumeId: string | null
    resumeName: string
  }>({
    open: false,
    resumeId: null,
    resumeName: '',
  })

  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const [shareDialog, setShareDialog] = useState<{
    open: boolean
    slug: string
  }>({
    open: false,
    slug: '',
  })

  const totalResumes = listResumes.data?.length ?? 0
  const publicResumes =
    listResumes.data?.filter((resume) => resume.isPublic).length ?? 0
  const totalViews =
    listResumes.data?.reduce((sum, resume) => sum + resume.views, 0) ?? 0
  const totalDownloads =
    listResumes.data?.reduce((sum, resume) => sum + resume.downloads, 0) ?? 0

  const createResume = useMutation(
    orpc.createResume.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  const updateResumeName = useMutation(
    orpc.updateResumeName.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  const deleteResume = useMutation(
    orpc.deleteResume.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
        toast.success(m['dashboard.deletedResume']())
      },
    }),
  )

  const updateResumePublicStatus = useMutation(
    orpc.updateResumePublicStatus.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  const uploadThumbnail = useMutation(orpc.uploadThumbnail.mutationOptions())

  const duplicateResume = useMutation(
    orpc.duplicateResume.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  const handleCreateResume = () => {
    setCreateDialogOpen(true)
  }

  const handleCreateResumeConfirm = async (
    name: string,
    template: Template,
  ) => {
    const create = await safeCall(
      createResume.mutateAsync({
        language: currentLocale,
        name,
        template,
      }),
    )
    if (create.error) {
      toast.error(create.error.message)
      return
    }

    op.track('Resume Created', {
      resumeId: create.data.id,
      name,
    })

    navigate({ to: '/builder/$id', params: { id: create.data.id } })

    if (create.data.data) {
      safeCall(generateThumbnail(create.data.data))
        .then((thumbnail) => {
          if (thumbnail.data) {
            return safeCall(
              uploadThumbnail.mutateAsync({
                resumeId: create.data.id,
                thumbnail: thumbnail.data,
              }),
            )
          }
          return null
        })
        .catch(() => {})
    }
  }

  const handleEdit = (id: string) => {
    navigate({ to: '/builder/$id', params: { id } })
  }

  const handleRename = (id: string, currentName: string) => {
    setRenameDialog({
      open: true,
      resumeId: id,
      currentName,
    })
  }

  const handleRenameConfirm = async (newName: string) => {
    if (!renameDialog.resumeId) return

    const result = await safeCall(
      updateResumeName.mutateAsync({
        id: renameDialog.resumeId,
        name: newName,
      }),
    )
    if (result.error) {
      toast.error('Failed to rename resume')
    } else {
      setRenameDialog({ open: false, resumeId: null, currentName: '' })
    }
  }

  const handleDelete = (id: string, name: string) => {
    setDeleteDialog({
      open: true,
      resumeId: id,
      resumeName: name,
    })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.resumeId) return

    const result = await safeCall(
      deleteResume.mutateAsync({ id: deleteDialog.resumeId }),
    )
    if (result.error) {
      toast.error(m['dashboard.failedToDeleteResume']())
    } else {
      setDeleteDialog({ open: false, resumeId: null, resumeName: '' })
    }
  }

  const handleTogglePublic = async (id: string, currentStatus: boolean) => {
    const result = await safeCall(
      updateResumePublicStatus.mutateAsync({
        id,
        isPublic: !currentStatus,
      }),
    )
    if (result.error) {
      toast.error(m['dashboard.failedToUpdateResumeVisibility']())
    } else {
      toast.success(
        m['dashboard.updatedResumeVisibility']({
          visibility: !currentStatus ? 'public' : 'private',
        }),
      )
      op.track('Resume Visibility Updated', {
        resumeId: id,
        visibility: !currentStatus ? 'public' : 'private',
      })
    }
  }

  const handleShare = (slug: string) => {
    setShareDialog({
      open: true,
      slug,
    })
  }

  const handleDuplicate = async (id: string) => {
    const result = await safeCall(
      duplicateResume.mutateAsync({
        id,
      }),
    )
    if (result.error) {
      toast.error(m['dashboard.duplicateError']())
    } else {
      toast.success(m['dashboard.duplicateSuccess']())
      op.track('Resume Duplicated', {
        resumeId: id,
      })
    }
  }

  op.track('Dashboard Visited')

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              {m['dashboard.title']()}
            </p>
            <p className="text-sm text-muted-foreground">
              {m['dashboard.welcome']({
                name: session.data?.user.name ?? '',
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ModeToggle />
            <LanguageSelector />
            <UserButton
              className="bg-transparent"
              localization={{
                SIGN_OUT: m['userButton.signOut'](),
                SETTINGS: m['userButton.settings'](),
              }}
              size="default"
            />
          </div>
        </header>

        <section className="border border-white/10 bg-card/80 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {m['dashboard.hero.title']()}
              </h1>
              <p className="text-sm text-muted-foreground">
                {m['dashboard.hero.subtitle']()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCreateResume}>
                <Plus className="size-4" />
                {m['dashboard.createResume']()}
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: m['dashboard.stats.total'](), value: totalResumes },
              { label: m['dashboard.stats.public'](), value: publicResumes },
              { label: m['dashboard.stats.views'](), value: totalViews },
              {
                label: m['dashboard.stats.downloads'](),
                value: totalDownloads,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-background/60 px-4 py-3 transition hover:border-primary/40"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {listResumes.isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            {m['dashboard.loadingResumes']()}
          </div>
        )}

        {listResumes.data && listResumes.data.length === 0 && (
          <div className="border border-dashed border-white/15 bg-card/60 px-8 py-16 text-center">
            <h2 className="text-xl font-semibold">
              {m['dashboard.empty.title']()}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {m['dashboard.empty.subtitle']()}
            </p>
            <Button className="mt-6" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="size-4" />
              {m['dashboard.empty.cta']()}
            </Button>
          </div>
        )}

        {listResumes.data && listResumes.data.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {listResumes.data.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={handleEdit}
                onRename={() => handleRename(resume.id, resume.name)}
                onDelete={() => handleDelete(resume.id, resume.name)}
                onTogglePublic={() =>
                  handleTogglePublic(resume.id, resume.isPublic)
                }
                onShare={handleShare}
                onDuplicate={() => handleDuplicate(resume.id)}
              />
            ))}
          </div>
        )}
      </div>

      <RenameDialog
        open={renameDialog.open}
        currentName={renameDialog.currentName}
        onOpenChange={(open) =>
          setRenameDialog({ open, resumeId: null, currentName: '' })
        }
        onConfirm={handleRenameConfirm}
      />

      <DeleteDialog
        open={deleteDialog.open}
        resumeName={deleteDialog.resumeName}
        onOpenChange={(open) =>
          setDeleteDialog({ open, resumeId: null, resumeName: '' })
        }
        onConfirm={handleDeleteConfirm}
      />

      <CreateResumeDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onConfirm={handleCreateResumeConfirm}
      />

      <ShareDialog
        open={shareDialog.open}
        slug={shareDialog.slug}
        onOpenChange={(open) => setShareDialog({ open, slug: '' })}
      />
    </div>
  )
}
