interface VitaesResume {
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}

interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

interface Work {
  id: string;
  name: string;
  position: string;
  location: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Highlight[];
}

interface Volunteer {
  id: string;
  organization: string;
  position: string;
  location: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Highlight[];
}

interface Education {
  id: string;
  institution: string;
  url: string;
  area: string;
  location: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: Highlight[];
}

interface Award {
  id: string;
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

interface Certificate {
  id: string;
  name: string;
  date: string;
  issuer: string;
  url: string;
}

interface Publication {
  id: string;
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
  keywords: Highlight[];
}

interface Language {
  id: string;
  language: string;
  fluency: string;
}

interface Interest {
  id: string;
  name: string;
  keywords: Highlight[];
}

interface Reference {
  id: string;
  name: string;
  reference: string;
}

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: Highlight[];
  url: string;
}

interface Highlight {
  id: string;
  content: string;
}

interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface Profile {
  id: string;
  network: string;
  username: string;
  url: string;
  icon?: string;
}
