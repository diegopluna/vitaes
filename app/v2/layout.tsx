import { GeistSans } from "geist/font/sans";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

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
