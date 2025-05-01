import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface MagicLinkProps {
  url: string
}

const MagicLink = ({ url }: MagicLinkProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your magic link to sign in to Vitaes</Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f5] font-mono py-[40px]">
          <Container className="bg-white border border-[#e6e6e6] rounded-[8px] mx-auto p-[40px] max-w-[600px]">
            <Heading className="text-[24px] font-bold text-black my-[30px] mx-0">
              Hello!
            </Heading>

            <Text className="text-[16px] leading-[24px] text-black my-[16px] mx-0">
              Here&apos;s your magic link to sign in to your Vitaes account. No
              password needed!
            </Text>

            <Section className="text-center my-[32px]">
              <Button
                className="bg-black text-white py-[12px] px-[24px] rounded-[4px] font-mono text-[14px] font-medium no-underline text-center box-border"
                href={url}
              >
                Sign In
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">
              If you didn&apos;t request this magic link, you can safely ignore
              this email.
            </Text>

            <Hr className="border border-[#e6e6e6] my-[26px] mx-0" />

            <Text className="text-[12px] text-[#666666] m-0">
              This magic link will expire in 5 minutes.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

MagicLink.PreviewProps = {
  url: 'https://example.com/magic-link',
} as MagicLinkProps

export default MagicLink
