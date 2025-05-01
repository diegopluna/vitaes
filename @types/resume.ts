export type Resume = {
  basics: Basics
  work: Work[]
  honors: HonorsPerLabel[]
  presentations: Presentation[]
  writings: Writing[]
  committees: Comittee[]
  education: Education[]
  extracurriculars: Extracurricular[]
  projects: Project[]
  languages: Language[]
  certificates: Certificate[]
  settings: Settings
}

// Basics is the new iteration of the CVHeaderProps type
export type Basics = {
  firstName: string
  lastName: string
  phone: string
  email: string
  url: string
  quote: string
  summary: string
  profiles: Profile[]
}

export type Profile = {
  id: string
  network: string
  username: string
  url: string
}

type StringWithId = {
  id: string
  value: string
}

// Skills is the new iteration of CVExperienceProps
export type Work = {
  id: string
  company: string
  location: string
  position: string
  startDate: string
  endDate: string
  highlights: StringWithId[]
}

// Honor is the new iteration of CVHonorProps
export type Honor = {
  id: string
  year: string
  position: string
  honor: string
  location: string
}

// HonorsPerLabel is the new iteration of CVHonorsProps
export type HonorsPerLabel = {
  id: string
  label: string
  honors: Honor[]
}

// Presentation is the new iteration of CVPresentationProps
export type Presentation = {
  id: string
  event: string
  role: string
  location: string
  date: string
  description: StringWithId[]
}

// Writing is the new iteration of CVWritingProps
export type Writing = {
  id: string
  title: string
  role: string
  medium: string
  startDate: string
  endDate: string
  description: StringWithId[]
}

// Comittee is the new iteration of CVCommitteeProps
export type Comittee = {
  id: string
  year: string
  position: string
  organization: string
  location: string
}

// Education is the new iteration of CVEducationProps
export type Education = {
  id: string
  school: string
  location: string
  degree: string
  startDate: string
  endDate: string
  description: StringWithId[]
}

// Extracurricular is the new iteration of CVExtracurricularProps
export type Extracurricular = {
  id: string
  role: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: StringWithId[]
}

// Project is the new iteration of CVProjectProps
export type Project = {
  id: string
  title: string
  programmingLanguages: StringWithId[]
  repository: string
  description: StringWithId[]
  link: string
  startDate: string
  endDate: string
}

// Language is the new iteration of CVLanguageProps
export type Language = {
  id: string
  language: string
  fluency: string
}

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  description: StringWithId[]
}

export type ResumeModel = 'awesome-cv' | 'ubaga-cv'

export type AwesomeCVHeaderAlignment = 'start' | 'center' | 'end'
export type AwesomeCVColor =
  | 'text-[#00A388]'
  | 'text-[#0395DE]'
  | 'text-[#DC3522]'
  | 'text-[#EF4089]'
  | 'text-[#FF6138]'
  | 'text-[#27AE60]'
  | 'text-[#95A5A6]'
  | 'text-[#131A28]'

export type AwesomeCVSettings = {
  accentColor: AwesomeCVColor
  headerAlignment: AwesomeCVHeaderAlignment
}

export type UbagaCVTextColor =
  | 'black'
  | 'pink'
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'
export type UbagaCVSettings = {
  textColor: UbagaCVTextColor
}

export type Settings = {
  model: ResumeModel
  awesomeCV: AwesomeCVSettings
  ubagaCV: UbagaCVSettings
}
