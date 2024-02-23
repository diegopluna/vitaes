export type CVHeaderAlignment = "left" | "center" | "right";

export type CVHeaderProps = {
  alignment: CVHeaderAlignment;
  firstName: string;
  lastName: string;
  phoneEnabled: boolean;
  phone?: string;
  emailEnabled: boolean;
  email?: string;
  homepageEnabled: boolean;
  homepage?: string;
  githubEnabled: boolean;
  github?: string;
  linkedinEnabled: boolean;
  linkedin?: string;
  gitlabEnabled: boolean;
  gitlab?: string;
  twitterEnabled: boolean;
  twitter?: string;
  quoteEnabled: boolean;
  quote?: string;
};

export type CVSummaryProps = {
  label: string;
  content: string;
  enabled: boolean;
};

export type CVExperienceProps = {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export type CVExperiencesProps = {
  enabled: boolean;
  label: string;
  experiences: CVExperienceProps[];
};

export type CVHonorProps = {
  year: string;
  position: string;
  honor: string;
  location: string;
};

export type CVHonorTypeProps = {
  label: string;
  honors: CVHonorProps[];
};

export type CVHonorsProps = {
  enabled: boolean;
  label: string;
  honors: CVHonorTypeProps[];
};

export type CVPresentationProps = {
  event: string;
  role: string;
  location: string;
  date: string;
  description: string[];
};

export type CVPresentationsProps = {
  enabled: boolean;
  label: string;
  presentations: CVPresentationProps[];
};

export type CVWritingProps = {
  title: string;
  role: string;
  medium: string;
  startDate: string;
  endDate: string;
  descriptions: string[];
};

export type CVWritingsProps = {
  enabled: boolean;
  label: string;
  writings: CVWritingProps[];
};

export type CVComitteeProps = {
  year: string;
  position: string;
  organization: string;
  location: string;
};

export type CVCommitteesProps = {
  enabled: boolean;
  label: string;
  committees: CVComitteeProps[];
};

export type CVEducationProps = {
  school: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export type CVEducationsProps = {
  label: string;
  enabled: boolean;
  educations: CVEducationProps[];
};

export type CVExtracurricularProps = {
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export type CVExtracurricularsProps = {
  label: string;
  enabled: boolean;
  extracurriculars: CVExtracurricularProps[];
};

export type CVProps = {
  header: CVHeaderProps;
  summary: CVSummaryProps;
  experience: CVExperiencesProps;
  honors: CVHonorsProps;
  presentations: CVPresentationsProps;
  writings: CVWritingsProps;
  committees: CVCommitteesProps;
  educations: CVEducationsProps;
  extracurriculars: CVExtracurricularsProps;
};
