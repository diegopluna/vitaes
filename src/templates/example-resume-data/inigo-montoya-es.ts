import type { Resume } from '@/@types/resume'

export const inigoMontoyaResume: Resume = {
	basics: {
		firstName: 'Íñigo',
		lastName: 'Montoya',
		phone: '+34-91-123-4567',
		email: 'inigo.montoya@esgrima.es',
		url: '',
		quote: 'La dedicación y la práctica perfeccionan cualquier arte.',
		summary: {
			label: 'Resumen',
			content:
				'Maestro de esgrima con más de 20 años de experiencia en la enseñanza y práctica de artes marciales históricas. Especializado en esgrima española y técnicas tradicionales de combate.',
		},
		profiles: [
			{
				id: 'Instagram',
				network: 'Instagram',
				username: 'maestro_inigo',
				url: 'https://instagram.com/maestro_inigo',
			},
		],
	},
	work: {
		label: 'Experiencia Laboral',
		content: [
			{
				id: 'Fencing Academy',
				company: 'Academia de Esgrima Montoya',
				location: 'Toledo, España',
				position: 'Director y Maestro Principal',
				startDate: '2015-01-01',
				endDate: 'present',
				highlights: [
					{
						id: 'Student Training',
						value: 'Formación de más de 200 estudiantes en esgrima histórica.',
					},
					{
						id: 'Competition Success',
						value: 'Preparación de campeones nacionales e internacionales.',
					},
					{
						id: 'Curriculum Development',
						value: 'Desarrollo de programas de estudio en esgrima española.',
					},
				],
			},
			{
				id: 'Film Consultant',
				company: 'Producciones Cinematográficas',
				location: 'Madrid, España',
				position: 'Consultor de Esgrima',
				startDate: '2010-01-01',
				endDate: '2015-01-01',
				highlights: [
					{
						id: 'Choreography',
						value: 'Coreografía de combates para películas de época.',
					},
					{
						id: 'Actor Training',
						value: 'Entrenamiento de actores en técnicas de esgrima.',
					},
				],
			},
		],
	},
	honors: {
		label: 'Reconocimientos',
		content: [
			{
				id: 'Awards',
				label: 'Premios',
				honors: [
					{
						id: 'National Championship',
						year: '2018',
						position: '1er Lugar',
						honor: 'Campeonato Nacional de Esgrima Histórica',
						location: 'Madrid, España',
					},
					{
						id: 'Teaching Excellence',
						year: '2020',
						position: 'Reconocimiento',
						honor: 'Premio a la Excelencia en Enseñanza',
						location: 'Toledo, España',
					},
				],
			},
		],
	},
	presentations: {
		label: 'Presentaciones',
		content: [
			{
				id: 'Historical Conference',
				event: 'Congreso de Artes Marciales Históricas',
				role: 'Ponente Principal',
				location: 'Sevilla, España',
				date: '2019-11-20',
				description: [
					{
						id: 'Spanish Techniques',
						value:
							'Presentación sobre técnicas tradicionales de esgrima española.',
					},
				],
			},
		],
	},
	writings: {
		label: 'Publicaciones',
		content: [],
	},
	committees: {
		label: 'Comités',
		content: [],
	},
	education: {
		label: 'Educación',
		content: [
			{
				id: 'Sports Science',
				school: 'Universidad de Castilla-La Mancha',
				location: 'Toledo, España',
				degree: 'Licenciatura en Ciencias del Deporte',
				startDate: '2005-09-01',
				endDate: '2009-06-01',
				description: [
					{
						id: 'Specialization',
						value: 'Especialización en deportes de combate históricos.',
					},
				],
			},
		],
	},
	extracurriculars: {
		label: 'Actividades Extracurriculares',
		content: [],
	},
	projects: {
		label: 'Proyectos',
		content: [],
	},
	languages: {
		label: 'Idiomas',
		content: [
			{
				id: 'Spanish',
				language: 'Español',
				fluency: 'Nativo',
			},
			{
				id: 'English',
				language: 'Inglés',
				fluency: 'Avanzado',
			},
			{
				id: 'Italian',
				language: 'Italiano',
				fluency: 'Intermedio',
			},
		],
	},
	certificates: {
		label: 'Certificados',
		content: [
			{
				id: 'Fencing Master',
				title: 'Maestro de Esgrima Certificado',
				issuer: 'Federación Española de Esgrima',
				date: '2010-05-01',
				description: [
					{
						id: 'Master Certification',
						value:
							'Certificación como maestro de esgrima deportiva e histórica.',
					},
				],
			},
			{
				id: 'Historical Combat',
				title: 'Instructor de Combate Histórico',
				issuer: 'Asociación Española de Esgrima Histórica',
				date: '2012-09-01',
				description: [
					{
						id: 'Historical Training',
						value:
							'Especialización en técnicas de combate medieval y renacentista.',
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
