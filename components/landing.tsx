import Link from "next/link";
import NavbarLanding from "@/components/navbar/navbar-landing";
import GithubSigninButton from "./github-signin-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

export function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavbarLanding />
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container flex flex-col items-center px-4 md:px-6 text-center space-y-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build your professional CV
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create a standout resume with our free, open-source resume
                builder.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <GithubSigninButton />
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              or{" "}
              <Link
                href="/builder"
                className="font-bold no-underline hover:underline"
              >
                start building.
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Key Features
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Vitaes comes with a range of features to help you create the
                perfect CV.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Carousel className="mx-auto object-cover object-center sm:w-full lg:order-last">
                <CarouselContent>
                  <CarouselItem key={1}>
                    <Image alt="Awesome-CV" src="/awesome.png" width={595} height={843} />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="grid gap-4 md:gap-8">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Customizable Templates</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose from a variety of professionally designed templates
                    to create a CV that matches your style.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">User-Friendly Interface</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our intuitive interface makes it easy to enter your
                    information and customize your CV.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Real-Time Previews</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    See your changes in real-time with our live preview feature,
                    ensuring your CV looks perfect.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Cloud Save</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Login with GitHub to save your CV in the cloud and access or
                    edit it from anywhere.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Multiple Formats Export</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Export your CV in multiple formats including PDF and JSON.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
