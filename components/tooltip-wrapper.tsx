import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface TooltipWrapperProps {
  children: React.ReactNode
  tooltip: string
}

const TooltipWrapper = ({ children, tooltip }: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export { TooltipWrapper }
