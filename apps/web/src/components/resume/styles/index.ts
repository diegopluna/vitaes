import { StyleSheet } from '@react-pdf/renderer'
import { colors, type AwesomeColor } from '@vitaes/types/colors'

export const createStyles = (themeColor: AwesomeColor = 'awesome-red') => {
  const awesome = colors[themeColor]

  return StyleSheet.create({
    page: {
      padding: '0.8cm 1.4cm 1.8cm',
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: colors.text,
      backgroundColor: colors.white,
    },

    // Header styles
    header: {
      marginBottom: '6mm',
    },
    headerName: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    headerNameLeft: {
      justifyContent: 'flex-start',
    },
    headerNameCenter: {
      justifyContent: 'center',
    },
    headerNameRight: {
      justifyContent: 'flex-end',
    },
    headerFirstName: {
      fontFamily: 'Roboto',
      fontWeight: 'thin',
      fontSize: 32,
      color: colors.graytext,
    },
    headerLastName: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 32,
      color: colors.text,
      marginLeft: 4,
    },
    headerPosition: {
      fontFamily: 'Source Sans Pro',
      fontSize: 7.6,
      textTransform: 'uppercase',
      color: awesome,
      marginTop: '0.4mm',
      letterSpacing: 1,
    },
    headerPositionLeft: {
      textAlign: 'left',
    },
    headerPositionCenter: {
      textAlign: 'center',
    },
    headerPositionRight: {
      textAlign: 'right',
    },
    headerAddress: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontSize: 8,
      color: colors.lighttext,
      marginTop: '0.4mm',
    },
    headerAddressLeft: {
      textAlign: 'left',
    },
    headerAddressCenter: {
      textAlign: 'center',
    },
    headerAddressRight: {
      textAlign: 'right',
    },
    headerSocial: {
      fontFamily: 'Roboto',
      fontSize: 6.8,
      color: colors.text,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerSocialLeft: {
      justifyContent: 'flex-start',
    },
    headerSocialCenter: {
      justifyContent: 'center',
    },
    headerSocialRight: {
      justifyContent: 'flex-end',
    },
    headerSocialItem: {
      marginHorizontal: 4,
      color: colors.text,
    },
    headerSocialSep: {
      marginHorizontal: 4,
    },
    headerQuote: {
      fontFamily: 'Source Sans Pro',
      fontStyle: 'italic',
      fontSize: 9,
      color: colors.darktext,
      marginTop: '6mm',
    },
    headerQuoteLeft: {
      textAlign: 'left',
    },
    headerQuoteCenter: {
      textAlign: 'center',
    },
    headerQuoteRight: {
      textAlign: 'right',
    },

    // Section styles
    section: {
      marginTop: '3mm',
    },
    sectionTitle: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 2,
    },
    sectionTitleHighlight: {
      color: awesome,
    },
    sectionLine: {
      height: 0.9,
      backgroundColor: colors.gray,
      marginBottom: '2.5mm',
    },

    // Subsection styles
    subsection: {
      marginTop: '2.5mm',
      marginBottom: '-3mm',
    },
    subsectionTitle: {
      fontFamily: 'Source Sans Pro',
      fontSize: 12,
      textTransform: 'uppercase',
      color: colors.text,
      letterSpacing: 0.5,
    },

    // Paragraph styles
    paragraph: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontSize: 9,
      color: colors.text,
      lineHeight: 1.4,
      // marginTop: '2.5mm',
      // marginBottom: '-3mm',
      textAlign: 'justify',
    },

    // Entry styles
    entriesContainer: {
      marginTop: '2.5mm',
    },
    entry: {
      marginBottom: '2mm',
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 1,
    },
    entryTitle: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 10,
      color: colors.darktext,
      flex: 1,
    },
    entryLocation: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontStyle: 'italic',
      fontSize: 9,
      color: awesome,
    },
    entrySecondRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    entryPosition: {
      fontFamily: 'Source Sans Pro',
      fontSize: 8,
      textTransform: 'uppercase',
      color: colors.graytext,
      letterSpacing: 0.5,
      flex: 1,
    },
    entryDate: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontStyle: 'italic',
      fontSize: 8,
      color: colors.graytext,
    },
    entryDescription: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontSize: 9,
      color: colors.text,
      lineHeight: 1.4,
    },

    // Items (bullet points)
    items: {
      marginTop: '-4mm',
      marginBottom: '-4mm',
    },
    item: {
      flexDirection: 'row',
      marginLeft: '2ex',
      fontSize: 9,
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      color: colors.text,
      lineHeight: 1.4,
    },
    itemBullet: {
      width: 10,
      marginRight: 5,
    },
    itemText: {
      flex: 1,
    },

    // Honor styles
    honorsContainer: {
      marginTop: '2.5mm',
      marginBottom: '-2mm',
    },
    honorRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    honorDate: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: colors.graytext,
      width: '1.5cm',
      textAlign: 'center',
    },
    honorContent: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      flex: 1,
      marginLeft: 10,
    },
    honorPosition: {
      fontWeight: 'bold',
      color: colors.darktext,
    },
    honorTitle: {
      color: colors.graytext,
    },
    honorLocation: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontStyle: 'italic',
      fontSize: 9,
      color: awesome,
      width: '2.5cm',
      textAlign: 'right',
    },

    // Skills styles
    skillsContainer: {
      marginTop: '2.5mm',
      marginBottom: '-2mm',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    skillType: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 10,
      color: colors.darktext,
      width: '20%',
      textAlign: 'right',
      paddingRight: 10,
    },
    skillSet: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontSize: 9,
      color: colors.text,
      flex: 1,
    },

    // Footer styles
    footer: {
      position: 'absolute',
      bottom: '1.8cm',
      left: '1.4cm',
      right: '1.4cm',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontFamily: 'Source Sans Pro',
      fontSize: 8,
      textTransform: 'uppercase',
      color: colors.lighttext,
      letterSpacing: 0.5,
    },
  })
}

export type Styles = ReturnType<typeof createStyles>
