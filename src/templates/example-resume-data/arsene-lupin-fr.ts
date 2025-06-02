import type { Resume } from '@/@types/resume'

export const arseneLupinResume: Resume = {
	basics: {
		firstName: 'Arsène',
		lastName: 'Lupin',
		phone: '+33-1-42-34-56-78',
		email: 'a.lupin@consultant-securite.fr',
		url: '',
		quote: "L'élégance et la précision sont les clés du succès.",
		summary: {
			label: 'Résumé',
			content:
				"Consultant en sécurité de haut niveau avec une expertise exceptionnelle en évaluation des vulnérabilités et protection d'objets de valeur. Spécialisé dans les systèmes de sécurité sophistiqués et l'art de l'acquisition stratégique.",
		},
		profiles: [
			{
				id: 'LinkedIn',
				network: 'LinkedIn',
				username: 'arsene.lupin',
				url: 'https://linkedin.com/in/arsene.lupin',
			},
		],
	},
	work: {
		label: 'Expérience Professionnelle',
		content: [
			{
				id: 'Security Consultant',
				company: 'Lupin Consulting Sécurité',
				location: 'Paris, France',
				position: 'Consultant Principal en Sécurité',
				startDate: '2018-01-01',
				endDate: 'present',
				highlights: [
					{
						id: 'Security Assessments',
						value:
							'Évaluation de sécurité pour musées prestigieux et collections privées.',
					},
					{
						id: 'System Design',
						value:
							'Conception de systèmes de sécurité sur mesure pour clients fortunés.',
					},
					{
						id: 'Risk Analysis',
						value: 'Analyse de risques et recommandations stratégiques.',
					},
				],
			},
			{
				id: 'Art Consultant',
				company: 'Galeries Nationales du Grand Palais',
				location: 'Paris, France',
				position: 'Consultant en Sécurité Artistique',
				startDate: '2015-01-01',
				endDate: '2018-01-01',
				highlights: [
					{
						id: 'Art Security',
						value:
							"Protection et sécurisation d'œuvres d'art de grande valeur.",
					},
					{
						id: 'Authentication',
						value: "Expertise en authentification d'objets d'art anciens.",
					},
				],
			},
		],
	},
	honors: {
		label: 'Distinctions',
		content: [
			{
				id: 'Awards',
				label: 'Prix',
				honors: [
					{
						id: 'Security Innovation',
						year: '2020',
						position: '1ère Place',
						honor: "Prix de l'Innovation en Sécurité",
						location: 'Paris, France',
					},
				],
			},
		],
	},
	presentations: {
		label: 'Présentations',
		content: [
			{
				id: 'Security Conference',
				event: 'Conférence Européenne de Sécurité',
				role: 'Conférencier',
				location: 'Monaco',
				date: '2021-05-20',
				description: [
					{
						id: 'Luxury Security',
						value:
							"Présentation sur la sécurité des biens de luxe et objets d'art.",
					},
				],
			},
		],
	},
	writings: {
		label: 'Publications',
		content: [],
	},
	committees: {
		label: 'Comités',
		content: [],
	},
	education: {
		label: 'Formation',
		content: [
			{
				id: 'Sorbonne Art History',
				school: 'Université de la Sorbonne',
				location: 'Paris, France',
				degree: "Master en Histoire de l'Art",
				startDate: '2012-09-01',
				endDate: '2014-06-01',
				description: [
					{
						id: 'Art Specialization',
						value: 'Spécialisation en art français du 19ème siècle.',
					},
				],
			},
			{
				id: 'Sciences Po',
				school: 'Sciences Po Paris',
				location: 'Paris, France',
				degree: 'Licence en Sciences Politiques',
				startDate: '2009-09-01',
				endDate: '2012-06-01',
				description: [
					{
						id: 'International Relations',
						value: 'Focus sur les relations internationales et la diplomatie.',
					},
				],
			},
		],
	},
	extracurriculars: {
		label: 'Activités Extrascolaires',
		content: [],
	},
	projects: {
		label: 'Projets',
		content: [],
	},
	languages: {
		label: 'Langues',
		content: [
			{
				id: 'French',
				language: 'Français',
				fluency: 'Langue maternelle',
			},
			{
				id: 'English',
				language: 'Anglais',
				fluency: 'Courant',
			},
			{
				id: 'Italian',
				language: 'Italien',
				fluency: 'Avancé',
			},
			{
				id: 'Spanish',
				language: 'Espagnol',
				fluency: 'Intermédiaire',
			},
		],
	},
	certificates: {
		label: 'Certifications',
		content: [
			{
				id: 'Security Management',
				title: 'Gestion de la Sécurité Avancée',
				issuer: 'Institut National de Sécurité',
				date: '2017-03-01',
				description: [
					{
						id: 'Security Certification',
						value:
							'Certification en gestion de sécurité pour institutions culturelles.',
					},
				],
			},
			{
				id: 'Art Expertise',
				title: "Expertise en Objets d'Art",
				issuer: 'Chambre Nationale des Experts',
				date: '2016-11-01',
				description: [
					{
						id: 'Art Authentication',
						value: "Qualification pour l'authentification d'œuvres d'art.",
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
