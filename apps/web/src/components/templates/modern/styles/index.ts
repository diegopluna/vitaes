import { StyleSheet } from '@react-pdf/renderer'
import { colors, type AwesomeColor } from '@vitaes/types/colors'

export const createStyles = (themeColor: AwesomeColor = 'awesome-red') => {
  const awesome = colors[themeColor]

  return StyleSheet.create({
    page: {
      padding: '0.8cm 1.4cm 1.8cm',
      fontFamily: 'Roboto',
      fontSize: 10,
      color: colors.text,
      backgroundColor: colors.white,
    },

    // Header styles
    header: {
      marginBottom: '8mm',
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
      fontWeight: 'normal',
      fontSize: 34,
      color: awesome,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    headerLastName: {
      fontFamily: 'Roboto',
      fontWeight: 'light',
      fontSize: 34,
      color: colors.text,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginLeft: 6,
    },
    headerPosition: {
      fontFamily: 'Roboto',
      fontSize: 9,
      textTransform: 'uppercase',
      color: colors.darktext,
      marginTop: '1mm',
      letterSpacing: 1.2,
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
      fontSize: 9,
      color: colors.graytext,
      marginTop: '1mm',
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
      fontSize: 8,
      color: colors.text,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '1mm',
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
      color: colors.lighttext,
    },
    headerQuote: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontSize: 10,
      color: awesome,
      marginTop: '4mm',
      paddingHorizontal: '1cm',
    },
    headerQuoteLeft: {
      textAlign: 'left',
      paddingLeft: 0,
    },
    headerQuoteCenter: {
      textAlign: 'center',
    },
    headerQuoteRight: {
      textAlign: 'right',
      paddingRight: 0,
    },

    // Section styles
    section: {
      marginTop: '4mm',
    },
    sectionTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 12,
      color: awesome,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: 4,
    },
    sectionTitleHighlight: {
      color: awesome,
    },
    sectionLine: {
      height: 1,
      backgroundColor: colors.lighttext,
      marginBottom: '3mm',
      opacity: 0.3,
    },

    // Subsection styles
    subsection: {
      marginTop: '3mm',
      marginBottom: '-1mm',
    },
    subsectionTitle: {
      fontFamily: 'Roboto',
      fontSize: 11,
      fontWeight: 'medium',
      color: colors.darktext,
    },

    // Paragraph styles
    paragraph: {
      fontFamily: 'Roboto',
      fontWeight: 'light',
      fontSize: 10,
      color: colors.text,
      lineHeight: 1.5,
      textAlign: 'justify',
    },

    // Entry styles
    entriesContainer: {
      marginTop: '2mm',
    },
    entry: {
      marginBottom: '3mm',
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    entryTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
      fontSize: 11,
      color: colors.darktext,
      flex: 1,
    },
    entryLocation: {
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
    },
    entrySecondRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    entryPosition: {
      fontFamily: 'Roboto',
      fontSize: 10,
      color: awesome,
      flex: 1,
    },
    entryDate: {
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
      fontStyle: 'italic',
    },
    entryDescription: {
      fontFamily: 'Roboto',
      fontWeight: 'light',
      fontSize: 10,
      color: colors.text,
      lineHeight: 1.5,
    },

    // Items (bullet points)
    items: {
      marginTop: '1mm',
      marginBottom: '1mm',
    },
    item: {
      flexDirection: 'row',
      marginLeft: '2ex',
      fontSize: 10,
      fontFamily: 'Roboto',
      fontWeight: 'light',
      color: colors.text,
      lineHeight: 1.5,
    },
    itemBullet: {
      width: 10,
      marginRight: 2,
      color: awesome,
    },
    itemText: {
      flex: 1,
    },

    // Honors
    honorsContainer: {
      marginTop: '2mm',
    },
    honorRow: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'baseline',
    },
    honorDate: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
      fontSize: 10,
      color: awesome,
      width: '1.8cm',
    },
    honorContent: {
      flex: 1,
    },
    honorPosition: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
      fontSize: 10,
      color: colors.darktext,
    },
    honorTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'light',
      fontSize: 10,
      color: colors.text,
    },
    honorLocation: {
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
      textAlign: 'right',
      marginLeft: 10,
    },

    // Skills
    skillsContainer: {
      marginTop: '2mm',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 4,
      alignItems: 'baseline',
    },
    skillType: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
      fontSize: 10,
      color: colors.darktext,
      width: '25%',
    },
    skillSet: {
      fontFamily: 'Roboto',
      fontWeight: 'light',
      fontSize: 10,
      color: colors.text,
      flex: 1,
      lineHeight: 1.4,
    },

    // Footer
    footer: {
      position: 'absolute',
      bottom: '1.8cm',
      left: '1.4cm',
      right: '1.4cm',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontFamily: 'Roboto',
      fontSize: 8,
      color: colors.lighttext,
    },
  })
}

export type Styles = ReturnType<typeof createStyles>
