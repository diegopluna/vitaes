import type { Resume } from '../type'

export const kingSchultzResume: Resume = {
  basics: {
    firstName: 'Dr. King',
    lastName: 'Schultz',
    phone: '+49-30-12345678',
    email: 'k.schultz@zahnarztpraxis-berlin.de',
    url: '',
    quote: 'Präzision und Geduld sind die Grundlagen meiner Arbeit.',
    summary: {
      label: 'Zusammenfassung',
      content:
        'Erfahrener Zahnarzt mit über 15 Jahren Praxis in der restaurativen Zahnmedizin. Spezialisiert auf komplexe Eingriffe und Patientenbetreuung mit höchsten Qualitätsstandards.',
    },
    profiles: [
      {
        id: 'XING',
        network: 'XING',
        username: 'dr.king.schultz',
        url: 'https://xing.com/profile/dr.king.schultz',
      },
    ],
  },
  work: {
    label: 'Berufserfahrung',
    content: [
      {
        id: 'Private Practice',
        company: 'Zahnarztpraxis Dr. Schultz',
        location: 'Berlin, Deutschland',
        position: 'Niedergelassener Zahnarzt',
        startDate: '2010-01-01',
        endDate: 'present',
        highlights: [
          {
            id: 'Patient Care',
            value:
              'Umfassende zahnmedizinische Betreuung von über 2000 Patienten.',
          },
          {
            id: 'Complex Procedures',
            value: 'Spezialisierung auf komplexe restaurative Eingriffe.',
          },
          {
            id: 'Practice Management',
            value: 'Erfolgreiche Führung einer modernen Zahnarztpraxis.',
          },
        ],
      },
      {
        id: 'Hospital Dentist',
        company: 'Charité Universitätsmedizin Berlin',
        location: 'Berlin, Deutschland',
        position: 'Assistenzzahnarzt',
        startDate: '2005-01-01',
        endDate: '2009-12-01',
        highlights: [
          {
            id: 'Emergency Care',
            value: 'Notfallbehandlung in der Mund-Kiefer-Gesichtschirurgie.',
          },
          {
            id: 'Surgical Training',
            value: 'Ausbildung in oraler Chirurgie und Implantologie.',
          },
        ],
      },
    ],
  },
  honors: {
    label: 'Auszeichnungen',
    content: [],
  },
  presentations: {
    label: 'Präsentationen',
    content: [],
  },
  writings: {
    label: 'Veröffentlichungen',
    content: [],
  },
  committees: {
    label: 'Gremien',
    content: [],
  },
  education: {
    label: 'Bildung',
    content: [
      {
        id: 'Dental Degree',
        school: 'Universität zu Köln',
        location: 'Köln, Deutschland',
        degree: 'Staatsexamen Zahnmedizin',
        startDate: '1999-10-01',
        endDate: '2004-12-01',
        description: [
          {
            id: 'Clinical Training',
            value: 'Klinische Ausbildung in allen Bereichen der Zahnmedizin.',
          },
        ],
      },
    ],
  },
  extracurriculars: {
    label: 'Außerschulische Aktivitäten',
    content: [
      {
        id: 'Dental Volunteer',
        role: 'Freiwilliger Zahnarzt',
        organization: 'Ärzte ohne Grenzen',
        location: 'Verschiedene Standorte',
        startDate: '2015-01-01',
        endDate: 'present',
        description: [
          {
            id: 'Humanitarian Work',
            value: 'Zahnmedizinische Versorgung in unterversorgten Gebieten.',
          },
        ],
      },
    ],
  },
  projects: {
    label: 'Projekte',
    content: [],
  },
  languages: {
    label: 'Sprachen',
    content: [
      {
        id: 'German',
        language: 'Deutsch',
        fluency: 'Muttersprache',
      },
      {
        id: 'English',
        language: 'Englisch',
        fluency: 'Fließend',
      },
      {
        id: 'French',
        language: 'Französisch',
        fluency: 'Fortgeschritten',
      },
    ],
  },
  certificates: {
    label: 'Zertifikate',
    content: [
      {
        id: 'Implantology',
        title: 'Zertifikat Implantologie',
        issuer: 'Deutsche Gesellschaft für Implantologie',
        date: '2012-06-01',
        description: [
          {
            id: 'Implant Training',
            value: 'Spezialisierung auf dentale Implantologie.',
          },
        ],
      },
      {
        id: 'Endodontics',
        title: 'Endodontie-Zertifikat',
        issuer: 'Bundeszahnärztekammer',
        date: '2014-03-01',
        description: [
          {
            id: 'Root Canal',
            value: 'Fortbildung in moderner Wurzelkanalbehandlung.',
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
