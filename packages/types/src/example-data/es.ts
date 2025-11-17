import type { IResume } from '../resume'

export const inigoMontoyaNew: IResume = {
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
    firstName: 'Íñigo',
    lastName: 'Montoya',
    position: 'Maestro de Esgrima',
    address: 'Toledo, España',
    quote: 'La dedicación y la práctica perfeccionan cualquier arte.',
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+34-91-123-4567',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'inigo.montoya@esgrima.es',
      },
      {
        id: 'instagram',
        platform: 'homepage',
        value: 'maestro_inigo',
        url: 'https://instagram.com/maestro_inigo',
        display: 'Instagram',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: 'Resumen',
      type: 'text',
      content:
        'Maestro de esgrima con más de 20 años de experiencia en la enseñanza y práctica de artes marciales históricas. Especializado en esgrima española y técnicas tradicionales de combate.',
    },

    {
      id: 'experience',
      title: 'Experiencia Laboral',
      type: 'timeline',
      entries: [
        {
          id: 'fencing-academy',
          position: 'Director y Maestro Principal',
          title: 'Academia de Esgrima Montoya',
          location: 'Toledo, España',
          date: '2015-01-01 — present',
          items: [
            'Formación de más de 200 estudiantes en esgrima histórica.',
            'Preparación de campeones nacionales e internacionales.',
            'Desarrollo de programas de estudio en esgrima española.',
          ],
        },
        {
          id: 'film-consultant',
          position: 'Consultor de Esgrima',
          title: 'Producciones Cinematográficas',
          location: 'Madrid, España',
          date: '2010-01-01 — 2015-01-01',
          items: [
            'Coreografía de combates para películas de época.',
            'Entrenamiento de actores en técnicas de esgrima.',
          ],
        },
      ],
    },

    {
      id: 'honors',
      title: 'Reconocimientos',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'awards',
            title: 'Premios',
            items: [
              {
                id: 'national-championship',
                date: '2018',
                position: '1er Lugar',
                title: 'Campeonato Nacional de Esgrima Histórica',
                location: 'Madrid, España',
              },
              {
                id: 'teaching-excellence',
                date: '2020',
                position: 'Reconocimiento',
                title: 'Premio a la Excelencia en Enseñanza',
                location: 'Toledo, España',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'presentations',
      title: 'Presentaciones',
      type: 'timeline',
      entries: [
        {
          id: 'historical-conference',
          position: 'Ponente Principal',
          title: 'Congreso de Artes Marciales Históricas',
          location: 'Sevilla, España',
          date: '2019-11-20',
          items: [
            'Presentación sobre técnicas tradicionales de esgrima española.',
          ],
        },
      ],
    },

    {
      id: 'education',
      title: 'Educación',
      type: 'timeline',
      entries: [
        {
          id: 'sports-science',
          position: 'Licenciatura en Ciencias del Deporte',
          title: 'Universidad de Castilla-La Mancha',
          location: 'Toledo, España',
          date: '2005-09-01 — 2009-06-01',
          items: ['Especialización en deportes de combate históricos.'],
        },
      ],
    },

    {
      id: 'languages',
      title: 'Idiomas',
      type: 'taxonomy',
      categories: [
        {
          id: 'spanish',
          type: 'Español',
          items: ['Nativo'],
        },
        {
          id: 'english',
          type: 'Inglés',
          items: ['Avanzado'],
        },
        {
          id: 'italian',
          type: 'Italiano',
          items: ['Intermedio'],
        },
      ],
    },

    {
      id: 'certificates',
      title: 'Certificados',
      type: 'timeline',
      entries: [
        {
          id: 'fencing-master',
          position: 'Maestro Certificado',
          title: 'Maestro de Esgrima Certificado',
          location: 'Federación Española de Esgrima',
          date: '2010-05-01',
          items: [
            'Certificación como maestro de esgrima deportiva e histórica.',
          ],
        },
        {
          id: 'historical-combat',
          position: 'Instructor',
          title: 'Instructor de Combate Histórico',
          location: 'Asociación Española de Esgrima Histórica',
          date: '2012-09-01',
          items: [
            'Especialización en técnicas de combate medieval y renacentista.',
          ],
        },
      ],
    },
  ],
}
