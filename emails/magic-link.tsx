import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface MagicLinkEmailProps {
  userFirstname: string
  url: string
  token: string
}

export const MagicLinkEmail = ({
  userFirstname = 'Zeno',
  url = 'https://google.com',
  token = '123456',
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Vitaes login code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://utfs.io/f/n6orBe15qu0ockrDaDxBYMPqhatUn0KiNAjGebD4ypHzWV1S`}
          width="50"
          height="50"
          alt="Vitaes"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Vitaes, the resume builder that helps you create a
          professional resume in minutes.
        </Text>
        <Text style={paragraph}>Click the button below to login.</Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Log In
          </Button>
        </Section>
        <Text style={paragraph}>
          Or, copy and paste this temporary login code:
        </Text>
        <Text style={codeParagraph}>{token}</Text>
        <Text style={paragraph}>
          If you didn’t try to log in, you can safely ignore this email.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          Vitaes
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const codeParagraph = {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 'bold',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#000000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '5px',
}
