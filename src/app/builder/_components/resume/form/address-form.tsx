import { CountrySelect } from '@/components/ui/country-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResumeStore } from '@/providers/resume-store-provider'

// TODO: Add validation
export const AddressForm = () => {
  const { resume, setBasics } = useResumeStore((state) => state)

  const { location } = resume.basics

  return (
    <div className="grid gap-4 sm:grid-cols-2 px-2">
      <div className="grid gap-2">
        <Label htmlFor="countryCode">Country</Label>
        <CountrySelect
          value={location.countryCode}
          onChange={(value) => {
            setBasics({
              ...resume.basics,
              location: {
                ...location,
                countryCode: value.value,
              },
            })
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="region">Region</Label>
        <Input
          id="region"
          placeholder="California"
          value={location.region}
          onChange={(e) =>
            setBasics({
              ...resume.basics,
              location: { ...location, region: e.target.value },
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="San Francisco"
          value={location.city}
          onChange={(e) =>
            setBasics({
              ...resume.basics,
              location: { ...location, city: e.target.value },
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          placeholder="12345"
          value={location.postalCode}
          onChange={(e) =>
            setBasics({
              ...resume.basics,
              location: { ...location, postalCode: e.target.value },
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="123 Main St"
          value={location.address}
          onChange={(e) =>
            setBasics({
              ...resume.basics,
              location: { ...location, address: e.target.value },
            })
          }
        />
      </div>
    </div>
  )
}
