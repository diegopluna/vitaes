import type { Resume } from '@/@types/resume'

export const kendallRoyResume: Resume = {
  basics: {
    firstName: 'Kendall',
    lastName: 'Roy',
    phone: '123-456-7890',
    email: 'kendallroy@waystar.com',
    url: '',
    quote: "Success is not given, it's earned.",
    summary: {
      label: 'Summary',
      content:
        'Experienced executive with a strong background in corporate management and strategic decision-making. Proven track record of leadership and innovation.',
    },
    profiles: [
      {
        id: 'LinkedIn',
        network: 'LinkedIn',
        username: 'kendallroy',
        url: 'https://linkedin.com/in/kendallroy',
      },
      {
        id: 'Twitter',
        network: 'Twitter',
        username: 'kendallroy',
        url: 'https://twitter.com/kendallroy',
      },
    ],
  },
  work: {
    label: 'Work Experience',
    content: [
      {
        id: 'Waystar CEO',
        company: 'Waystar Royco',
        location: 'New York, NY',
        position: 'Co-CEO',
        startDate: '2018-01-01',
        endDate: 'present',
        highlights: [
          {
            id: 'Led as CEO',
            value:
              'Continued to lead the company as Chief Executive Officer, driving further growth and innovation.',
          },
        ],
      },
      {
        id: 'Waystar COO',
        company: 'Waystar Royco',
        location: 'New York, NY',
        position: 'COO',
        startDate: '2016-01-01',
        endDate: '2018-01-01',
        highlights: [
          {
            id: 'Growth Leadership',
            value:
              'Led the company through a period of significant growth and expansion as Chief Operating Officer.',
          },
          {
            id: 'Operational Efficiency',
            value:
              'Implemented strategic initiatives to increase operational efficiency and streamline processes.',
          },
          {
            id: 'Business Negotiation',
            value:
              'Played a key role in negotiating major business deals and partnerships.',
          },
        ],
      },
    ],
  },
  honors: {
    label: 'Honors',
    content: [
      {
        id: 'Awards',
        label: 'Awards',
        honors: [
          {
            id: 'Business Innovation Award',
            year: '2017',
            position: '1st Place',
            honor: 'Business Innovation Award',
            location: 'New York, NY',
          },
          {
            id: 'Business Leaders of the Year',
            year: '2018',
            position: 'Top 10',
            honor: 'Business Leaders of the Year',
            location: 'New York, NY',
          },
        ],
      },
    ],
  },
  presentations: {
    label: 'Presentations',
    content: [],
  },
  writings: {
    label: 'Writings',
    content: [],
  },
  committees: {
    label: 'Committees',
    content: [],
  },
  education: {
    label: 'Education',
    content: [
      {
        id: 'Harvard MBA',
        school: 'Harvard Business School',
        location: 'Cambridge, MA',
        degree: 'MBA',
        startDate: '2015-09-01',
        endDate: '2017-05-01',
        description: [
          {
            id: 'Corporate Strategy and Leadership',
            value: 'Focused on corporate strategy and leadership.',
          },
        ],
      },
      {
        id: 'Brown Economics',
        school: 'Brown University',
        location: 'Providence, RI',
        degree: 'Bachelor of Arts in Economics',
        startDate: '2009-09-01',
        endDate: '2013-05-01',
        description: [
          { id: 'Magna Cum Laude', value: 'Graduated magna cum laude.' },
          {
            id: 'Economics Club',
            value: 'Member of the Economics Club.',
          },
        ],
      },
    ],
  },
  extracurriculars: {
    label: 'Extracurriculars',
    content: [],
  },
  projects: {
    label: 'Projects',
    content: [],
  },
  languages: {
    label: 'Languages',
    content: [],
  },
  certificates: {
    label: 'Certificates',
    content: [
      {
        id: 'Strategic Leadership',
        title: 'Strategic Leadership',
        issuer: 'Harvard Business School',
        date: '2017-05-01',
        description: [
          {
            id: 'Leadership Course',
            value:
              'Completed intensive leadership course focusing on strategic decision-making and management.',
          },
        ],
      },
      {
        id: 'Financial Analysis',
        title: 'Financial Analysis',
        issuer: 'Columbia Business School',
        date: '2016-08-01',
        description: [
          {
            id: 'Financial Analysis Program',
            value:
              'Received certificate for successfully completing financial analysis program.',
          },
        ],
      },
    ],
  },
  settings: {
    model: 'awesome-cv',
    awesomeCV: {
      accentColor: 'text-[#00A388]',
      headerAlignment: 'start',
    },
    ubagaCV: {
      textColor: 'pink',
    },
  },
}
