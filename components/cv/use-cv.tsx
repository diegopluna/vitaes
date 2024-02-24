"use client";

import {
  CVProps,
} from "@/types/cv-types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CVContextData = {
  cv: CVProps;
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
  // temporary code
  const [cv, setCV] = useState<CVProps>({
    header: {
      alignment: "center",
      firstName: "John",
      lastName: "Doe",
      phoneEnabled: true,
      phone: "123-456-7890",
      emailEnabled: true,
      email: "john.doe@example.com",
      homepageEnabled: true,
      homepage: "www.johndoe.com",
      githubEnabled: true,
      github: "johndoe",
      linkedinEnabled: true,
      linkedin: "johndoe",
      gitlabEnabled: false,
      gitlab: "",
      twitterEnabled: false,
      twitter: "",
      quoteEnabled: true,
      quote:
        "Experienced Software Engineer passionate about solving real-world problems.",
    },
    summary: {
      enabled: true,
      label: "Summary",
      content:
        "Experienced software engineer with expertise in web development and a strong background in backend technologies. Proficient in JavaScript, Node.js, and Python",
    },
    experience: {
      enabled: true,
      label: "Work Experience",
      experiences: [
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
      ],
    },
    honors: {
      enabled: true,
      label: "Honors & Awards",
      honors: [
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
      ],
    },
    presentations: {
      enabled: true,
      label: "Presentations",
      presentations: [
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
      ],
    },
    writings: {
      enabled: true,
      label: "Writing",
      writings: [
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
      ],
    },
    committees: {
      label: "Program Committees",
      committees: [
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
      ],
      enabled: true,
    },
    educations: {
        enabled: true,
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
    extracurriculars: {
        enabled: true,
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
    projects: {
      enabled: true,
      label: "Projects",
      projects: [
        {
          title: "Awesome Project",
          programmingLanguages: ["JavaScript", "React", "Node.js"],
          githubRepoEnabled: true,
          githubRepo: "github.com/johndoe/awesomeproject",
          description: [
            "Developed a web application for managing tasks and projects.",
            "Implemented a RESTful API using Node.js and Express.",
            "Designed and developed the frontend using React.",
          ],
          linkEnabled: true,
          link: "awesomeproject.com",
          startDate: "Jan.2022",
          endDateEnabled: true,
          endDate: "Dec.2022",
        },
      ]
    }
  });
  // end of temporary code

  const output = {
    cv,
    setCV: setCV,
  };
  return <CVContext.Provider value={output}>{children}</CVContext.Provider>;
}
