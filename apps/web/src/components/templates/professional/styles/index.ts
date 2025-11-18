import { StyleSheet } from '@react-pdf/renderer'
import { colors, type AwesomeColor } from '@vitaes/types/colors'

export const createStyles = (themeColor: AwesomeColor = 'awesome-red') => {
  const awesome = colors[themeColor]

  return StyleSheet.create({
    page: {
      padding: '0.8cm 1.4cm 1.8cm',
      fontFamily: 'Source Sans Pro',
      fontSize: 9.5,
      color: colors.text,
      backgroundColor: colors.white,
    },

    // Header styles
    header: {
      marginBottom: '6mm',
      borderBottomWidth: 1,
      borderBottomColor: colors.gray,
      paddingBottom: '4mm',
    },
    headerName: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: '1mm',
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
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 26,
      color: colors.darktext,
      textTransform: 'uppercase',
    },
    headerLastName: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'light',
      fontSize: 26,
      color: colors.darktext,
      textTransform: 'uppercase',
      marginLeft: 6,
    },
    headerPosition: {
      fontFamily: 'Source Sans Pro',
      fontSize: 10,
      textTransform: 'uppercase',
      color: awesome,
      marginTop: '1mm',
      fontWeight: 'medium',
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
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: colors.text,
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
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
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
      marginHorizontal: 6,
      color: colors.text,
    },
    headerSocialSep: {
      marginHorizontal: 0,
      color: colors.lighttext,
    },
    headerQuote: {
      fontFamily: 'Source Sans Pro',
      fontStyle: 'italic',
      fontSize: 10,
      color: colors.darktext,
      marginTop: '3mm',
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
      marginTop: '4mm',
    },
    sectionTitle: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 13,
      color: colors.darktext,
      textTransform: 'uppercase',
      marginBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray,
      paddingBottom: 1,
    },
    sectionTitleHighlight: {
      color: colors.darktext,
    },
    sectionLine: {
      height: 0,
      display: 'none',
    },

    // Subsection styles
    subsection: {
      marginTop: '3mm',
      marginBottom: '0mm',
    },
    subsectionTitle: {
      fontFamily: 'Source Sans Pro',
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.darktext,
      marginBottom: 2,
    },

    // Paragraph styles
    paragraph: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'normal',
      fontSize: 9.5,
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
      alignItems: 'baseline',
      marginBottom: 1,
    },
    entryTitle: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 11,
      color: colors.darktext,
    },
    entryLocation: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: colors.text,
    },
    entrySecondRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    entryPosition: {
      fontFamily: 'Source Sans Pro',
      fontSize: 10,
      fontWeight: 'medium',
      fontStyle: 'italic',
      color: colors.darktext,
      flex: 1,
    },
    entryDate: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: awesome,
      fontWeight: 'bold',
    },
    entryDescription: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'normal',
      fontSize: 9.5,
      color: colors.text,
      lineHeight: 1.5,
      marginTop: 1,
    },

    // Items (bullet points)
    items: {
      marginTop: '1mm',
      marginBottom: '1mm',
    },
    item: {
      flexDirection: 'row',
      marginLeft: '1.5ex',
      fontSize: 9.5,
      fontFamily: 'Source Sans Pro',
      fontWeight: 'normal',
      color: colors.text,
      lineHeight: 1.5,
    },
    itemBullet: {
      width: 10,
      marginRight: 0,
      color: colors.darktext,
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
      marginBottom: 2,
      alignItems: 'baseline',
    },
    honorDate: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 9.5,
      color: awesome,
      width: '1.5cm',
    },
    honorContent: {
      flex: 1,
      marginLeft: 8,
    },
    honorPosition: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 10,
      color: colors.darktext,
    },
    honorTitle: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9.5,
      color: colors.text,
    },
    honorLocation: {
      fontFamily: 'Source Sans Pro',
      fontSize: 9,
      color: colors.text,
      textAlign: 'right',
      marginLeft: 10,
    },

    // Skills
    skillsContainer: {
      marginTop: '2mm',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'baseline',
      borderBottomWidth: 0.5,
      borderBottomColor: colors.gray,
      paddingBottom: 1,
    },
    skillType: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold',
      fontSize: 10,
      color: colors.darktext,
      width: '30%',
    },
    skillSet: {
      fontFamily: 'Source Sans Pro',
      fontWeight: 'normal',
      fontSize: 9.5,
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
      fontFamily: 'Source Sans Pro',
      fontSize: 8,
      color: colors.graytext,
      borderTopWidth: 1,
      borderTopColor: colors.gray,
      paddingTop: '2mm',
    },
  })
}

export type Styles = ReturnType<typeof createStyles>
