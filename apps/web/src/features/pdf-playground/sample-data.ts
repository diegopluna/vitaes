import {
  ResumeDocumentSchema,
  ResumeDocumentVersion,
} from '@vitaes/backend/convex/shared/resume'
import type { ResumeDocument } from '@vitaes/backend/convex/shared/resume'
import {
  parseResumeTemplateDefinition,
  TemplateVersion,
} from '@vitaes/backend/convex/shared/template'
import type { ResumeTemplateDefinition } from '@vitaes/backend/convex/shared/template'

export type ResumeFixture = {
  id: string
  label: string
  description: string
  document: ResumeDocument
}

export type TemplateFixture = {
  id: string
  label: string
  description: string
  template: ResumeTemplateDefinition
}

const parseTemplateDefinition = (template: ResumeTemplateDefinition) =>
  parseResumeTemplateDefinition(template)

const atelierResume = ResumeDocumentSchema.parse({
  version: ResumeDocumentVersion,
  locale: 'en',
  basics: {
    fullName: 'Jordan Almeida',
    headline: 'Product Designer and Service Strategist',
    email: 'jordan.almeida@example.com',
    phone: '+55 81 99999-0000',
    location: 'Recife, Brazil',
    website: 'https://jordan.design',
    profiles: [
      {
        id: 'linkedin',
        kind: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/jordanalmeida',
      },
      {
        id: 'portfolio',
        kind: 'portfolio',
        label: 'Portfolio',
        url: 'https://jordan.design/work',
      },
    ],
  },
  sections: [
    {
      id: 'summary',
      kind: 'summary',
      title: 'Profile',
      content:
        'Cross-disciplinary designer with eight years of experience shaping digital services, hiring workflows, and customer journeys for education, health, and public-sector teams.',
      visible: true,
    },
    {
      id: 'experience',
      kind: 'experience',
      title: 'Experience',
      visible: true,
      items: [
        {
          id: 'exp-1',
          title: 'Lead Product Designer',
          organization: 'Orla Systems',
          subtitle: 'Customer platform redesign',
          location: 'Remote',
          dateRange: {
            start: '2022-02',
            end: '2026-03',
            isCurrent: true,
            display: 'Feb 2022 - Present',
          },
          summary:
            'Led design strategy across onboarding, billing, and support surfaces for a B2B platform used by distributed operations teams.',
          highlights: [
            'Reduced time-to-first-value from 11 days to 4 days.',
            'Built a reusable design language adopted by product and marketing squads.',
            'Partnered with researchers to simplify complex workflows for low-digital-literacy users.',
          ],
          tags: ['Design systems', 'Research', 'Facilitation'],
        },
        {
          id: 'exp-2',
          title: 'Service Designer',
          organization: 'Cais Lab',
          subtitle: 'Public service modernization program',
          location: 'Recife, Brazil',
          dateRange: {
            start: '2019-01',
            end: '2022-01',
            display: 'Jan 2019 - Jan 2022',
          },
          summary:
            'Worked with municipal partners to redesign service delivery touchpoints and internal handoff processes.',
          highlights: [
            'Ran stakeholder workshops across policy, support, and operations teams.',
            'Translated field research into service blueprints and implementation priorities.',
          ],
          tags: ['Service design', 'Workshops', 'Journey mapping'],
        },
      ],
    },
    {
      id: 'education',
      kind: 'education',
      title: 'Education',
      visible: true,
      items: [
        {
          id: 'edu-1',
          institution: 'Federal University of Pernambuco',
          studyType: 'B.A.',
          area: 'Design',
          location: 'Recife, Brazil',
          dateRange: {
            start: '2012-01',
            end: '2016-12',
            display: '2012 - 2016',
          },
          summary:
            'Focused on visual communication, systems thinking, and participatory design methods.',
        },
      ],
    },
    {
      id: 'skills',
      kind: 'skills',
      title: 'Capabilities',
      visible: true,
      groups: [
        {
          id: 'skills-1',
          name: 'Research & Strategy',
          items: ['User interviews', 'Journey maps', 'Service blueprints'],
        },
        {
          id: 'skills-2',
          name: 'Design & Delivery',
          items: ['Prototyping', 'Design systems', 'Content design'],
        },
      ],
    },
    {
      id: 'languages',
      kind: 'languages',
      title: 'Languages',
      visible: true,
      items: [
        { id: 'lang-1', name: 'Portuguese', proficiency: 'Native' },
        { id: 'lang-2', name: 'English', proficiency: 'Professional' },
        { id: 'lang-3', name: 'Spanish', proficiency: 'Conversational' },
      ],
    },
    {
      id: 'certifications',
      kind: 'certifications',
      title: 'Certifications',
      visible: true,
      items: [
        {
          id: 'cert-1',
          name: 'Service Design Essentials',
          issuer: 'Nielsen Norman Group',
          dateRange: {
            display: '2024',
          },
          summary: 'Advanced service blueprinting and orchestration methods.',
          url: 'https://example.com/cert/service-design',
        },
      ],
    },
  ],
})

const denseResume = ResumeDocumentSchema.parse({
  version: ResumeDocumentVersion,
  locale: 'en',
  basics: {
    fullName: 'Lucia Ferreira',
    headline: 'Operations Manager and Program Lead',
    email: 'lucia.ferreira@example.com',
    phone: '+55 11 98888-7777',
    location: 'Sao Paulo, Brazil',
    profiles: [
      {
        id: 'site',
        kind: 'website',
        label: 'Profile',
        url: 'https://lucia.example.com',
      },
    ],
  },
  sections: [
    {
      id: 'summary',
      kind: 'summary',
      title: 'Executive Summary',
      content:
        'Operations leader with a track record building durable delivery systems across logistics, healthcare, and nonprofit programs. Comfortable managing headcount growth, vendor operations, and executive reporting in volatile environments.',
      visible: true,
    },
    {
      id: 'experience',
      kind: 'experience',
      title: 'Experience',
      visible: true,
      items: [
        {
          id: 'exp-1',
          title: 'Operations Manager',
          organization: 'Linea Health',
          subtitle: 'National care coordination program',
          location: 'Hybrid',
          dateRange: {
            display: '2021 - Present',
          },
          summary:
            'Owned day-to-day delivery planning, staffing, and partner operations across a distributed support organization.',
          highlights: [
            'Scaled service operations from 3 to 11 regional teams.',
            'Introduced weekly planning cadence and issue-triage rituals for cross-functional leads.',
            'Improved SLA compliance while reducing exception handling volume.',
            'Created executive dashboards for staffing risk, throughput, and quality.',
          ],
          tags: ['Operations', 'Staffing', 'Reporting'],
        },
        {
          id: 'exp-2',
          title: 'Program Coordinator',
          organization: 'Movimento Bairro',
          subtitle: 'Community impact program',
          location: 'Sao Paulo',
          dateRange: {
            display: '2017 - 2021',
          },
          summary:
            'Coordinated grant delivery, partner reporting, and volunteer operations for neighborhood improvement programs.',
          highlights: [
            'Managed grant reporting across six partner organizations.',
            'Built standard operating procedures for recurring field activities.',
            'Led recruitment and onboarding for a large volunteer pool.',
          ],
          tags: ['Programs', 'Partnerships', 'Field ops'],
        },
      ],
    },
    {
      id: 'projects',
      kind: 'projects',
      title: 'Selected Initiatives',
      visible: true,
      items: [
        {
          id: 'proj-1',
          title: 'Regional expansion planning',
          organization: 'Linea Health',
          dateRange: { display: '2025' },
          summary:
            'Built the operating model, staffing plan, and rollout governance for expansion into three new regions.',
          highlights: [
            'Mapped launch dependencies with legal, finance, hiring, and support.',
            'Created operating playbooks for local team leads.',
          ],
          tags: ['Expansion', 'Planning'],
        },
      ],
    },
    {
      id: 'skills',
      kind: 'skills',
      title: 'Core Strengths',
      visible: true,
      groups: [
        {
          id: 'skills-1',
          name: 'Leadership',
          items: ['Team management', 'Hiring', 'Coaching'],
        },
        {
          id: 'skills-2',
          name: 'Operations',
          items: ['Planning', 'Vendor management', 'Quality control'],
        },
        {
          id: 'skills-3',
          name: 'Communication',
          items: ['Executive updates', 'Facilitation', 'Documentation'],
        },
      ],
    },
    {
      id: 'awards',
      kind: 'awards',
      title: 'Recognition',
      visible: true,
      items: [
        {
          id: 'award-1',
          title: 'Operational Excellence Award',
          issuer: 'Linea Health',
          date: '2024',
          summary:
            'Recognized for redesigning escalation and staffing workflows.',
        },
      ],
    },
  ],
})

const atelierTemplate = parseTemplateDefinition({
  id: 'playground-atelier',
  version: TemplateVersion,
  name: 'Atelier Playground',
  description:
    'A balanced two-column template for validating the shared resume and template schemas.',
  page: {
    size: 'A4',
    margins: {
      top: 30,
      right: 30,
      bottom: 26,
      left: 30,
    },
    columns: {
      left: 0.34,
      right: 0.66,
      gap: 14,
    },
  },
  theme: {
    colors: {
      text: '#1f2933',
      accent: '#1d6f67',
      muted: '#5f6c7b',
      background: '#fffdf9',
      surface: '#eef6f4',
      border: '#d9e6e2',
    },
    fonts: {
      heading: 'Helvetica-Bold',
      body: 'Helvetica',
    },
    typography: {
      baseSize: 10,
      lineHeight: 1.44,
      nameSize: 22,
      headingSize: 11,
      sectionTitleSize: 10,
      metaSize: 8,
    },
    spacing: {
      xs: 3,
      sm: 6,
      md: 10,
      lg: 14,
      xl: 18,
    },
    density: 'compact',
  },
  regions: {
    header: [
      {
        type: 'basics',
        variant: 'split',
        showHeadline: true,
        showProfiles: true,
      },
    ],
    sidebar: [
      {
        type: 'section',
        section: 'skills',
        variant: 'groups',
      },
      {
        type: 'section',
        section: 'languages',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'certifications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'volunteering',
        variant: 'compact-list',
        visibleWhen: { minItems: 1 },
      },
    ],
    main: [
      {
        type: 'summary',
        variant: 'paragraph',
        title: 'About',
      },
      {
        type: 'section',
        section: 'experience',
        variant: 'stacked',
      },
      {
        type: 'section',
        section: 'education',
        variant: 'stacked',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'projects',
        variant: 'cards',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'publications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'awards',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
    ],
    footer: [
      { type: 'divider' },
      {
        type: 'text',
        content: 'Playground renderer validation · PDF output preview',
        style: 'meta',
        align: 'center',
      },
    ],
  },
})

const bulletinTemplate = parseTemplateDefinition({
  id: 'playground-bulletin',
  version: TemplateVersion,
  name: 'Bulletin Compact',
  description:
    'A denser one-column layout for stressing compact variants and visibility rules.',
  page: {
    size: 'A4',
    margins: {
      top: 28,
      right: 28,
      bottom: 28,
      left: 28,
    },
  },
  theme: {
    colors: {
      text: '#172026',
      accent: '#9a3412',
      muted: '#5b6670',
      background: '#fffdf8',
      surface: '#f6eee6',
      border: '#e5d4c5',
    },
    fonts: {
      heading: 'Helvetica-Bold',
      body: 'Helvetica',
    },
    typography: {
      baseSize: 9.5,
      lineHeight: 1.45,
      nameSize: 20,
      headingSize: 10.5,
      sectionTitleSize: 9,
      metaSize: 7.5,
    },
    spacing: {
      xs: 3,
      sm: 6,
      md: 10,
      lg: 14,
      xl: 18,
    },
    density: 'compact',
  },
  regions: {
    header: [
      {
        type: 'basics',
        variant: 'hero',
        align: 'left',
        showHeadline: true,
        showProfiles: true,
      },
    ],
    main: [
      {
        type: 'summary',
        variant: 'paragraph',
        title: 'Profile',
      },
      {
        type: 'section',
        section: 'experience',
        variant: 'stacked',
      },
      {
        type: 'section',
        section: 'projects',
        variant: 'stacked',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'skills',
        variant: 'compact-list',
      },
      {
        type: 'section',
        section: 'awards',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'education',
        variant: 'stacked',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'languages',
        variant: 'badges',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'certifications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'publications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'volunteering',
        variant: 'compact-list',
        visibleWhen: { minItems: 1 },
      },
    ],
    footer: [
      {
        type: 'text',
        content: 'Compact template fixture',
        style: 'meta',
        align: 'right',
      },
    ],
  },
})

const meridianResume = ResumeDocumentSchema.parse({
  version: ResumeDocumentVersion,
  locale: 'en',
  basics: {
    fullName: 'Sana Okamura',
    headline: 'Software Engineer · Distributed Systems',
    email: 'sana.okamura@example.com',
    phone: '+81 90-1234-5678',
    location: 'Tokyo, Japan',
    website: 'https://sana.dev',
    profiles: [
      {
        id: 'github',
        kind: 'github',
        label: 'GitHub',
        url: 'https://github.com/sana-okamura',
      },
      {
        id: 'linkedin',
        kind: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/sana-okamura',
      },
    ],
  },
  sections: [
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary',
      content:
        'Backend engineer with six years of experience designing event-driven architectures, real-time data pipelines, and developer tooling for high-throughput platforms. Passionate about reliable systems and open-source collaboration.',
      visible: true,
    },
    {
      id: 'experience',
      kind: 'experience',
      title: 'Experience',
      visible: true,
      items: [
        {
          id: 'exp-1',
          title: 'Senior Software Engineer',
          organization: 'Kumo Infrastructure',
          subtitle: 'Platform team',
          location: 'Tokyo, Japan',
          dateRange: {
            start: '2022-06',
            end: '2026-03',
            isCurrent: true,
            display: 'Jun 2022 – Present',
          },
          summary:
            'Designed and maintained core event-processing services handling 2M+ events per second across multi-region deployments.',
          highlights: [
            'Reduced p99 processing latency from 120ms to 34ms by rearchitecting the consumer pipeline.',
            'Built an internal schema registry adopted by 14 product teams.',
            'Led incident response for two major outages, improving post-mortem process.',
          ],
          tags: ['Go', 'Kafka', 'Kubernetes', 'Terraform'],
        },
        {
          id: 'exp-2',
          title: 'Software Engineer',
          organization: 'Onda Analytics',
          subtitle: 'Data infrastructure',
          location: 'Osaka, Japan',
          dateRange: {
            start: '2019-04',
            end: '2022-05',
            display: 'Apr 2019 – May 2022',
          },
          summary:
            'Built batch and streaming data pipelines for a product analytics platform serving e-commerce clients.',
          highlights: [
            'Migrated legacy ETL jobs to Apache Flink, cutting processing time by 60%.',
            'Implemented column-level lineage tracking across the data warehouse.',
          ],
          tags: ['Python', 'Flink', 'PostgreSQL', 'AWS'],
        },
      ],
    },
    {
      id: 'education',
      kind: 'education',
      title: 'Education',
      visible: true,
      items: [
        {
          id: 'edu-1',
          institution: 'University of Tokyo',
          studyType: 'M.Eng.',
          area: 'Computer Science',
          location: 'Tokyo, Japan',
          dateRange: {
            start: '2017-04',
            end: '2019-03',
            display: '2017 – 2019',
          },
          summary:
            'Research focus on distributed consensus algorithms and fault-tolerant systems.',
        },
        {
          id: 'edu-2',
          institution: 'Kyoto University',
          studyType: 'B.Eng.',
          area: 'Information Science',
          location: 'Kyoto, Japan',
          dateRange: {
            start: '2013-04',
            end: '2017-03',
            display: '2013 – 2017',
          },
        },
      ],
    },
    {
      id: 'skills',
      kind: 'skills',
      title: 'Technical Skills',
      visible: true,
      groups: [
        {
          id: 'skills-1',
          name: 'Languages',
          items: ['Go', 'Python', 'TypeScript', 'Rust'],
        },
        {
          id: 'skills-2',
          name: 'Infrastructure',
          items: ['Kubernetes', 'Terraform', 'AWS', 'GCP'],
        },
        {
          id: 'skills-3',
          name: 'Data',
          items: ['Kafka', 'Flink', 'PostgreSQL', 'ClickHouse'],
        },
      ],
    },
    {
      id: 'publications',
      kind: 'publications',
      title: 'Publications',
      visible: true,
      items: [
        {
          id: 'pub-1',
          title: 'Adaptive Load Shedding in Multi-Tenant Stream Processors',
          publisher: 'ACM SIGMOD Workshop',
          date: '2023',
          summary:
            'Proposed a feedback-driven approach to load shedding that preserves tenant SLOs under bursty workloads.',
        },
      ],
    },
    {
      id: 'volunteering',
      kind: 'volunteering',
      title: 'Community',
      visible: true,
      items: [
        {
          id: 'vol-1',
          title: 'Mentor',
          organization: 'Code for Japan',
          dateRange: { display: '2021 – Present' },
          summary:
            'Mentor early-career engineers on backend architecture, code review practices, and open-source contribution.',
          highlights: [],
          tags: [],
        },
      ],
    },
    {
      id: 'languages',
      kind: 'languages',
      title: 'Languages',
      visible: true,
      items: [
        { id: 'lang-1', name: 'Japanese', proficiency: 'Native' },
        { id: 'lang-2', name: 'English', proficiency: 'Fluent' },
      ],
    },
  ],
})

const meridianTemplate = parseTemplateDefinition({
  id: 'playground-meridian',
  version: TemplateVersion,
  name: 'Meridian',
  description:
    'A clean single-column layout with centered hero, card entries, and airy spacing for a polished, modern look.',
  page: {
    size: 'A4',
    margins: {
      top: 34,
      right: 36,
      bottom: 30,
      left: 36,
    },
  },
  theme: {
    colors: {
      text: '#1a1a2e',
      accent: '#4a3f8a',
      muted: '#6b7280',
      background: '#ffffff',
      surface: '#f4f2fb',
      border: '#e0dced',
    },
    fonts: {
      heading: 'Helvetica-Bold',
      body: 'Helvetica',
    },
    typography: {
      baseSize: 10,
      lineHeight: 1.45,
      nameSize: 24,
      headingSize: 11,
      sectionTitleSize: 9.5,
      metaSize: 8,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 14,
      lg: 20,
      xl: 26,
    },
    density: 'airy',
  },
  regions: {
    header: [
      {
        type: 'basics',
        variant: 'hero',
        align: 'center',
        showHeadline: true,
        showProfiles: true,
      },
    ],
    main: [
      {
        type: 'summary',
        variant: 'paragraph',
      },
      {
        type: 'section',
        section: 'experience',
        variant: 'cards',
      },
      {
        type: 'section',
        section: 'education',
        variant: 'stacked',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'skills',
        variant: 'badges',
      },
      {
        type: 'section',
        section: 'publications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'volunteering',
        variant: 'compact-list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'certifications',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'projects',
        variant: 'cards',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'awards',
        variant: 'list',
        visibleWhen: { minItems: 1 },
      },
      {
        type: 'section',
        section: 'languages',
        variant: 'badges',
        visibleWhen: { minItems: 1 },
      },
    ],
    footer: [
      { type: 'divider' },
      {
        type: 'text',
        content: 'Generated with Vitaes',
        style: 'meta',
        align: 'center',
      },
    ],
  },
})

export const resumeFixtures: ResumeFixture[] = [
  {
    id: 'atelier-resume',
    label: 'Jordan Almeida',
    description: 'Balanced multi-section fixture with sidebar content.',
    document: atelierResume,
  },
  {
    id: 'dense-resume',
    label: 'Lucia Ferreira',
    description: 'Denser operations-focused fixture for compact layouts.',
    document: denseResume,
  },
  {
    id: 'meridian-resume',
    label: 'Sana Okamura',
    description:
      'Engineering-focused fixture with publications and volunteering.',
    document: meridianResume,
  },
]

export const templateFixtures: TemplateFixture[] = [
  {
    id: 'atelier-template',
    label: 'Atelier Playground',
    description: 'Two-column layout with stacked body sections.',
    template: atelierTemplate,
  },
  {
    id: 'bulletin-template',
    label: 'Bulletin Compact',
    description: 'Single-column compact layout with timeline entries.',
    template: bulletinTemplate,
  },
  {
    id: 'meridian-template',
    label: 'Meridian',
    description:
      'Single-column airy layout with centered hero and card entries.',
    template: meridianTemplate,
  },
]

export const sampleResumeDocument = resumeFixtures[0].document
export const sampleResumeTemplate = templateFixtures[0].template
