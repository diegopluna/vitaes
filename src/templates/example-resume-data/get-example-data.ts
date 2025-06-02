import type { Locale } from '@/paraglide/runtime'
import { agostinhoCarraraResume } from './agostinho-carrara-pt'
import { arseneLupinResume } from './arsene-lupin-fr'
import { golDRogerResume } from './gold-roger-ja'
import { inigoMontoyaResume } from './inigo-montoya-es'
import { kendallRoyResume } from './kendall-roy-en'
import { kingSchultzResume } from './king-schultz-de'
import { sunTzuResume } from './sun-tzu-zh'

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
