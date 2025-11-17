import type { IResume } from '../resume'

export const sunTzuNew: IResume = {
  config: {
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
    firstName: '孙',
    lastName: '武',
    position: '首席战略顾问',
    address: '北京市',
    quote: '知己知彼，百战不殆。',
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+86-139-0013-9000',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'sun.wu@artofwar-consulting.cn',
      },
      {
        id: 'LinkedIn',
        platform: 'linkedin',
        value: 'sun.tzu.strategy',
        url: 'https://linkedin.com/in/sun.tzu.strategy',
        display: 'LinkedIn',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: '个人简介',
      type: 'text',
      content:
        '资深战略顾问，在战略规划、竞争分析和领导力发展方面拥有数十年经验。将古代军事智慧应用于现代商业挑战，帮助企业实现卓越运营和持续增长。',
    },

    {
      id: 'experience',
      title: '工作经历',
      type: 'timeline',
      entries: [
        {
          id: 'Chief Strategist',
          position: '首席战略顾问',
          title: '兵法战略咨询集团',
          location: '北京市',
          date: '2010-01-01 — present',
          items: [
            '为财富500强企业提供高级战略咨询，专注于市场进入和竞争定位。',
            '设计并实施高管领导力发展项目，提升组织效能。',
            '制定全面的风险管理框架，帮助企业应对不确定性。',
          ],
        },
        {
          id: 'Independent Consultant',
          position: '战略顾问',
          title: '独立战略顾问',
          location: '上海市',
          date: '2005-01-01 — 2009-12-01',
          items: [
            '为初创企业和成长型公司提供商业战略和运营优化咨询。',
            '进行深入的市场分析和竞争对手研究。',
          ],
        },
      ],
    },

    {
      id: 'honors',
      title: '荣誉奖项',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'Awards',
            title: '获奖情况',
            items: [
              {
                id: 'Strategic Thinker',
                date: '2021',
                position: '终身成就奖',
                title: '全球战略思想家奖',
                location: '新加坡',
              },
              {
                id: 'Business Leadership',
                date: '2018',
                position: '杰出贡献',
                title: '亚洲商业领袖奖',
                location: '香港',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'presentations',
      title: '学术报告',
      type: 'timeline',
      entries: [
        {
          id: 'Global Strategy Summit',
          position: '主旨演讲嘉宾',
          title: '全球战略峰会',
          location: '达沃斯，瑞士',
          date: '2022-01-20',
          items: ['《孙子兵法》在现代商业竞争中的应用。'],
        },
      ],
    },

    {
      id: 'writings',
      title: '学术著作',
      type: 'timeline',
      entries: [
        {
          id: 'ArtOfWarModern',
          position: '作者',
          title: '《孙子兵法》现代解读与商业应用',
          location: '中信出版社',
          date: '2015-01-01 — 2015-12-01',
          items: ['将《孙子兵法》的经典原则应用于现代企业管理和市场竞争。'],
        },
        {
          id: 'StrategicLeadershipJournal',
          position: '特约撰稿人',
          title: '论战略领导力与组织韧性',
          location: '《哈佛商业评论》中文版',
          date: '2019-06-01 — 2019-06-01',
          items: ['探讨如何在不确定环境中培养战略领导力。'],
        },
      ],
    },

    {
      id: 'committees',
      title: '委员会',
      type: 'timeline',
      entries: [
        {
          id: 'StrategyCouncil',
          position: '荣誉顾问',
          title: '国际战略管理协会',
          location: '纽约，美国',
          date: '2019',
          items: [],
        },
      ],
    },

    {
      id: 'education',
      title: '教育背景',
      type: 'timeline',
      entries: [
        {
          id: 'PhilosophyDoctorate',
          position: '哲学博士 (荣誉)',
          title: '北京大学',
          location: '北京市',
          date: '2000-09-01 — 2004-06-01',
          items: ['专注于古代军事哲学与战略思想研究。'],
        },
      ],
    },

    {
      id: 'languages',
      title: '语言能力',
      type: 'taxonomy',
      categories: [
        {
          id: 'Chinese',
          type: '中文',
          items: ['母语'],
        },
        {
          id: 'English',
          type: '英语',
          items: ['流利'],
        },
      ],
    },

    {
      id: 'certificates',
      title: '专业证书',
      type: 'timeline',
      entries: [
        {
          id: 'StrategicManagement',
          position: '认证战略管理专家 (CSMP)',
          title: '认证战略管理专家 (CSMP)',
          location: '战略管理专业协会 (ASMP)',
          date: '2012-03-01',
          items: ['全球认可的战略管理专业认证。'],
        },
      ],
    },
  ],
}
