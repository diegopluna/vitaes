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

export type CVProps = {
    header: CVHeaderProps;
    summaryEnabled: boolean;
    summary?: CVSummaryProps;
    experienceEnabled: boolean;
    experience?: CVExperiencesProps;
}