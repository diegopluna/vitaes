import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import NavbarButton from "./navbar-button";
import { auth } from "@/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Navbar() {
  const session = await auth();
  const [text, setText] = useState("");
  const brandingText = "Vitaes";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText((prev) => prev + brandingText[index]);
      index++;
      if (index === brandingText.length) {
        clearInterval(intervalId);
      }
    }, 150);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/vitaes.svg" alt="Vitaes" width={24} height={24} />
            <span className="hidden font-bold sm:inline-block typewriter">{text}</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center place-content-center space-x-3 md:justify-end">
          <ModeToggle />
          <NavbarButton session={session} />
        </nav>
      </div>
    </header>
  );
}
