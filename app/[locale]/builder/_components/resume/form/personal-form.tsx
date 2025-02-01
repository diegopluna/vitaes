'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { useResume } from '@/providers/resume-provider'

export const PersonalForm = () => {
  const { resume, setBasics } = useResume()

  const { basics } = resume

  const updateFirstName = (firstName: string) => {
    const name = basics.name
    const nameParts = name.split(' ')
    nameParts[0] = firstName

    const updatedName = nameParts.join(' ')

    setBasics({
      ...basics,
      name: updatedName,
    })
  }

  const getFirstName = () => {
    const nameParts = basics.name.split(' ')
    return nameParts[0]
  }

  const updateLastName = (lastName: string) => {
    const name = basics.name
    const nameParts = name.split(' ')
    const firstName = nameParts[0]
    const updatedName = firstName + ' ' + lastName

    setBasics({
      ...basics,
      name: updatedName,
    })
  }

  const getLastName = () => {
    const nameParts = basics.name.split(' ')
    return nameParts[1]
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 px-2">
      <div className="flex-col justify-center items-center gap-4 grid">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={basics.image ? basics.image : undefined}
            alt="Profile picture"
          />
          <AvatarFallback>{basics.name ? basics.name[0] : 'A'}</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          value={basics.image}
          onChange={(e) => setBasics({ ...basics, image: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={getFirstName()}
          onChange={(e) => updateFirstName(e.target.value)}
          placeholder="John"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={getLastName()}
          onChange={(e) => updateLastName(e.target.value)}
          placeholder="Doe"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="label">Title</Label>
        <Input
          id="label"
          value={basics.label}
          onChange={(e) => setBasics({ ...basics, label: e.target.value })}
          placeholder="Software Developer"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="url">Website</Label>
        <Input
          id="url"
          value={basics.url}
          onChange={(e) => setBasics({ ...basics, url: e.target.value })}
          placeholder="https://example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={basics.email}
          onChange={(e) => setBasics({ ...basics, email: e.target.value })}
          placeholder="johndoe@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <PhoneInput
          id="phone"
          placeholder="(555) 555-5555"
          value={basics.phone}
          onChange={(value) => setBasics({ ...basics, phone: value })}
        />
      </div>
    </div>
  )
}
