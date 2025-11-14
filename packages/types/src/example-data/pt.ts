import type { IResume } from '../resume'

export const agostinhoCarraraResume: IResume = {
  config: {
    themeColor: 'awesome-emerald',
    headerAlign: 'left',
    sectionColorHighlight: true,
    fontSize: 9,
    pageSize: 'A4',
  },
  personalInfo: {
    firstName: 'Agostinho',
    lastName: 'Carrara',
    position: 'Contador Responsável',
    address: 'Rio de Janeiro, RJ',
    quote: 'A organização é a base de qualquer negócio bem-sucedido.',
    socials: [
      {
        id: 'phone',
        platform: 'mobile',
        value: '+55-21-98765-4321',
      },
      {
        id: 'email',
        platform: 'email',
        value: 'agostinho.carrara@contabilidade.com.br',
      },
      {
        id: 'linkedin',
        platform: 'linkedin',
        value: 'agostinho.carrara',
        url: 'https://linkedin.com/in/agostinho.carrara',
      },
    ],
  },
  sections: [
    {
      id: 'summary',
      title: 'Resumo',
      type: 'text',
      content:
        'Contador experiente com mais de 15 anos de atuação em contabilidade empresarial e consultoria fiscal. Especializado em pequenas e médias empresas, com foco em eficiência e conformidade tributária.',
    },
    {
      id: 'experience',
      title: 'Experiência Profissional',
      type: 'timeline',
      entries: [
        {
          id: 'own-practice',
          position: 'Contador Responsável',
          title: 'Carrara Contabilidade Ltda.',
          location: 'Rio de Janeiro, RJ',
          date: '2010-01-01 — present',
          items: [
            'Gestão contábil de mais de 50 empresas de pequeno e médio porte.',
            'Assessoria tributária e conformidade fiscal para diversos setores.',
            'Planejamento financeiro e consultoria empresarial.',
          ],
        },
        {
          id: 'accounting-firm',
          position: 'Contador Sênior',
          title: 'Escritório de Contabilidade Santos & Associados',
          location: 'Rio de Janeiro, RJ',
          date: '2005-03-01 — 2009-12-01',
          items: [
            'Contabilidade empresarial e elaboração de demonstrações financeiras.',
            'Treinamento de equipe em procedimentos contábeis.',
          ],
        },
      ],
    },
    {
      id: 'education',
      title: 'Formação',
      type: 'timeline',
      entries: [
        {
          id: 'accounting-degree',
          position: 'Bacharelado em Ciências Contábeis',
          title: 'Universidade Estácio de Sá',
          location: 'Rio de Janeiro, RJ',
          date: '2001-02-01 — 2004-12-01',
          items: ['Formação em contabilidade geral e tributária.'],
        },
      ],
    },
    {
      id: 'extracurriculars',
      title: 'Atividades Extracurriculares',
      type: 'timeline',
      entries: [
        {
          id: 'community-volunteer',
          position: 'Voluntário',
          title: 'Centro Comunitário do Bairro',
          location: 'Rio de Janeiro, RJ',
          date: '2015-01-01 — present',
          items: ['Educação financeira para famílias de baixa renda.'],
        },
      ],
    },
    {
      id: 'languages',
      title: 'Idiomas',
      type: 'taxonomy',
      categories: [
        {
          id: 'portuguese',
          type: 'Português',
          items: ['Nativo'],
        },
        {
          id: 'english',
          type: 'Inglês',
          items: ['Básico'],
        },
      ],
    },
    {
      id: 'certificates',
      title: 'Certificados',
      type: 'timeline',
      entries: [
        {
          id: 'crc',
          position: 'Certificação',
          title: 'Registro no Conselho Regional de Contabilidade',
          location: 'CRC-RJ',
          date: '2005-01-15',
          items: ['Habilitação profissional para exercer a contabilidade.'],
        },
        {
          id: 'tax-specialist',
          position: 'Pós-graduação',
          title: 'Especialização em Direito Tributário',
          location: 'Fundação Getúlio Vargas',
          date: '2012-08-01',
          items: ['Pós-graduação em legislação tributária brasileira.'],
        },
      ],
    },
  ],
}
