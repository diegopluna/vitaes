import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"


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
    <html lang="en">
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
          <SpeedInsights/>
        </ThemeProvider>
      </body>
    </html>
  );
}
