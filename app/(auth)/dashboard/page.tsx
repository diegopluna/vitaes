'use client'

import { UserButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { LanguageSelector } from '@/components/language-selector'
import { api } from '@/convex/_generated/api'

export default function Page() {
  const result = useQuery(api.resume.list)
  return (
    <div>
      <UserButton />
      <LanguageSelector />
      {JSON.stringify(result)}
    </div>
  )
}
