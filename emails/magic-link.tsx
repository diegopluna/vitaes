import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import vitaesLogo from "@/public/vitaes.svg";

interface VitaesMagicLinkProps {
  url: string;
  host: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VitaesMagicLink = ({ url, host }: VitaesMagicLinkProps) => (
  <Html>
    <Head />
    <Preview>Your magic link for {host}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={vitaesLogo}
          width="42"
          height="42"
          alt="Vitaes"
          style={logo}
        />
        <Heading style={heading}>Your magic link for {host}</Heading>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Sign in to Vitaes
          </Button>
        </Section>
        <Text style={paragraph}>
          If you did not request this email, you can safely ignore it.
        </Text>
        {/* <code style={code}>{validationCode}</code> */}
        <Hr style={hr} />
        <Link href="https://vitaes.io" style={reportLink}>
          Vitaes
        </Link>
      </Container>
    </Body>
  </Html>
);

VitaesMagicLink.PreviewProps = {
  url: "https://vitaes.io",
  host: "Vitaes",
} as VitaesMagicLinkProps;

export default VitaesMagicLink;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000000 ",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
