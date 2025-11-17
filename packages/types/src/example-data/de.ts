import type { IResume } from '../resume'

export const kingSchultzNew: IResume = {
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
    firstName: 'Dr. King',
    lastName: 'Schultz',
    position: 'Niedergelassener Zahnarzt',
    address: 'Berlin, Deutschland',
    quote: 'Präzision und Geduld sind die Grundlagen meiner Arbeit.',
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+49-30-12345678',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'k.schultz@zahnarztpraxis-berlin.de',
      },
      // XING is supported in your enum → include it
      {
        id: 'XING',
        platform: 'xing',
        value: 'dr.king.schultz',
        url: 'https://xing.com/profile/dr.king.schultz',
        display: 'XING',
      },
    ],
  },

  sections: [
    {
      id: 'summary',
      title: 'Zusammenfassung',
      type: 'text',
      content:
        'Erfahrener Zahnarzt mit über 15 Jahren Praxis in der restaurativen Zahnmedizin. Spezialisiert auf komplexe Eingriffe und Patientenbetreuung mit höchsten Qualitätsstandards.',
    },

    {
      id: 'experience',
      title: 'Berufserfahrung',
      type: 'timeline',
      entries: [
        {
          id: 'Private Practice',
          position: 'Niedergelassener Zahnarzt',
          title: 'Zahnarztpraxis Dr. Schultz',
          location: 'Berlin, Deutschland',
          date: '2010-01-01 — present',
          items: [
            'Umfassende zahnmedizinische Betreuung von über 2000 Patienten.',
            'Spezialisierung auf komplexe restaurative Eingriffe.',
            'Erfolgreiche Führung einer modernen Zahnarztpraxis.',
          ],
        },
        {
          id: 'Hospital Dentist',
          position: 'Assistenzzahnarzt',
          title: 'Charité Universitätsmedizin Berlin',
          location: 'Berlin, Deutschland',
          date: '2005-01-01 — 2009-12-01',
          items: [
            'Notfallbehandlung in der Mund-Kiefer-Gesichtschirurgie.',
            'Ausbildung in oraler Chirurgie und Implantologie.',
          ],
        },
      ],
    },

    {
      id: 'education',
      title: 'Bildung',
      type: 'timeline',
      entries: [
        {
          id: 'Dental Degree',
          position: 'Staatsexamen Zahnmedizin',
          title: 'Universität zu Köln',
          location: 'Köln, Deutschland',
          date: '1999-10-01 — 2004-12-01',
          items: ['Klinische Ausbildung in allen Bereichen der Zahnmedizin.'],
        },
      ],
    },

    {
      id: 'extracurriculars',
      title: 'Außerschulische Aktivitäten',
      type: 'timeline',
      entries: [
        {
          id: 'Dental Volunteer',
          position: 'Freiwilliger Zahnarzt',
          title: 'Ärzte ohne Grenzen',
          location: 'Verschiedene Standorte',
          date: '2015-01-01 — present',
          items: ['Zahnmedizinische Versorgung in unterversorgten Gebieten.'],
        },
      ],
    },

    {
      id: 'languages',
      title: 'Sprachen',
      type: 'taxonomy',
      categories: [
        {
          id: 'German',
          type: 'Deutsch',
          items: ['Muttersprache'],
        },
        {
          id: 'English',
          type: 'Englisch',
          items: ['Fließend'],
        },
        {
          id: 'French',
          type: 'Französisch',
          items: ['Fortgeschritten'],
        },
      ],
    },

    {
      id: 'certificates',
      title: 'Zertifikate',
      type: 'timeline',
      entries: [
        {
          id: 'Implantology',
          position: 'Zertifikat Implantologie',
          title: 'Zertifikat Implantologie',
          location: 'Deutsche Gesellschaft für Implantologie',
          date: '2012-06-01',
          items: ['Spezialisierung auf dentale Implantologie.'],
        },
        {
          id: 'Endodontics',
          position: 'Endodontie-Zertifikat',
          title: 'Endodontie-Zertifikat',
          location: 'Bundeszahnärztekammer',
          date: '2014-03-01',
          items: ['Fortbildung in moderner Wurzelkanalbehandlung.'],
        },
      ],
    },
  ],
}
