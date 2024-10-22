import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResume } from '@/store/resume-store'

// TODO: Add validation, and avatar field
export const BasicsForm = () => {
  const basics = useResume((state) => state.basics)
  const updateBasics = useResume((state) => state.setBasics)

  const updateFirstName = (firstName: string) => {
    const name = basics.name
    const nameParts = name.split(' ')
    nameParts[0] = firstName

    const updatedName = nameParts.join(' ')

    updateBasics({ ...basics, name: updatedName })
  }

  const getFirstName = () => {
    const nameParts = basics.name.split(' ')
    return nameParts[0]
  }

  const updateLastName = (lastName: string) => {
    const nameParts = basics.name.split(' ')
    const firstName = nameParts[0]
    const updatedName = firstName + ' ' + lastName
    updateBasics({ ...basics, name: updatedName })
  }

  const getLastName = () => {
    const nameParts = basics.name.split(' ')
    return nameParts.slice(1).join(' ')
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input
          id="first-name"
          placeholder="John"
          value={getFirstName()}
          onChange={(e) => updateFirstName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input
          id="last-name"
          placeholder="Doe"
          value={getLastName()}
          onChange={(e) => updateLastName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="label">Title</Label>
        <Input
          id="label"
          placeholder="Software Engineer"
          value={basics.label}
          onChange={(e) => updateBasics({ ...basics, label: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="url">Website</Label>
        <Input
          id="url"
          placeholder="https://example.com"
          value={basics.url}
          onChange={(e) => updateBasics({ ...basics, url: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          value={basics.email}
          onChange={(e) => updateBasics({ ...basics, email: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={basics.phone}
          onChange={(e) => updateBasics({ ...basics, phone: e.target.value })}
        />
      </div>
    </div>
  )
}
