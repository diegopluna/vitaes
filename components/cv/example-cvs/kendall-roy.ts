import { CVProps } from "@/types/cv-types";

const kendallRoyCV: CVProps = {
  header: {
    firstName: "Kendall",
    lastName: "Roy",
    phoneEnabled: true,
    phone: "123-456-7890",
    emailEnabled: true,
    email: "kendallroy@waystar.com",
    homepageEnabled: false,
    githubEnabled: false,
    linkedinEnabled: true,
    linkedin: "kendallroy",
    gitlabEnabled: false,
    twitterEnabled: true,
    twitter: "kendallroy",
    quoteEnabled: true,
    quote: "Success is not given, it's earned.",
  },
  summary: {
    label: "Summary",
    content:
      "Experienced executive with a strong background in corporate management and strategic decision-making. Proven track record of leadership and innovation.",
    enabled: true,
  },
  experience: {
    enabled: true,
    label: "Experience",
    experiences: [
      {
        company: "Waystar Royco",
        location: "New York, NY",
        position: "Co-CEO",
        startDate: "2018-01-01",
        endDate: "present",
        description: [
          "Continued to lead the company as Chief Executive Officer, driving further growth and innovation.",
        ],
      },
      {
        company: "Waystar Royco",
        location: "New York, NY",
        position: "COO",
        startDate: "2016-01-01",
        endDate: "2018-01-01",
        description: [
          "Led the company through a period of significant growth and expansion as Chief Operating Officer.",
          "Implemented strategic initiatives to increase operational efficiency and streamline processes.",
          "Played a key role in negotiating major business deals and partnerships.",
        ],
      },
      {
        company: "Vaulter",
        location: "New York, NY",
        position: "CEO",
        startDate: "2016-01-01",
        endDate: "2018-01-01",
        description: [
          "Transformed struggling digital media company into a profitable business.",
          "Negotiated strategic partnerships and acquisitions.",
          "Led efforts to improve content quality and audience engagement.",
        ],
      },
    ],
  },
  honors: {
    enabled: true,
    label: "Honors",
    honors: [
      {
        label: "Awards",
        honors: [
          {
            year: "2017",
            position: "1st Place",
            honor: "Business Innovation Award",
            location: "New York, NY",
          },
          {
            year: "2018",
            position: "Top 10",
            honor: "Business Leaders of the Year",
            location: "New York, NY",
          },
        ],
      },
    ],
  },
  presentations: {
    enabled: false,
    label: "Presentations",
    presentations: [],
  },
  writings: {
    enabled: false,
    label: "Writings",
    writings: [],
  },
  committees: {
    enabled: false,
    label: "Committees",
    committees: [],
  },
  educations: {
    label: "Education",
    enabled: true,
    educations: [
      {
        school: "Harvard Business School",
        location: "Cambridge, MA",
        degree: "MBA",
        startDate: "2015-09-01",
        endDate: "2017-05-01",
        description: ["Focused on corporate strategy and leadership."],
      },
      {
        school: "Brown University",
        location: "Providence, RI",
        degree: "Bachelor of Arts in Economics",
        startDate: "2009-09-01",
        endDate: "2013-05-01",
        description: [
          "Graduated magna cum laude.",
          "Member of the Economics Club.",
        ],
      },
    ],
  },
  extracurriculars: {
    label: "Extracurriculars",
    enabled: false,
    extracurriculars: [],
  },
  projects: {
    label: "Projects",
    enabled: false,
    projects: [],
  },
  languages: {
    enabled: false,
    label: "Languages",
    languages: [],
  },
  certificates: {
    enabled: true,
    label: "Certificates",
    certificates: [
      {
        title: "Strategic Leadership",
        issuer: "Harvard Business School",
        date: "2017-05-01",
        descriptions: [
          "Completed intensive leadership course focusing on strategic decision-making and management.",
        ],
      },
      {
        title: "Financial Analysis",
        issuer: "Columbia Business School",
        date: "2016-08-01",
        descriptions: [
          "Received certificate for successfully completing financial analysis program.",
        ],
      },
    ],
  },
  settings: {
    awesomeCV: {
      accentColor: "text-[#00A388]",
      headerAlignment: "start",
    },
    ubagaCV: {
      textColor: "pink",
    },
    model: "awesome-cv",
  },
};

export default kendallRoyCV;
