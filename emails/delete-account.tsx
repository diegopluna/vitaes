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

interface DeleteAccountEmailProps {
  userFirstname: string
  url: string
  token: string
}

export const DeleteAccountEmail = ({
  userFirstname = 'Zeno',
  url = 'https://google.com',
  token = '123456',
}: DeleteAccountEmailProps) => (
  <Html>
    <Head />
    <Preview>Your account delete token</Preview>
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
          We received a request to delete your account on Vitaes.
        </Text>
        <Text style={paragraph}>
          If you want to proceed, click the button below to delete your account.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Delete Account
          </Button>
        </Section>
        <Text style={paragraph}>Your account deletion token is:</Text>
        <Text style={codeParagraph}>{token}</Text>
        <Text style={paragraph}>
          If you didn’t request to delete your account, you can safely ignore
          this email.
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

export default DeleteAccountEmail

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
