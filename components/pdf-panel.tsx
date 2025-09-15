import { cn } from '@/lib/utils'

export const PDFPanel = ({
  active = false,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'flex-1 overflow-auto bg-white md:w-full md:h-full md:absolute',
        active ? 'z-500' : 'z-250',
      )}
    >
      {children}
    </div>
  )
}
