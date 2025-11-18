import { OpenPanel } from '@openpanel/web'

export const op = new OpenPanel({
  clientId: import.meta.env.VITE_OPENPANEL_CLIENT_ID,
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
  apiUrl: import.meta.env.VITE_OPENPANEL_API_URL,
})
