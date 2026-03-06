import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  IconArrowLeft,
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-row h-screen">
      <div className="bg-[#111111] hidden lg:flex h-full w-5/8 p-15 items-start flex-col justify-between">
        <div className="flex flex-row gap-3 items-center">
          <img src="/logo.svg" className="size-12" />
          <span className="font-bold text-[22px]">Vitaes</span>
        </div>

        <div className="items-start flex flex-col gap-8">
          <span className="font-bold text-[44px]">
            Your carrer story,
            <br />
            perfectly told.
          </span>

          <span className="text-base text-muted-foreground">
            Build standout resumes with intelligent formatting, real-time
            suggestions, and designs that get you noticed.
          </span>

          <div className="flex flex-col items-start gap-2">
            <div className="h-1 w-72 bg-primary" />
            <div className="h-1 w-48 bg-primary opacity-50" />
            <div className="h-1 w-36 bg-primary opacity-25" />
          </div>
        </div>

        <div></div>
      </div>
      <div className="h-full w-full lg:w-3/8 flex flex-col justify-between p-15 items-center">
        <div className="flex flex-row gap-2.5 items-center">
          <img src="/logo.svg" className="size-9 lg:hidden" />
          <span className="font-bold text-[22px] lg:hidden">Vitaes</span>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-3">
            <span className="font-bold text-[32px]">Welcome back</span>
            <span className="text-muted-foreground text-[14px]">
              Sign in to continue building your resume
            </span>
          </div>
          <div className="flex flex-col items-start gap-3 w-full">
            <Button
              className="w-full bg-white text-black hover:bg-white/80"
              size="lg"
            >
              <IconBrandGoogleFilled className="size-5.5 mr-2.5 text-black" />
              Continue with Google
            </Button>
            <Button className="w-full" variant="secondary" size="lg">
              <IconBrandGithubFilled className="size-5.5 mr-2.5" />
              Continue with Google
            </Button>
          </div>
        </div>

        <Link
          to="/"
          className="flex flex-row items-center gap-1.5 text-primary text-[13px]"
        >
          <IconArrowLeft className="size-3.5" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
