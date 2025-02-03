import { Document, Page, Text, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
    },
  ],
})

export async function AwesomeCVPDF() {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: 'Roboto',
        }}
      >
        <Text>Awesome CV</Text>
      </Page>
    </Document>
  )
}
