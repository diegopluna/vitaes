import { Button } from '@vitaes/ui/components/button'
import { Progress } from '@vitaes/ui/components/progress'
import { IconEye, IconPencil } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex flex-row w-full h-16 px-8 justify-between items-center border-b">
        <span className="font-heading font-bold text-xl">Dashboard</span>
      </header>
      <div className="flex flex-col items-start p-8 gap-7 w-full">
        <div className="flex flex-col w-full items-start gap-4">
          <span className="font-medium text-[13px] text-[#888888]">
            Continue where you left off
          </span>
          <div className="flex flex-row w-full p-6 gap-6 border bg-[#111111] items-center">
            <div className="bg-[#1A1A1A] h-30 w-22.5" />
            <div className="flex flex-col w-full items-start gap-2.5">
              <span className="font-semibold text-[16px]">
                Senior Frontend Engineer - Resume
              </span>
              <div className="flex flex-row items-center gap-4">
                <span className="text-xs text-[#666666]">
                  Edited 2 hours ago
                </span>
                <div className="size-0.75 rounded-full bg-[#333333]" />
                <div className="flex flex-row items-center gap-1.25">
                  <div className="size-1.5 rounded-full bg-primary" />
                  <span className="text-primary font-medium text-xs">
                    In Progress
                  </span>
                </div>
                <div className="size-0.75 rounded-full bg-[#333333]" />
                <span className="text-xs text-[#666666]">ATS Score: 87%</span>
              </div>
              <div className="flex flex-row items-center gap-2.5">
                <Progress className="h-1 w-50" value={75} />
                <span className="text-[11px] text-[#666666]">75% Complete</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button>
                <IconPencil className="size-3.5" />
                Continue
              </Button>
              <Button variant="secondary">
                <IconEye className="size-3.5" />
                Preview
              </Button>
            </div>
          </div>
        </div>
        Hello "/-$locale/dashboard/"!
      </div>
    </div>
  )
}
