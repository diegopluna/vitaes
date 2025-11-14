import type { IResume } from '../resume'

export const arseneLupinNew: IResume = {
  config: {
    themeColor: 'awesome-emerald',
    headerAlign: 'left',
    sectionColorHighlight: true,
    fontSize: 9,
    pageSize: 'A4',
  },

  personalInfo: {
    firstName: 'Arsène',
    lastName: 'Lupin',
    position: 'Consultant Principal en Sécurité',
    address: 'Paris, France',
    quote: "L'élégance et la précision sont les clés du succès.",
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+33-1-42-34-56-78',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'a.lupin@consultant-securite.fr',
      },
      {
        id: 'LinkedIn',
        platform: 'linkedin',
        value: 'arsene.lupin',
        url: 'https://linkedin.com/in/arsene.lupin',
        display: 'LinkedIn',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: 'Résumé',
      type: 'text',
      content:
        "Consultant en sécurité de haut niveau avec une expertise exceptionnelle en évaluation des vulnérabilités et protection d'objets de valeur. Spécialisé dans les systèmes de sécurité sophistiqués et l'art de l'acquisition stratégique.",
    },

    {
      id: 'experience',
      title: 'Expérience Professionnelle',
      type: 'timeline',
      entries: [
        {
          id: 'Security Consultant',
          position: 'Consultant Principal en Sécurité',
          title: 'Lupin Consulting Sécurité',
          location: 'Paris, France',
          date: '2018-01-01 — present',
          items: [
            'Évaluation de sécurité pour musées prestigieux et collections privées.',
            'Conception de systèmes de sécurité sur mesure pour clients fortunés.',
            'Analyse de risques et recommandations stratégiques.',
          ],
        },
        {
          id: 'Art Consultant',
          position: 'Consultant en Sécurité Artistique',
          title: 'Galeries Nationales du Grand Palais',
          location: 'Paris, France',
          date: '2015-01-01 — 2018-01-01',
          items: [
            "Protection et sécurisation d'œuvres d'art de grande valeur.",
            "Expertise en authentification d'objets d'art anciens.",
          ],
        },
      ],
    },

    {
      id: 'honors',
      title: 'Distinctions',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'Awards',
            title: 'Prix',
            items: [
              {
                id: 'Security Innovation',
                date: '2020',
                position: '1ère Place',
                title: "Prix de l'Innovation en Sécurité",
                location: 'Paris, France',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'presentations',
      title: 'Présentations',
      type: 'timeline',
      entries: [
        {
          id: 'Security Conference',
          position: 'Conférencier',
          title: 'Conférence Européenne de Sécurité',
          location: 'Monaco',
          date: '2021-05-20',
          items: [
            "Présentation sur la sécurité des biens de luxe et objets d'art.",
          ],
        },
      ],
    },

    {
      id: 'education',
      title: 'Formation',
      type: 'timeline',
      entries: [
        {
          id: 'Sorbonne Art History',
          position: "Master en Histoire de l'Art",
          title: 'Université de la Sorbonne',
          location: 'Paris, France',
          date: '2012-09-01 — 2014-06-01',
          items: ['Spécialisation en art français du 19ème siècle.'],
        },
        {
          id: 'Sciences Po',
          position: 'Licence en Sciences Politiques',
          title: 'Sciences Po Paris',
          location: 'Paris, France',
          date: '2009-09-01 — 2012-06-01',
          items: ['Focus sur les relations internationales et la diplomatie.'],
        },
      ],
    },

    {
      id: 'languages',
      title: 'Langues',
      type: 'taxonomy',
      categories: [
        {
          id: 'French',
          type: 'Français',
          items: ['Langue maternelle'],
        },
        {
          id: 'English',
          type: 'Anglais',
          items: ['Courant'],
        },
        {
          id: 'Italian',
          type: 'Italien',
          items: ['Avancé'],
        },
        {
          id: 'Spanish',
          type: 'Espagnol',
          items: ['Intermédiaire'],
        },
      ],
    },

    {
      id: 'certificates',
      title: 'Certifications',
      type: 'timeline',
      entries: [
        {
          id: 'Security Management',
          position: 'Gestion de la Sécurité Avancée',
          title: 'Gestion de la Sécurité Avancée',
          location: 'Institut National de Sécurité',
          date: '2017-03-01',
          items: [
            'Certification en gestion de sécurité pour institutions culturelles.',
          ],
        },
        {
          id: 'Art Expertise',
          position: "Expertise en Objets d'Art",
          title: "Expertise en Objets d'Art",
          location: 'Chambre Nationale des Experts',
          date: '2016-11-01',
          items: ["Qualification pour l'authentification d'œuvres d'art."],
        },
      ],
    },
  ],
}
