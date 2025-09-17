import type { Metadata } from "next";
import { env } from "@/env/client";

interface SeoProps {
  title: string,
  description?: string
  keywords?: string,
  creator?: string
}

export const seo = ({title, description, keywords, creator}: SeoProps): Metadata => {
  return {
    title,
    description,
    keywords,
    twitter: {
      title,
      description,
      creator,
      site: creator,
      card: 'summary_large_image'
    },
    openGraph: {
      type: 'website',
      title,
      siteName: title,
      url: env.NEXT_PUBLIC_APP_URL,
      description
    }
  }
}