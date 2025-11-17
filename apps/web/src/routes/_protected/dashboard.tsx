import { safeCall } from '@/lib/utils'
import { getLocale } from '@/paraglide/runtime'
import { orpc } from '@/utils/orpc'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ResumeCard } from '@/components/resume-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const currentLocale = getLocale()
  const navigate = useNavigate()

  // const privateData = useQuery(orpc.privateData.queryOptions())
  const listResumes = useQuery(orpc.listResumes.queryOptions())

  const createResume = useMutation(
    orpc.createResume.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  const handleCreateResume = async () => {
    const create = await safeCall(
      createResume.mutateAsync({
        language: currentLocale,
        name: 'New Resume',
      }),
    )
    if (create.error) {
      toast.error(create.error.message)
    } else {
      navigate({ to: '/builder/$id', params: { id: create.data.id } })
    }
  }

  const handleEdit = (id: string) => {
    navigate({ to: '/builder/$id', params: { id } })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {session.data?.user.name}
          </p>
        </div>
        <Button onClick={handleCreateResume}>
          <Plus className="size-4" />
          Create Resume
        </Button>
      </div>

      {listResumes.isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          Loading resumes...
        </div>
      )}

      {listResumes.data && listResumes.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You don't have any resumes yet.
          </p>
          <Button onClick={handleCreateResume}>
            <Plus className="size-4" />
            Create Your First Resume
          </Button>
        </div>
      )}

      {listResumes.data && listResumes.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listResumes.data.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  )
}
