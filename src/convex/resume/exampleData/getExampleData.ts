import type { Locale } from '../../locale'
import { sunTzuResume } from './chinese'
import { kendallRoyResume } from './english'
import { arseneLupinResume } from './french'
import { kingSchultzResume } from './german'
import { golDRogerResume } from './japanese'
import { agostinhoCarraraResume } from './portuguese'
import { inigoMontoyaResume } from './spanish'

export const getExampleData = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return kendallRoyResume
    case 'de':
      return kingSchultzResume
    case 'es':
      return inigoMontoyaResume
    case 'fr':
      return arseneLupinResume
    case 'ja':
      return golDRogerResume
    case 'pt':
      return agostinhoCarraraResume
    case 'zh':
      return sunTzuResume
  }
}
