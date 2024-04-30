import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="w-full py-12 ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Build Your Perfect Resume
              </h1>
              <p className="max-w-[600[x] text-gray-500 md:text-xl dark:text-gray-400">
                Our intuitive resume builder helps you create a professional and
                eye-catching resume in minutes. Get noticed by employers with a
                resume that stands out.
              </p>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/v2/signin"
              >
                Get Started
              </Link>
            </div>
          </div>
          <Image
            src="/onlinecv.svg"
            alt="Resume Builder"
            width={550}
            height={550}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </section>
  );
};
