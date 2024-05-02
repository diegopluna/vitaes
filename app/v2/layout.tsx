import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/v2/navbar";
import { Footer } from "@/components/v2/footer";

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${GeistSans.className} min-h-screen`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
