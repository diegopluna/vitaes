'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResumeStore } from '@/providers/resume-store-provider'

export const PersonalForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const { basics } = resume

  return (
    <div className="grid gap-4 sm:grid-cols-2 px-2">
      <div className="grid gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={basics.firstName}
          onChange={e =>
            setResumeField('basics', { ...basics, firstName: e.target.value })
          }
          placeholder="John"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={basics.lastName}
          onChange={e =>
            setResumeField('basics', { ...basics, lastName: e.target.value })
          }
          placeholder="Doe"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="(555) 555-5555"
          value={basics.phone}
          onChange={e =>
            setResumeField('basics', { ...basics, phone: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={basics.email}
          onChange={e =>
            setResumeField('basics', { ...basics, email: e.target.value })
          }
          placeholder="johndoe@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="url">Website</Label>
        <Input
          id="url"
          value={basics.url}
          onChange={e =>
            setResumeField('basics', { ...basics, url: e.target.value })
          }
          placeholder="https://example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="quote">Quote</Label>
        <Input
          id="quote"
          value={basics.quote}
          onChange={e =>
            setResumeField('basics', { ...basics, quote: e.target.value })
          }
          placeholder="Your quote here"
        />
      </div>
    </div>
  )
}
