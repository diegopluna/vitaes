import type { SocialPlatform, SocialProfile } from '../types'
import * as Icons from '../icons'

interface SocialConfig {
  IconComponent: React.ComponentType<{ size?: number; color?: string }>
  getUrl: (value: string) => string
  getDisplay: (value: string) => string
}

// TODO: Handle Icons as SVG in @react-pdf/renderer
const socialConfigs: Record<SocialPlatform, SocialConfig> = {
  mobile: {
    IconComponent: Icons.MobileIcon,
    getUrl: (value) => `tel:${value}`,
    getDisplay: (value) => value,
  },
  email: {
    IconComponent: Icons.EmailIcon,
    getUrl: (value) => `mailto:${value}`,
    getDisplay: (value) => value,
  },
  homepage: {
    IconComponent: Icons.HomepageIcon,
    getUrl: (value) => (value.startsWith('http') ? value : `http://${value}`),
    getDisplay: (value) => value.replace(/^https?:\/\//, ''),
  },
  github: {
    IconComponent: Icons.GitHubIcon,
    getUrl: (value) => `https://github.com/${value}`,
    getDisplay: (value) => value,
  },
  linkedin: {
    IconComponent: Icons.LinkedInIcon,
    getUrl: (value) => `https://linkedin.com/in/${value}`,
    getDisplay: (value) => value,
  },
  twitter: {
    IconComponent: Icons.TwitterIcon,
    getUrl: (value) => `https://twitter.com/${value}`,
    getDisplay: (value) => `@${value}`,
  },
  // Add placeholders for other platforms
  gitlab: {
    IconComponent: Icons.GitHubIcon, // Use GitHub icon as placeholder
    getUrl: (value) => `https://gitlab.com/${value}`,
    getDisplay: (value) => value,
  },
  stackoverflow: {
    IconComponent: Icons.HomepageIcon, // Use homepage icon as placeholder
    getUrl: (value) => `https://stackoverflow.com/users/${value}`,
    getDisplay: (value) => value,
  },
  skype: {
    IconComponent: Icons.MobileIcon, // Use mobile icon as placeholder
    getUrl: (value) => `skype:${value}`,
    getDisplay: (value) => value,
  },
  reddit: {
    IconComponent: Icons.HomepageIcon,
    getUrl: (value) => `https://reddit.com/u/${value}`,
    getDisplay: (value) => `u/${value}`,
  },
  xing: {
    IconComponent: Icons.LinkedInIcon, // Similar to LinkedIn
    getUrl: (value) => `https://xing.com/profile/${value}`,
    getDisplay: (value) => value,
  },
  medium: {
    IconComponent: Icons.HomepageIcon,
    getUrl: (value) => `https://medium.com/@${value}`,
    getDisplay: (value) => `@${value}`,
  },
  googlescholar: {
    IconComponent: Icons.HomepageIcon,
    getUrl: (value) => `https://scholar.google.com/citations?user=${value}`,
    getDisplay: (value) => value,
  },
}

export const getSocialConfig = (social: SocialProfile) => {
  const config = socialConfigs[social.platform]
  return {
    IconComponent: config.IconComponent,
    url: social.url || config.getUrl(social.value),
    display: social.display || config.getDisplay(social.value),
  }
}
