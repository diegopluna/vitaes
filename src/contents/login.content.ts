import { insert, t } from 'intlayer'
import type { Dictionary } from 'intlayer'

const loginContent = {
  key: 'login',
  content: {
    links: {
      back: t({
        en: 'Back to home',
      }),
    },
    buttons: {
      login: t({
        en: insert('Continue with {{provider}}'),
      }),
    },
    texts: {
      welcome: t({
        en: 'Welcome back',
      }),
      signIn: t({
        en: 'Sign in to continue building your resume',
      }),
      carrer: t({
        en: 'Your carrer story, perfectly told.',
      }),
      build: t({
        en: 'Build standout resumes with intelligent formatting, real-time suggestions, and designs that get you noticed.',
      }),
    },
    meta: {
      title: t({
        en: 'Vitaes | Login',
      }),
    },
  },
} satisfies Dictionary

export default loginContent
