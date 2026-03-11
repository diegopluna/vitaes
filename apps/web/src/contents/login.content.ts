import { insert, t } from 'intlayer'
import type { Dictionary } from 'intlayer'

const loginContent = {
  key: 'login',
  content: {
    links: {
      back: t({
        en: 'Back to home',
        de: 'Zurück zur Startseite',
        es: 'Volver a inicio',
        fr: "Retour à l'accueil",
        pt: 'Voltar para a página inicial',
      }),
    },
    buttons: {
      login: t({
        en: insert('Continue with {{provider}}'),
        de: insert('Weiter mit {{provider}}'),
        es: insert('Continuar con {{provider}}'),
        fr: insert('Continuer avec {{provider}}'),
        pt: insert('Continuar com {{provider}}'),
      }),
    },
    texts: {
      welcome: t({
        en: 'Welcome back',
        de: 'Willkommen zurück',
        es: 'Bienvenido de nuevo',
        fr: 'Bon retour',
        pt: 'Bem-vindo de volta',
      }),
      signIn: t({
        en: 'Sign in to continue building your resume',
        de: 'Melden Sie sich an, um Ihren Lebenslauf weiter zu erstellen',
        es: 'Inicia sesión para continuar construyendo tu currículum',
        fr: 'Connectez-vous pour continuer à construire votre CV',
        pt: 'Faça login para continuar construindo seu currículo',
      }),
      carrer: t({
        en: 'Your carrer story, perfectly told.',
        de: 'Ihre Karrieregeschichte, perfekt erzählt.',
        es: 'Tu historia de carrera, perfectamente contada.',
        fr: 'Votre histoire de carrière, parfaitement racontée.',
        pt: 'Sua história de carreira, perfeitamente contada.',
      }),
      build: t({
        en: 'Build standout resumes with intelligent formatting, real-time suggestions, and designs that get you noticed.',
        de: 'Erstellen Sie herausragende Lebensläufe mit intelligenter Formatierung, Echtzeitvorschlägen und Designs, die Sie ins Rampenlicht rücken.',
        es: 'Construye currículums destacados con formato inteligente, sugerencias en tiempo real y diseños que te harán destacar.',
        fr: 'Créez des CV exceptionnels avec une mise en forme intelligente, des suggestions en temps réel et des designs qui vous feront remarquer.',
        pt: 'Construa currículos de destaque com formatação inteligente, sugestões em tempo real e designs que chamam a atenção.',
      }),
    },
    meta: {
      title: t({
        en: 'Vitaes | Login',
        de: 'Vitaes | Anmeldung',
        es: 'Vitaes | Iniciar sesión',
        fr: 'Vitaes | Connexion',
        pt: 'Vitaes | Login',
      }),
    },
  },
} satisfies Dictionary

export default loginContent
