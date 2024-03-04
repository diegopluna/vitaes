import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/sonner"


const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], preload: true});

export const metadata: Metadata = {
  title: "Vitaes",
  description: "CV Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={cn(
          "bg-background antialised min-h-screen font-sans",
          jetbrainsMono.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SpeedInsights/>
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  );
}
