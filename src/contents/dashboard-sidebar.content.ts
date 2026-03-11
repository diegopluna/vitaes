import { t } from 'intlayer'
import type { Dictionary } from 'intlayer'

const dashboardSidebarContent = {
  key: 'dashboard-sidebar',
  content: {
    workspace: t({
      en: 'WORKSPACE',
      fr: 'ESPACE DE TRAVAIL',
      es: 'ESPACIO DE TRABAJO',
      de: 'ARBEITSBEREICH',
      pt: 'ESPAÇO DE TRABALHO',
    }),
    dashboard: t({
      en: 'Dashboard',
      fr: 'Tableau de bord',
      es: 'Tablero',
      de: 'Instrumententafel',
      pt: 'Painel de controle',
    }),
    myResumes: t({
      en: 'My Resumes',
      fr: 'Mes CV',
      es: 'Mis currículums',
      de: 'Meine Lebensläufe',
      pt: 'Meus currículos',
    }),
    templates: t({
      en: 'Templates',
      fr: 'Modèles',
      es: 'Plantillas',
      de: 'Vorlagen',
      pt: 'Modelos',
    }),
    drafts: t({
      en: 'Drafts',
      fr: 'Brouillons',
      es: 'Borradores',
      de: 'Entwürfe',
      pt: 'Rascunhos',
    }),
    playground: t({
      en: 'Playground',
      fr: 'Bac à sable',
      es: 'Laboratorio',
      de: 'Spielplatz',
      pt: 'Playground',
    }),
  },
} satisfies Dictionary

export default dashboardSidebarContent
