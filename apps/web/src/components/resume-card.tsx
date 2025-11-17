import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Download, Globe, Lock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { colors } from '@vitaes/types/colors'
import type { AwesomeColor } from '@vitaes/types/colors'

interface ResumeCardProps {
  resume: {
    id: string
    name: string
    thumbnailUrl: string | null
    updatedAt: Date
    views: number
    downloads: number
    isPublic: boolean
    data: {
      personalInfo: {
        firstName: string
        lastName: string
      }
      config: {
        themeColor: AwesomeColor
      }
    } | null
  }
  onEdit: (id: string) => void
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function ResumeCard({
  resume,
  onEdit,
  onDelete,
  onDuplicate,
}: ResumeCardProps) {
  const personName = resume.data
    ? `${resume.data.personalInfo.firstName} ${resume.data.personalInfo.lastName}`
    : 'Untitled'

  const themeColor = resume.data?.config.themeColor || 'awesome-emerald'
  const colorValue = colors[themeColor]

  const lastUpdated = formatDistanceToNow(new Date(resume.updatedAt), {
    addSuffix: true,
  })

  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-md"
      onClick={() => onEdit(resume.id)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-muted">
          {resume.thumbnailUrl ? (
            <img
              src={resume.thumbnailUrl}
              alt={`${resume.name} thumbnail`}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: colorValue }}
            >
              <span className="text-2xl font-bold text-white opacity-50">
                {resume.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold leading-tight">{resume.name}</h3>
          <p className="text-sm text-muted-foreground">{personName}</p>
          <p className="text-xs text-muted-foreground">Updated {lastUpdated}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {resume.isPublic ? (
            <div className="flex items-center gap-1">
              <Globe className="size-3" />
              <span>{resume.views} views</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Lock className="size-3" />
              <span>Private</span>
            </div>
          )}
          {resume.isPublic && resume.downloads > 0 && (
            <div className="flex items-center gap-1">
              <Download className="size-3" />
              <span>{resume.downloads}</span>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onEdit(resume.id)
              }}
            >
              Edit
            </DropdownMenuItem>
            {onDuplicate && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onDuplicate(resume.id)
                }}
              >
                Duplicate
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(resume.id)
                }}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
