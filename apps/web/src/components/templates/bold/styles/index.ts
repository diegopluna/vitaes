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
      marginBottom: 4,
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
      fontWeight: 'bold',
      fontSize: 38,
      color: awesome,
      textTransform: 'uppercase',
      lineHeight: 1,
    },
    headerLastName: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 38,
      color: colors.darktext,
      textTransform: 'uppercase',
      marginLeft: 8,
      lineHeight: 1,
    },
    headerPosition: {
      fontFamily: 'Roboto',
      fontSize: 12,
      textTransform: 'uppercase',
      color: colors.darktext,
      marginTop: '1mm',
      letterSpacing: 1.5,
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
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
      marginTop: '1.5mm',
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
      fontSize: 9,
      color: colors.text,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '1.5mm',
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
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontSize: 11,
      color: awesome,
      marginTop: '5mm',
      paddingVertical: '2mm',
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.gray,
      textAlign: 'center',
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
      marginTop: '5mm',
    },
    sectionTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'black',
      fontSize: 16,
      color: colors.white,
      textTransform: 'uppercase',
      letterSpacing: 1,
      backgroundColor: awesome,
      padding: '1mm 2mm',
      alignSelf: 'flex-start',
      marginBottom: 4,
    },
    sectionTitleHighlight: {
      color: colors.white,
    },
    sectionLine: {
      height: 2,
      backgroundColor: awesome,
      marginBottom: '4mm',
      marginTop: -4, // Overlap with title
      zIndex: -1,
    },

    // Subsection styles
    subsection: {
      marginTop: '3mm',
      marginBottom: '-1mm',
    },
    subsectionTitle: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.darktext,
    },

    // Paragraph styles
    paragraph: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontSize: 10,
      color: colors.text,
      lineHeight: 1.5,
      textAlign: 'justify',
    },

    // Entry styles
    entriesContainer: {
      marginTop: '3mm',
    },
    entry: {
      marginBottom: '4mm',
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    entryTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 12,
      color: colors.darktext,
      flex: 1,
    },
    entryLocation: {
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
      fontWeight: 'medium',
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
      fontWeight: 'medium',
      color: awesome,
      flex: 1,
      textTransform: 'uppercase',
    },
    entryDate: {
      fontFamily: 'Roboto',
      fontSize: 9,
      color: colors.graytext,
      fontWeight: 'bold',
    },
    entryDescription: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
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
      fontWeight: 'normal',
      color: colors.text,
      lineHeight: 1.5,
    },
    itemBullet: {
      width: 12,
      marginRight: 2,
      color: awesome,
      fontSize: 14, // Larger bullet
      marginTop: -3,
    },
    itemText: {
      flex: 1,
    },

    // Honors
    honorsContainer: {
      marginTop: '3mm',
    },
    honorRow: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'center',
    },
    honorDate: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 10,
      color: awesome,
      width: '2cm',
    },
    honorContent: {
      flex: 1,
      marginLeft: 4,
    },
    honorPosition: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 11,
      color: colors.darktext,
    },
    honorTitle: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
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
      marginTop: '3mm',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 4,
      alignItems: 'center',
    },
    skillType: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 11,
      color: awesome,
      width: '25%',
    },
    skillSet: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
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
      fontSize: 9,
      color: colors.white,
      backgroundColor: awesome,
      padding: '2mm 4mm',
    },
  })
}

export type Styles = ReturnType<typeof createStyles>
