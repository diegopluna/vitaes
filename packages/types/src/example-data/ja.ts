import type { IResume } from '../resume'

export const golDRogerNew: IResume = {
  config: {
    themeColor: 'awesome-emerald',
    headerAlign: 'left',
    sectionColorHighlight: true,
    fontSize: 9,
    pageSize: 'A4',
  },

  personalInfo: {
    firstName: 'ゴール・D・',
    lastName: 'ロジャー',
    position: '代表取締役社長',
    address: '東京都',
    quote: '夢を追い続けることが人生の宝だ。',
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+81-3-1234-5678',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'g.roger@maritime.co.jp',
      },
      {
        id: 'LinkedIn',
        platform: 'linkedin',
        value: 'gol.d.roger',
        url: 'https://linkedin.com/in/gol.d.roger',
        display: 'LinkedIn',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: '概要',
      type: 'text',
      content:
        '海運業界のリーダーとして20年以上の経験を持つ。国際物流と船舶管理のエキスパートで、革新的な航路開発と効率的な運営で業界をリードしている。',
    },

    {
      id: 'experience',
      title: '職歴',
      type: 'timeline',
      entries: [
        {
          id: 'Maritime CEO',
          position: '代表取締役社長',
          title: '株式会社グランドライン海運',
          location: '東京都',
          date: '2015-04-01 — present',
          items: [
            '新航路開発により会社の売上を300%向上させた。',
            '1000名を超える船員と陸上スタッフを統括。',
            '最新技術を活用した効率的な物流システムを構築。',
          ],
        },
        {
          id: 'Ship Captain',
          position: '船長',
          title: '日本郵船株式会社',
          location: '横浜市',
          date: '2005-04-01 — 2015-03-31',
          items: [
            '10年間無事故で国際航路を運航。',
            '多国籍クルーの効果的な管理とチームワーク向上。',
          ],
        },
      ],
    },

    {
      id: 'honors',
      title: '表彰',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'Awards',
            title: '受賞歴',
            items: [
              {
                id: 'Maritime Excellence',
                date: '2020',
                position: '最優秀賞',
                title: '海運業界功労賞',
                location: '東京都',
              },
              {
                id: 'Innovation Award',
                date: '2018',
                position: '革新賞',
                title: '物流イノベーション大賞',
                location: '大阪府',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'presentations',
      title: '発表',
      type: 'timeline',
      entries: [
        {
          id: 'Maritime Conference',
          position: '基調講演者',
          title: '国際海運会議',
          location: '横浜市',
          date: '2021-09-15',
          items: ['海運業界の未来と持続可能な発展について講演。'],
        },
      ],
    },

    {
      id: 'committees',
      title: '委員会',
      type: 'timeline',
      entries: [
        {
          id: 'Maritime Board',
          position: '理事',
          title: '日本海運協会',
          location: '東京都',
          date: '2019',
          items: [],
        },
      ],
    },

    {
      id: 'education',
      title: '学歴',
      type: 'timeline',
      entries: [
        {
          id: 'Maritime University',
          position: '海洋工学部航海学科',
          title: '東京海洋大学',
          location: '東京都',
          date: '2001-04-01 — 2005-03-31',
          items: ['航海学と海洋工学を専攻。', '一級海技士（航海）免許取得。'],
        },
      ],
    },

    {
      id: 'extracurriculars',
      title: '課外活動',
      type: 'timeline',
      entries: [
        {
          id: 'Youth Sailing',
          position: 'ボランティア指導員',
          title: '青少年セーリング協会',
          location: '神奈川県',
          date: '2010-01-01 — present',
          items: ['若い世代への航海技術指導とメンタリング。'],
        },
      ],
    },

    {
      id: 'languages',
      title: '言語',
      type: 'taxonomy',
      categories: [
        {
          id: 'Japanese',
          type: '日本語',
          items: ['母語'],
        },
        {
          id: 'English',
          type: '英語',
          items: ['流暢'],
        },
        {
          id: 'Chinese',
          type: '中国語',
          items: ['中級'],
        },
      ],
    },

    {
      id: 'certificates',
      title: '資格',
      type: 'timeline',
      entries: [
        {
          id: 'Captain License',
          position: '一級海技士（航海）',
          title: '一級海技士（航海）',
          location: '国土交通省',
          date: '2005-03-01',
          items: ['大型船舶の船長資格。'],
        },
        {
          id: 'Maritime Management',
          position: '海運経営管理士',
          title: '海運経営管理士',
          location: '日本海運協会',
          date: '2015-06-01',
          items: ['海運業界の経営管理に関する専門資格。'],
        },
      ],
    },
  ],
}
