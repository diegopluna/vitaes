import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link className="flex items-center" href="/v2/">
        <Image
          src="/vitaes.svg"
          alt="Vitaes Logo"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="ml-2 text-lg font-bold">Vitaes</span>
      </Link>
    </header>
  );
};
