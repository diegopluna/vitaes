import { getLocale } from '@/paraglide/runtime'
import { orpc } from '@/utils/orpc'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const currentLocale = getLocale()
  const navigate = useNavigate()

  const privateData = useQuery(orpc.privateData.queryOptions())
  const listResumes = useQuery(orpc.listResumes.queryOptions())

  const createResume = useMutation(
    orpc.createResume.mutationOptions({
      onSuccess: () => {
        listResumes.refetch()
      },
    }),
  )

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.data?.user.name}</p>
      <p>API: {privateData.data?.message}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() =>
          createResume.mutate({ language: currentLocale, name: 'New Resume 2' })
        }
      >
        Create Resume
      </button>
      <ul>
        {listResumes.data?.map((resume) => (
          <li
            onClick={() =>
              navigate({ to: '/builder/$id', params: { id: resume.id } })
            }
            key={resume.id}
          >
            {resume.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
