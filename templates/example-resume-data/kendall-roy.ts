import type { Resume } from '@/@types/resume'

export const kendallRoyResume: Resume = {
  basics: {
    firstName: 'Kendall',
    lastName: 'Roy',
    phone: '123-456-7890',
    email: 'kendallroy@waystar.com',
    url: '',
    quote: "Success is not given, it's earned.",
    summary:
      'Experienced executive with a strong background in corporate management and strategic decision-making. Proven track record of leadership and innovation.',
    profiles: [
      {
        id: 'profile-linkedin-1a2b',
        network: 'LinkedIn',
        username: 'kendallroy',
        url: 'https://linkedin.com/in/kendallroy',
      },
      {
        id: 'profile-twitter-3c4d',
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
        id: 'work-waystar-ceo-5e6f',
        company: 'Waystar Royco',
        location: 'New York, NY',
        position: 'Co-CEO',
        startDate: '2018-01-01',
        endDate: 'present',
        highlights: [
          {
            id: 'hl-ceo-1-7g8h',
            value:
              'Continued to lead the company as Chief Executive Officer, driving further growth and innovation.',
          },
        ],
      },
      {
        id: 'work-waystar-coo-9i0j',
        company: 'Waystar Royco',
        location: 'New York, NY',
        position: 'COO',
        startDate: '2016-01-01',
        endDate: '2018-01-01',
        highlights: [
          {
            id: 'hl-coo-1-1k2l',
            value:
              'Led the company through a period of significant growth and expansion as Chief Operating Officer.',
          },
          {
            id: 'hl-coo-2-3m4n',
            value:
              'Implemented strategic initiatives to increase operational efficiency and streamline processes.',
          },
          {
            id: 'hl-coo-3-5o6p',
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
        id: 'honors-label-awards-5y6z',
        label: 'Awards',
        honors: [
          {
            id: 'honor-award-1-a1b2',
            year: '2017',
            position: '1st Place',
            honor: 'Business Innovation Award',
            location: 'New York, NY',
          },
          {
            id: 'honor-award-2-c3d4',
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
        id: 'edu-harvard-e5f6',
        school: 'Harvard Business School',
        location: 'Cambridge, MA',
        degree: 'MBA',
        startDate: '2015-09-01',
        endDate: '2017-05-01',
        description: [
          {
            id: 'edu-harvard-desc-1-g7h8',
            value: 'Focused on corporate strategy and leadership.',
          },
        ],
      },
      {
        id: 'edu-brown-i9j0',
        school: 'Brown University',
        location: 'Providence, RI',
        degree: 'Bachelor of Arts in Economics',
        startDate: '2009-09-01',
        endDate: '2013-05-01',
        description: [
          { id: 'edu-brown-desc-1-k1l2', value: 'Graduated magna cum laude.' },
          {
            id: 'edu-brown-desc-2-m3n4',
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
        id: 'cert-harvard-o5p6',
        title: 'Strategic Leadership',
        issuer: 'Harvard Business School',
        date: '2017-05-01',
        description: [
          {
            id: 'cert-harvard-desc-1-q7r8',
            value:
              'Completed intensive leadership course focusing on strategic decision-making and management.',
          },
        ],
      },
      {
        id: 'cert-columbia-s9t0',
        title: 'Financial Analysis',
        issuer: 'Columbia Business School',
        date: '2016-08-01',
        description: [
          {
            id: 'cert-columbia-desc-1-u1v2',
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
