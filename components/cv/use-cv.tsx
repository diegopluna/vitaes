"use client";

import {
  CVComitteeProps,
  CVEducationProps,
  CVExperienceProps,
  CVExtracurricularProps,
  CVHeaderAlignment,
  CVHeaderProps,
  CVHonorTypeProps,
  CVPresentationProps,
  CVProps,
  CVWritingProps,
} from "@/types/cv-types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type CVContextData = {
  cv: CVProps;
  setSummaryEnabled: (summaryEnabled: boolean) => void;
  setSummaryLabel: (summaryLabel: string) => void;
  setSummaryContent: (summaryContent: string) => void;
  setExperienceEnabled: (experienceEnabled: boolean) => void;
  setExperienceLabel: (experienceLabel: string) => void;
  setExperiences: (experiences: CVExperienceProps[]) => void;
  setHonorsEnabled: (honorsEnabled: boolean) => void;
  setHonorsLabel: (honorsLabel: string) => void;
  setHonorsTypes: (honorsTypes: CVHonorTypeProps[]) => void;
  setPresentationsEnabled: (presentationsEnabled: boolean) => void;
  setPresentationsLabel: (presentationsLabel: string) => void;
  setPresentations: (presentations: CVPresentationProps[]) => void;
  setWritingEnabled: (writingEnabled: boolean) => void;
  setWritingLabel: (writingLabel: string) => void;
  setWritings: (writings: CVWritingProps[]) => void;
  setCommitteeEnabled: (committeeEnabled: boolean) => void;
  setCommitteeLabel: (committeeLabel: string) => void;
  setCommittees: (committees: CVComitteeProps[]) => void;
  setEducationEnabled: (educationEnabled: boolean) => void;
  setEducationLabel: (educationLabel: string) => void;
  setEducations: (educations: CVEducationProps[]) => void;
  setExtracurricularEnabled: (extracurricularEnabled: boolean) => void;
  setExtracurricularLabel: (extracurricularLabel: string) => void;
  setExtracurriculars: (extracurriculars: CVExtracurricularProps[]) => void;
  setCV: Dispatch<SetStateAction<CVProps>>;
};
const CVContext = createContext<CVContextData | undefined>(undefined);

export function useCV(): CVContextData {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}

export function CVContextProvider({ children }: { children: ReactNode }) {
 
  const [summaryEnabled, setSummaryEnabled] = useState(true);
  const [summaryLabel, setSummaryLabel] = useState("Summary");
  const [summaryContent, setSummaryContent] = useState(
    "Experienced software engineer with expertise in web development and a strong background in backend technologies. Proficient in JavaScript, Node.js, and "
  );
  const [experienceEnabled, setExperienceEnabled] = useState(true);
  const [experienceLabel, setExperienceLabel] = useState("Work Experience");
  const [experiences, setExperiences] = useState([
    {
      company: "ABC Corp",
      location: "New York, NY",
      position: "Senior Software Engineer",
      startDate: "May.2018",
      endDate: "Dec.2022",
      description: [
        "Led a team of developers in the design and implementation of a scalable web application.",
        "Developed RESTful APIs using Node.js and Express.",
        "Collaborated with cross-functional teams to deliver high-quality software solutions.",
      ],
    },
    {
      company: "XYZ Tech",
      location: "San Francisco, CA",
      position: "Software Engineer",
      startDate: "Sep.2015",
      endDate: "Apr.2018",
      description: [
        "Contributed to the development of a cutting-edge machine learning platform.",
        "Designed and implemented frontend components using ",
        "Optimized application performance through code refactoring and performance profiling.",
      ],
    },
  ] as CVExperienceProps[]);
  const [honorsEnabled, setHonorsEnabled] = useState(true);
  const [honorsLabel, setHonorsLabel] = useState("Honors & Awards");
  const [honorsTypes, setHonorsTypes] = useState([
    {
      label: "International",
      honors: [
        {
          year: "2018",
          position: "Finalist",
          honor: "DEFCON 26th CTF Hacking Competition World Final",
          location: "Las Vegas, U.S.A.",
        },
        {
          year: "2017",
          position: "Finalist",
          honor: "DEFCON 25th CTF Hacking Competition World Final",
          location: "Las Vegas, U.S.A.",
        },
        {
          year: "2016",
          position: "Finalist",
          honor: "DEFCON 24th CTF Hacking Competition World Final",
          location: "Las Vegas, U.S.A.",
        },
      ],
    },
    {
      label: "Domestic",
      honors: [
        {
          year: "2015",
          position: "3rd Place",
          honor: "WITHCON Hacking Competition Final",
          location: "Seoul, S.Korea",
        },
        {
          year: "2017",
          position: "Silver Prize",
          honor: "KISA HDCON Hacking Competition Final",
          location: "Seoul, S.Korea",
        },
        {
          year: "2013",
          position: "Silver Prize",
          honor: "KISA HDCON Hacking Competition Final",
          location: "Seoul, S.Korea",
        },
      ],
    },
  ] as CVHonorTypeProps[]);
  const [presentationsEnabled, setPresentationsEnabled] = useState(true);
  const [presentationsLabel, setPresentationsLabel] = useState("Presentation");
  const [presentations, setPresentations] = useState([
    {
      event: "Tech Conference 2021",
      role: "Speaker",
      location: "New York, NY",
      date: "May.2021",
      description: [
        "Presented a talk on the latest trends in web development.",
        "Discussed the challenges and opportunities in modern web development.",
      ],
    },
  ] as CVPresentationProps[]);
  const [writingEnabled, setWritingEnabled] = useState(true);
  const [writingLabel, setWritingLabel] = useState("Writing");
  const [writings, setWritings] = useState([
    {
      title: "Exploring the World of Machine Learning",
      role: "Author",
      medium: "Journal",
      startDate: "Jan.2022",
      endDate: "Dec.2022",
      descriptions: [
        "Published a series of articles on the fundamentals of machine learning.",
        "Covered topics such as supervised learning, unsupervised learning, and reinforcement learning.",
      ],
    },
    {
      title: "The Future of Web Development",
      role: "Co-author",
      medium: "Blog",
      startDate: "May.2023",
      endDate: "Dec.2023",
      descriptions: [
        "Co-authored a blog post on the future of web development.",
        "Discussed the latest trends in web development and the impact of emerging technologies.",
      ],
    },
  ] as CVWritingProps[]);
  const [committeeEnabled, setCommitteeEnabled] = useState(true);
  const [committeeLabel, setCommitteeLabel] = useState("Program Committees");
  const [committees, setCommittees] = useState([
    {
      year: "2016",
      position: "Problem Writer",
      organization: "2016 CODEGATE Hacking Competition World Final ",
      location: "S.Korea",
    },
    {
      year: "2013",
      position: "Organizer & Co-director",
      organization: "1st POSTECH Hackathon",
      location: "S.Korea",
    },
  ] as CVComitteeProps[]);

  // temporary code
  const [cvNew, setCvNew] = useState<CVProps>({
    header: {
      alignment: "center",
      firstName: "John",
      lastName: "Doe",
      phoneEnabled: true,
      phone : "123-456-7890",
      emailEnabled: true,
      email: "john.doe@example.com",
      homepageEnabled: true,
      homepage: "www.johndoe.com",
      githubEnabled: true,
      github: "johndoe",
      linkedinEnabled   : true,
      linkedin: "johndoe",
      gitlabEnabled: false,
      gitlab: "",
      twitterEnabled: false,
      twitter: "",
      quoteEnabled: true,
      quote: "Experienced Software Engineer passionate about solving real-world problems.",
    },
    summaryEnabled,
    summary: {
      label: summaryLabel,
      content: summaryContent,
    },
    experienceEnabled,
    experience: {
      label: experienceLabel,
      experiences: experiences,
    },
    honorsEnabled,
    honors: {
      label: honorsLabel,
      honors: honorsTypes,
    },
    presentationsEnabled,
    presentations: {
      label: presentationsLabel,
      presentations,
    },
    writingEnabled,
    writings: {
      label: writingLabel,
      writings,
    },
    committeeEnabled,
    committees: {
      label: committeeLabel,
      committees,
    },
    educationEnabled: true,
    educations: {
      label: "Education",
      educations: [
        {
          school: "Stanford University",
          location: "Palo Alto, CA",
          degree: "Master of Science in Computer Science",
          startDate: "Sep.2013",
          endDate: "Jun.2015",
          description: [
            "Thesis: 'Deep Learning for Sentiment Analysis'",
            "GPA: 3.9/4.0",
          ],
        },
        {
          school: "POSTECH",
          location: "Pohang, S.Korea",
          degree: "Bachelor of Science in Computer Science",
          startDate: "Mar.2009",
          endDate: "Feb.2013",
          description: ["GPA: 3.8/4.0"],
        },
      ],
    },
    extracurricularEnabled: true,
    extracurriculars: {
      label: "Extracurricular Activities",
      extracurriculars: [
        {
          role: "Core Member & President at 2013",
          organization: "PoApper (Developers' Network of POSTECH)",
          location: "Pohang, S.Korea",
          startDate: "Jun. 2010",
          endDate: "Jun. 2017",
          description: [
            "Reformed the society focusing on software engineering and building network on and off campus.",
            "Proposed various marketing and network activities to raise awareness.",
          ],
        },
        {
          role: "Member",
          organization: "PLUS (Laboratory for UNIX Security in POSTECH)",
          location: "Pohang, S.Korea",
          startDate: "Sep. 2010",
          endDate: "Oct. 2011",
          description: [
            "Gained expertise in hacking & security areas, especially about internal of operating system based on UNIX and several exploit techniques.",
            "Participated on several hacking competition and won a good award.",
            "Conducted periodic security checks on overall IT system as a member of POSTECH CERT.",
            "Conducted penetration testing commissioned by national agency and corporation. ",
          ],
        },
      ],
    },
  });
  const setEducationEnabled = (educationEnabled: boolean) => {
    setCvNew((prev) => ({ ...prev, educationEnabled }));
  }
    const setEducationLabel = (educationLabel: string) => {
        setCvNew((prev) => ({
        ...prev,
        educations: { ...prev.educations, label: educationLabel },
        }));
    };
    const setEducations = (educations: CVEducationProps[]) => {
        setCvNew((prev) => ({
        ...prev,
        educations: { ...prev.educations, educations },
        }));
    };

  const setExtracurricularLabel = (extracurricularLabel: string) => {
    setCvNew((prev) => ({
      ...prev,
      extracurriculars: {
        ...prev.extracurriculars,
        label: extracurricularLabel,
      },
    }));
  };
  const setExtracurriculars = (extracurriculars: CVExtracurricularProps[]) => {
    setCvNew((prev) => ({
      ...prev,
      extracurriculars: { ...prev.extracurriculars, extracurriculars },
    }));
  };
  const setExtracurricularEnabled = (extracurricularEnabled: boolean) => {
    setCvNew((prev) => ({ ...prev, extracurricularEnabled }));
  };
  const cv = {
    ...cvNew,
    summaryEnabled,
    summary: {
      label: summaryLabel,
      content: summaryContent,
    },
    experienceEnabled,
    experience: {
      label: experienceLabel,
      experiences: experiences,
    },
    honorsEnabled,
    honors: {
      label: honorsLabel,
      honors: honorsTypes,
    },
    presentationsEnabled,
    presentations: {
      label: presentationsLabel,
      presentations,
    },
    writingEnabled,
    writings: {
      label: writingLabel,
      writings,
    },
    committeeEnabled,
    committees: {
      label: committeeLabel,
      committees,
    },
  };
  // end of temporary code

  const output = {
    cv,
    setSummaryEnabled,
    setSummaryLabel,
    setSummaryContent,
    setExperienceEnabled,
    setExperienceLabel,
    setExperiences,
    setHonorsEnabled,
    setHonorsLabel,
    setHonorsTypes,
    setPresentationsEnabled,
    setPresentationsLabel,
    setPresentations,
    setWritingEnabled,
    setWritingLabel,
    setWritings,
    setCommitteeEnabled,
    setCommitteeLabel,
    setCommittees,
    setEducationEnabled,
    setEducationLabel,
    setEducations,
    setExtracurricularEnabled,
    setExtracurricularLabel,
    setExtracurriculars,
    setCV: setCvNew,
  };
  return <CVContext.Provider value={output}>{children}</CVContext.Provider>;
}
