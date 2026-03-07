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
  },
} satisfies Dictionary

export default dashboardSidebarContent
