import type { IResume } from '../resume'

export const kendallRoyNew: IResume = {
  config: {
    template: 'awesome',
    themeColor: 'awesome-emerald',
    headerAlign: 'left',
    sectionColorHighlight: true,
    fontSize: 9,
    pageSize: 'A4',
    footerLeft: {
      text: '',
      showPageNumber: false,
    },
    footerCenter: {
      text: '',
      showPageNumber: false,
    },
    footerRight: {
      text: '',
      showPageNumber: true,
    },
  },

  personalInfo: {
    firstName: 'Kendall',
    lastName: 'Roy',
    position: 'Co-CEO',
    address: 'New York, NY',
    quote: "Success is not given, it's earned.",
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '123-456-7890',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'kendallroy@waystar.com',
      },
      {
        id: 'LinkedIn',
        platform: 'linkedin',
        value: 'kendallroy',
        url: 'https://linkedin.com/in/kendallroy',
        display: 'LinkedIn',
      },
      {
        id: 'Twitter',
        platform: 'twitter',
        value: 'kendallroy',
        url: 'https://twitter.com/kendallroy',
        display: 'Twitter',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: 'Summary',
      type: 'text',
      content:
        'Experienced executive with a strong background in corporate management and strategic decision-making. Proven track record of leadership and innovation.',
    },

    {
      id: 'experience',
      title: 'Work Experience',
      type: 'timeline',
      entries: [
        {
          id: 'Waystar CEO',
          position: 'Co-CEO',
          title: 'Waystar Royco',
          location: 'New York, NY',
          date: '2018-01-01 — present',
          items: [
            'Continued to lead the company as Chief Executive Officer, driving further growth and innovation.',
          ],
        },
        {
          id: 'Waystar COO',
          position: 'COO',
          title: 'Waystar Royco',
          location: 'New York, NY',
          date: '2016-01-01 — 2018-01-01',
          items: [
            'Led the company through a period of significant growth and expansion as Chief Operating Officer.',
            'Implemented strategic initiatives to increase operational efficiency and streamline processes.',
            'Played a key role in negotiating major business deals and partnerships.',
          ],
        },
      ],
    },

    {
      id: 'honors',
      title: 'Honors',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'Awards',
            title: 'Awards',
            items: [
              {
                id: 'Business Innovation Award',
                date: '2017',
                position: '1st Place',
                title: 'Business Innovation Award',
                location: 'New York, NY',
              },
              {
                id: 'Business Leaders of the Year',
                date: '2018',
                position: 'Top 10',
                title: 'Business Leaders of the Year',
                location: 'New York, NY',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'education',
      title: 'Education',
      type: 'timeline',
      entries: [
        {
          id: 'Harvard MBA',
          position: 'MBA',
          title: 'Harvard Business School',
          location: 'Cambridge, MA',
          date: '2015-09-01 — 2017-05-01',
          items: ['Focused on corporate strategy and leadership.'],
        },
        {
          id: 'Brown Economics',
          position: 'Bachelor of Arts in Economics',
          title: 'Brown University',
          location: 'Providence, RI',
          date: '2009-09-01 — 2013-05-01',
          items: [
            'Graduated magna cum laude.',
            'Member of the Economics Club.',
          ],
        },
      ],
    },

    {
      id: 'certificates',
      title: 'Certificates',
      type: 'timeline',
      entries: [
        {
          id: 'Strategic Leadership',
          position: 'Strategic Leadership',
          title: 'Strategic Leadership',
          location: 'Harvard Business School',
          date: '2017-05-01',
          items: [
            'Completed intensive leadership course focusing on strategic decision-making and management.',
          ],
        },
        {
          id: 'Financial Analysis',
          position: 'Financial Analysis',
          title: 'Financial Analysis',
          location: 'Columbia Business School',
          date: '2016-08-01',
          items: [
            'Received certificate for successfully completing financial analysis program.',
          ],
        },
      ],
    },
  ],
}
