import { Link, Text, View } from '@react-pdf/renderer'
import type { PersonalInfo } from '@vitaes/types/resume'
import type { Styles } from './styles'
import { Fragment } from 'react/jsx-runtime'
import { getSocialConfig } from './utils/social-helpers'
import { colors } from '@vitaes/types/colors'

interface HeaderProps {
  info: PersonalInfo
  styles: Styles
  align?: 'left' | 'center' | 'right'
}

export const Header = ({ info, styles, align = 'center' }: HeaderProps) => {
  const alignmentMap = {
    left: 'Left',
    center: 'Center',
    right: 'Right',
  }
  const alignSuffix = alignmentMap[align]
  return (
    <View style={styles.header}>
      <View
        style={[
          styles.headerName,
          styles[`headerName${alignSuffix}` as keyof Styles],
        ]}
      >
        <Text style={styles.headerFirstName}>{info.firstName}</Text>
        <Text style={styles.headerLastName}>{info.lastName}</Text>
      </View>

      <Text
        style={[
          styles.headerPosition,
          styles[`headerPosition${alignSuffix}` as keyof Styles],
        ]}
      >
        {info.position}
      </Text>

      <Text
        style={[
          styles.headerAddress,
          styles[`headerAddress${alignSuffix}` as keyof Styles],
        ]}
      >
        {info.address}
      </Text>

      <View
        style={[
          styles.headerSocial,
          styles[`headerSocial${alignSuffix}` as keyof Styles],
        ]}
      >
        {info.socials.map((social, idx) => {
          const config = getSocialConfig(social)
          const { IconComponent } = config
          return (
            <Fragment key={social.id}>
              {idx > 0 && <Text style={styles.headerSocialSep}>|</Text>}
              <Link src={config.url} style={styles.headerSocialItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconComponent size={8} color={colors.text} />
                  <Text> {config.display}</Text>
                </View>
              </Link>
            </Fragment>
          )
        })}
      </View>

      {info.quote && (
        <Text
          style={[
            styles.headerQuote,
            styles[`headerQuote${alignSuffix}` as keyof Styles],
          ]}
        >
          {info.quote}
        </Text>
      )}
    </View>
  )
}
