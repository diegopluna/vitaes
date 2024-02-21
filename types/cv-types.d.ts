export type CVHeaderProps = {
    alignment: "start" | "center" | "end";
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
}

export type CVSummaryProps = {
    label: string;
    content: string;
}

export type CVExperienceProps = {
    company: string;
    location: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
}

export type CVExperiencesProps = {
    label: string;
    experiences: CVExperienceProps[];
}

export type CVHonorProps = {
    year: string;
    position: string;
    honor: string;
    location: string;
}

export type CVHonorTypeProps = {
    label: string;
    honors: CVHonorProps[];
}

export type CVHonorsProps = {
    label: string;
    honors?: CVHonorTypeProps[];
}

export type CVPresentationProps = {
    event: string;
    role: string;
    location: string;
    date: string;
    description: string[];
}

export type CVPresentationsProps = {
    label: string;
    presentations: CVPresentationProps[];
}

export type CVWritingProps = {
    title: string;
    role: string;
    medium: string;
    startDate: string;
    endDate: string;
    descriptions: string[];
}

export type CVWritingsProps = {
    label: string;
    writings: CVWritingProps[];
}

export type CVComitteeProps = {
    year: string;
    position: string;
    organization: string;
    location: string;
}

export type CVCommitteesProps = {
    label: string;
    committees: CVComitteeProps[];
}

export type CVProps = {
    header: CVHeaderProps;
    summaryEnabled: boolean;
    summary?: CVSummaryProps;
    experienceEnabled: boolean;
    experience?: CVExperiencesProps;
    honorsEnabled: boolean;
    honors?: CVHonorsProps;
    presentationsEnabled: boolean;
    presentations?: CVPresentationsProps;
    writingEnabled: boolean;
    writings?: CVWritingsProps;
    committeeEnabled: boolean;
    committees?: CVCommitteesProps;
}