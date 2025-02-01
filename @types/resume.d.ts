type Work = {
  id: string
  name: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
}

type Volunteer = {
  id: string
  organization: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
}

type Education = {
  id: string
  institution: string
  url: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  score: string
  courses: string[]
}

type Award = {
  id: string
  title: string
  date: string
  awarder: string
  summary: string
}

type Certificate = {
  id: string
  name: string
  date: string
  issuer: string
  url: string
}

type Publication = {
  id: string
  name: string
  publisher: string
  releaseDate: string
  url: string
  summary: string
}

type Skill = {
  id: string
  name: string
  level: string
  keywords: string[]
}

type Language = {
  id: string
  language: string
  fluency: string
}

type Interest = {
  id: string
  name: string
  keywords: string[]
}

type Reference = {
  id: string
  name: string
  reference: string
}

type Project = {
  id: string
  name: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
  url: string
}

type Address = {
  address: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}

type Profile = {
  id: string
  network: string
  username: string
  url: string
}

type Basics = {
  name: string
  label: string
  image: string
  email: string
  phone: string
  url: string
  summary: string
  location: Address
  profiles: Profile[]
}

export type Resume = {
  basics: Basics
  work: Work[]
  volunteer: Volunteer[]
  education: Education[]
  awards: Award[]
  certificates: Certificate[]
  publications: Publication[]
  skills: Skill[]
  languages: Language[]
  interests: Interest[]
  references: Reference[]
  projects: Project[]
}

type Template = 'awesome-cv'

type Settings = {
  template: Template
  fontSize: number
  accentColor: string
}

type VitaesResume = {
  resume: Resume
  settings: Settings
}
