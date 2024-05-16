import { GeistSans } from "geist/font/sans";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Navbar } from "@/components/v2/navbar";
import { Footer } from "@/components/v2/footer";
import { vitaesFileRouter } from "../api/uploadthing/core";

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${GeistSans.className} min-h-screen`}>
      <NextSSRPlugin routerConfig={extractRouterConfig(vitaesFileRouter)} />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
