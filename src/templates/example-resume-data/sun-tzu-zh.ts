import type { Resume } from '@/@types/resume'

export const sunTzuResume: Resume = {
	basics: {
		firstName: '孙',
		lastName: '武',
		phone: '+86-139-0013-9000',
		email: 'sun.wu@artofwar-consulting.cn',
		url: '',
		quote: '知己知彼，百战不殆。',
		summary: {
			label: '个人简介',
			content:
				'资深战略顾问，在战略规划、竞争分析和领导力发展方面拥有数十年经验。将古代军事智慧应用于现代商业挑战，帮助企业实现卓越运营和持续增长。',
		},
		profiles: [
			{
				id: 'LinkedIn',
				network: 'LinkedIn',
				username: 'sun.tzu.strategy',
				url: 'https://linkedin.com/in/sun.tzu.strategy',
			},
		],
	},
	work: {
		label: '工作经历',
		content: [
			{
				id: 'Chief Strategist',
				company: '兵法战略咨询集团',
				location: '北京市',
				position: '首席战略顾问',
				startDate: '2010-01-01',
				endDate: 'present',
				highlights: [
					{
						id: 'Strategic Advisory',
						value:
							'为财富500强企业提供高级战略咨询，专注于市场进入和竞争定位。',
					},
					{
						id: 'Leadership Development',
						value: '设计并实施高管领导力发展项目，提升组织效能。',
					},
					{
						id: 'Risk Management',
						value: '制定全面的风险管理框架，帮助企业应对不确定性。',
					},
				],
			},
			{
				id: 'Independent Consultant',
				company: '独立战略顾问',
				location: '上海市',
				position: '战略顾问',
				startDate: '2005-01-01',
				endDate: '2009-12-01',
				highlights: [
					{
						id: 'Business Strategy',
						value: '为初创企业和成长型公司提供商业战略和运营优化咨询。',
					},
					{
						id: 'Market Analysis',
						value: '进行深入的市场分析和竞争对手研究。',
					},
				],
			},
		],
	},
	honors: {
		label: '荣誉奖项',
		content: [
			{
				id: 'Awards',
				label: '获奖情况',
				honors: [
					{
						id: 'Strategic Thinker',
						year: '2021',
						position: '终身成就奖',
						honor: '全球战略思想家奖',
						location: '新加坡',
					},
					{
						id: 'Business Leadership',
						year: '2018',
						position: '杰出贡献',
						honor: '亚洲商业领袖奖',
						location: '香港',
					},
				],
			},
		],
	},
	presentations: {
		label: '学术报告',
		content: [
			{
				id: 'Global Strategy Summit',
				event: '全球战略峰会',
				role: '主旨演讲嘉宾',
				location: '达沃斯，瑞士',
				date: '2022-01-20',
				description: [
					{
						id: 'Modern Strategy',
						value: '《孙子兵法》在现代商业竞争中的应用。',
					},
				],
			},
		],
	},
	writings: {
		label: '学术著作',
		content: [
			{
				id: 'ArtOfWarModern',
				title: '《孙子兵法》现代解读与商业应用',
				role: '作者',
				medium: '中信出版社',
				startDate: '2015-01-01',
				endDate: '2015-12-01',
				description: [
					{
						id: 'BookDescription',
						value: '将《孙子兵法》的经典原则应用于现代企业管理和市场竞争。',
					},
				],
			},
			{
				id: 'StrategicLeadershipJournal',
				title: '论战略领导力与组织韧性',
				role: '特约撰稿人',
				medium: '《哈佛商业评论》中文版',
				startDate: '2019-06-01',
				endDate: '2019-06-01',
				description: [
					{
						id: 'ArticleDescription',
						value: '探讨如何在不确定环境中培养战略领导力。',
					},
				],
			},
		],
	},
	committees: {
		label: '委员会',
		content: [
			{
				id: 'StrategyCouncil',
				year: '2019',
				position: '荣誉顾问',
				organization: '国际战略管理协会',
				location: '纽约，美国',
			},
		],
	},
	education: {
		label: '教育背景',
		content: [
			{
				id: 'PhilosophyDoctorate',
				school: '北京大学',
				location: '北京市',
				degree: '哲学博士 (荣誉)',
				startDate: '2000-09-01',
				endDate: '2004-06-01',
				description: [
					{
						id: 'AncientPhilosophy',
						value: '专注于古代军事哲学与战略思想研究。',
					},
				],
			},
		],
	},
	extracurriculars: {
		label: '课外活动',
		content: [],
	},
	projects: {
		label: '项目经历',
		content: [],
	},
	languages: {
		label: '语言能力',
		content: [
			{
				id: 'Chinese',
				language: '中文',
				fluency: '母语',
			},
			{
				id: 'English',
				language: '英语',
				fluency: '流利',
			},
		],
	},
	certificates: {
		label: '专业证书',
		content: [
			{
				id: 'StrategicManagement',
				title: '认证战略管理专家 (CSMP)',
				issuer: '战略管理专业协会 (ASMP)',
				date: '2012-03-01',
				description: [
					{
						id: 'StrategyCert',
						value: '全球认可的战略管理专业认证。',
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
