import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 px-4 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/vitaes.svg"
            alt="Vitaes Logo"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-lg font-bold">Vitaes</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Built by{" "}
          <a
            className="font-semibold underline"
            href="https://github.com/diegopluna"
          >
            diegopluna
          </a>{" "}
          and{" "}
          <a
            className="font-semibold underline"
            href="https://github.com/arthurlgpc"
          >
            arthurlpgc
          </a>
          . The source code is available on{" "}
          <a
            className="font-semibold underline"
            href="https://github.com/diegopluna/vitaes"
          >
            GitHub
          </a>
          .
        </p>
        <ModeToggle />
      </div>
    </footer>
  );
};
