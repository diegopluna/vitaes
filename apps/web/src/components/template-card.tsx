import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface TemplateCardProps {
  name: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export const TemplateCard = ({
  name,
  selected,
  onClick,
  className,
}: TemplateCardProps) => {
  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-lg border-2 overflow-hidden group',
        selected
          ? 'border-primary'
          : 'border-transparent hover:border-muted-foreground/25',
        className,
      )}
      onClick={onClick}
    >
      <div className="aspect-210/297 bg-muted flex items-center justify-center text-muted-foreground text-sm">
        {/* Placeholder for thumbnail */}
        <img
          src={`/${name}.png`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      {selected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
          <Check className="size-3" />
        </div>
      )}
      <div className="p-2 text-center text-sm font-medium capitalize">
        {name}
      </div>
    </div>
  )
}
