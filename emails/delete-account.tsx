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

interface DeleteAccountProps {
  userName: string
  url: string
}

const DeleteAccount = ({ userName, url }: DeleteAccountProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your account deletion request</Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f5] font-mono py-[40px]">
          <Container className="bg-white border border-[#e6e6e6] rounded-[8px] mx-auto p-[40px] max-w-[600px]">
            <Heading className="text-[24px] font-bold text-black my-[30px] mx-0">
              Hello, {userName}!
            </Heading>

            <Text className="text-[16px] leading-[24px] text-black my-[16px] mx-0">
              We received a request to delete your account. This action is
              permanent and cannot be undone.
            </Text>

            <Text className="text-[16px] leading-[24px] text-black my-[16px] mx-0">
              All your data will be permanently removed from our systems.
            </Text>

            <Section className="text-center my-[32px]">
              <Button
                className="bg-[#d9534f] text-white py-[12px] px-[24px] rounded-[4px] font-mono text-[14px] font-medium no-underline text-center box-border"
                href={url}
              >
                Confirm Account Deletion
              </Button>
            </Section>

            <Hr className="border border-[#e6e6e6] my-[26px] mx-0" />

            <Text className="text-[12px] text-[#666666] m-0">
              This confirmation link will expire in 24 hours.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

DeleteAccount.PreviewProps = {
  userName: 'John Doe',
  url: 'https://example.com/confirm-delete-account?token=123456',
} as DeleteAccountProps

export default DeleteAccount
