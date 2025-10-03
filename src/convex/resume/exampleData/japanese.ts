import type { Resume } from '../type'

export const golDRogerResume: Resume = {
  basics: {
    firstName: 'ゴール・D・',
    lastName: 'ロジャー',
    phone: '+81-3-1234-5678',
    email: 'g.roger@maritime.co.jp',
    url: '',
    quote: '夢を追い続けることが人生の宝だ。',
    summary: {
      label: '概要',
      content:
        '海運業界のリーダーとして20年以上の経験を持つ。国際物流と船舶管理のエキスパートで、革新的な航路開発と効率的な運営で業界をリードしている。',
    },
    profiles: [
      {
        id: 'LinkedIn',
        network: 'LinkedIn',
        username: 'gol.d.roger',
        url: 'https://linkedin.com/in/gol.d.roger',
      },
    ],
  },
  work: {
    label: '職歴',
    content: [
      {
        id: 'Maritime CEO',
        company: '株式会社グランドライン海運',
        location: '東京都',
        position: '代表取締役社長',
        startDate: '2015-04-01',
        endDate: 'present',
        highlights: [
          {
            id: 'Route Development',
            value: '新航路開発により会社の売上を300%向上させた。',
          },
          {
            id: 'Team Leadership',
            value: '1000名を超える船員と陸上スタッフを統括。',
          },
          {
            id: 'Innovation',
            value: '最新技術を活用した効率的な物流システムを構築。',
          },
        ],
      },
      {
        id: 'Ship Captain',
        company: '日本郵船株式会社',
        location: '横浜市',
        position: '船長',
        startDate: '2005-04-01',
        endDate: '2015-03-31',
        highlights: [
          {
            id: 'Navigation Excellence',
            value: '10年間無事故で国際航路を運航。',
          },
          {
            id: 'Crew Management',
            value: '多国籍クルーの効果的な管理とチームワーク向上。',
          },
        ],
      },
    ],
  },
  honors: {
    label: '表彰',
    content: [
      {
        id: 'Awards',
        label: '受賞歴',
        honors: [
          {
            id: 'Maritime Excellence',
            year: '2020',
            position: '最優秀賞',
            honor: '海運業界功労賞',
            location: '東京都',
          },
          {
            id: 'Innovation Award',
            year: '2018',
            position: '革新賞',
            honor: '物流イノベーション大賞',
            location: '大阪府',
          },
        ],
      },
    ],
  },
  presentations: {
    label: '発表',
    content: [
      {
        id: 'Maritime Conference',
        event: '国際海運会議',
        role: '基調講演者',
        location: '横浜市',
        date: '2021-09-15',
        description: [
          {
            id: 'Future of Shipping',
            value: '海運業界の未来と持続可能な発展について講演。',
          },
        ],
      },
    ],
  },
  writings: {
    label: '著作',
    content: [],
  },
  committees: {
    label: '委員会',
    content: [
      {
        id: 'Maritime Board',
        year: '2019',
        position: '理事',
        organization: '日本海運協会',
        location: '東京都',
      },
    ],
  },
  education: {
    label: '学歴',
    content: [
      {
        id: 'Maritime University',
        school: '東京海洋大学',
        location: '東京都',
        degree: '海洋工学部航海学科',
        startDate: '2001-04-01',
        endDate: '2005-03-31',
        description: [
          {
            id: 'Navigation Studies',
            value: '航海学と海洋工学を専攻。',
          },
          {
            id: 'Captain License',
            value: '一級海技士（航海）免許取得。',
          },
        ],
      },
    ],
  },
  extracurriculars: {
    label: '課外活動',
    content: [
      {
        id: 'Youth Sailing',
        role: 'ボランティア指導員',
        organization: '青少年セーリング協会',
        location: '神奈川県',
        startDate: '2010-01-01',
        endDate: 'present',
        description: [
          {
            id: 'Youth Training',
            value: '若い世代への航海技術指導とメンタリング。',
          },
        ],
      },
    ],
  },
  projects: {
    label: 'プロジェクト',
    content: [],
  },
  languages: {
    label: '言語',
    content: [
      {
        id: 'Japanese',
        language: '日本語',
        fluency: '母語',
      },
      {
        id: 'English',
        language: '英語',
        fluency: '流暢',
      },
      {
        id: 'Chinese',
        language: '中国語',
        fluency: '中級',
      },
    ],
  },
  certificates: {
    label: '資格',
    content: [
      {
        id: 'Captain License',
        title: '一級海技士（航海）',
        issuer: '国土交通省',
        date: '2005-03-01',
        description: [
          {
            id: 'Navigation License',
            value: '大型船舶の船長資格。',
          },
        ],
      },
      {
        id: 'Maritime Management',
        title: '海運経営管理士',
        issuer: '日本海運協会',
        date: '2015-06-01',
        description: [
          {
            id: 'Management Certification',
            value: '海運業界の経営管理に関する専門資格。',
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
  },
}
