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

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const currentLocale = getLocale()
  const navigate = useNavigate()

  // const privateData = useQuery(orpc.privateData.queryOptions())
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

  const handleCreateResume = () => {
    setCreateDialogOpen(true)
  }

  const handleCreateResumeConfirm = async (name: string) => {
    const create = await safeCall(
      createResume.mutateAsync({
        language: currentLocale,
        name,
      }),
    )
    if (create.error) {
      toast.error(create.error.message)
      return
    }

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
    }
  }

  const handleShare = (slug: string) => {
    setShareDialog({
      open: true,
      slug,
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{m['dashboard.title']()}</h1>
          <p className="text-muted-foreground mt-1">
            {m['dashboard.welcome']({
              name: session.data?.user.name ?? '',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateResume}>
            <Plus className="size-4" />
            {m['dashboard.createResume']()}
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

      {listResumes.isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          {m['dashboard.loadingResumes']()}
        </div>
      )}

      {listResumes.data && listResumes.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {m['dashboard.noResumes']()}
          </p>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="size-4" />
            {m['dashboard.createYourFirstResume']()}
          </Button>
        </div>
      )}

      {listResumes.data && listResumes.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            />
          ))}
        </div>
      )}

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
