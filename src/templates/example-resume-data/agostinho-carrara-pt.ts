import type { Resume } from '@/@types/resume'

export const agostinhoCarraraResume: Resume = {
	basics: {
		firstName: 'Agostinho',
		lastName: 'Carrara',
		phone: '+55-21-98765-4321',
		email: 'agostinho.carrara@contabilidade.com.br',
		url: '',
		quote: 'A organização é a base de qualquer negócio bem-sucedido.',
		summary: {
			label: 'Resumo',
			content:
				'Contador experiente com mais de 15 anos de atuação em contabilidade empresarial e consultoria fiscal. Especializado em pequenas e médias empresas, com foco em eficiência e conformidade tributária.',
		},
		profiles: [
			{
				id: 'LinkedIn',
				network: 'LinkedIn',
				username: 'agostinho.carrara',
				url: 'https://linkedin.com/in/agostinho.carrara',
			},
		],
	},
	work: {
		label: 'Experiência Profissional',
		content: [
			{
				id: 'Own Practice',
				company: 'Carrara Contabilidade Ltda.',
				location: 'Rio de Janeiro, RJ',
				position: 'Contador Responsável',
				startDate: '2010-01-01',
				endDate: 'present',
				highlights: [
					{
						id: 'Client Management',
						value:
							'Gestão contábil de mais de 50 empresas de pequeno e médio porte.',
					},
					{
						id: 'Tax Compliance',
						value:
							'Assessoria tributária e conformidade fiscal para diversos setores.',
					},
					{
						id: 'Financial Planning',
						value: 'Planejamento financeiro e consultoria empresarial.',
					},
				],
			},
			{
				id: 'Accounting Firm',
				company: 'Escritório de Contabilidade Santos & Associados',
				location: 'Rio de Janeiro, RJ',
				position: 'Contador Sênior',
				startDate: '2005-03-01',
				endDate: '2009-12-01',
				highlights: [
					{
						id: 'Corporate Accounting',
						value:
							'Contabilidade empresarial e elaboração de demonstrações financeiras.',
					},
					{
						id: 'Team Training',
						value: 'Treinamento de equipe em procedimentos contábeis.',
					},
				],
			},
		],
	},
	honors: {
		label: 'Reconhecimentos',
		content: [],
	},
	presentations: {
		label: 'Apresentações',
		content: [],
	},
	writings: {
		label: 'Publicações',
		content: [],
	},
	committees: {
		label: 'Comitês',
		content: [],
	},
	education: {
		label: 'Formação',
		content: [
			{
				id: 'Accounting Degree',
				school: 'Universidade Estácio de Sá',
				location: 'Rio de Janeiro, RJ',
				degree: 'Bacharelado em Ciências Contábeis',
				startDate: '2001-02-01',
				endDate: '2004-12-01',
				description: [
					{
						id: 'Accounting Focus',
						value: 'Formação em contabilidade geral e tributária.',
					},
				],
			},
		],
	},
	extracurriculars: {
		label: 'Atividades Extracurriculares',
		content: [
			{
				id: 'Community Volunteer',
				role: 'Voluntário',
				organization: 'Centro Comunitário do Bairro',
				location: 'Rio de Janeiro, RJ',
				startDate: '2015-01-01',
				endDate: 'present',
				description: [
					{
						id: 'Financial Education',
						value: 'Educação financeira para famílias de baixa renda.',
					},
				],
			},
		],
	},
	projects: {
		label: 'Projetos',
		content: [],
	},
	languages: {
		label: 'Idiomas',
		content: [
			{
				id: 'Portuguese',
				language: 'Português',
				fluency: 'Nativo',
			},
			{
				id: 'English',
				language: 'Inglês',
				fluency: 'Básico',
			},
		],
	},
	certificates: {
		label: 'Certificados',
		content: [
			{
				id: 'CRC',
				title: 'Registro no Conselho Regional de Contabilidade',
				issuer: 'CRC-RJ',
				date: '2005-01-15',
				description: [
					{
						id: 'Professional Registration',
						value: 'Habilitação profissional para exercer a contabilidade.',
					},
				],
			},
			{
				id: 'Tax Specialist',
				title: 'Especialização em Direito Tributário',
				issuer: 'Fundação Getúlio Vargas',
				date: '2012-08-01',
				description: [
					{
						id: 'Tax Specialization',
						value: 'Pós-graduação em legislação tributária brasileira.',
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
