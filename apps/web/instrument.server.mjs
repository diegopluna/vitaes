import * as Sentry from '@sentry/tanstackstart-react'

Sentry.init({
  dsn: 'https://028ccc49fff6baa9f9e29128f5d6950e@o4508814275051520.ingest.us.sentry.io/4511017249144832',

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
})
