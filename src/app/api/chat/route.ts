import { google } from '@ai-sdk/google'
import { createEdgeRuntimeAPI } from '@assistant-ui/react/edge'

export const { POST } = createEdgeRuntimeAPI({
  model: google('gemini-1.5-flash'),
})
