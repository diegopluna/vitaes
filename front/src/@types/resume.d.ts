export type Resume = {
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
};

type Basics = {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Address;
  profiles: Profile[];
};

type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

type Volunteer = {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

type Education = {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

type Award = {
  title: string;
  date: string;
  awarder: string;
  summary: string;
};

type Certificate = {
  name: string;
  date: string;
  issuer: string;
  url: string;
};

type Publication = {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
};

type Skill = {
  name: string;
  level: string;
  keywords: string[];
};

type Language = {
  language: string;
  fluency: string;
};

type Interest = {
  name: string;
  keywords: string[];
};

type Reference = {
  name: string;
  reference: string;
};

type Project = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
};

type Address = {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};

type Profile = {
  id: string;
  network: string;
  username: string;
  url: string;
};
