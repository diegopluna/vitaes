import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical,
  Download,
  Globe,
  Lock,
  Pencil,
  Trash2,
  Share2,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { colors } from '@vitaes/types/colors'
import type { AwesomeColor } from '@vitaes/types/colors'
import { m } from '@/paraglide/messages'

interface ResumeCardProps {
  resume: {
    id: string
    name: string
    slug: string
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
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onTogglePublic: (id: string) => void
  onShare?: (slug: string) => void
  onDuplicate?: (id: string) => void
}

export function ResumeCard({
  resume,
  onEdit,
  onRename,
  onDelete,
  onTogglePublic,
  onShare,
  onDuplicate,
}: ResumeCardProps) {
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
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-xl bg-muted">
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
          <p className="text-xs text-muted-foreground">
            {m['resumeCard.updated']({ distanceToNow: lastUpdated })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {resume.isPublic ? (
            <div className="flex items-center gap-1">
              <Globe className="size-3" />
              <span>{m['resumeCard.views']({ views: resume.views })}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Lock className="size-3" />
              <span>{m['resumeCard.private']()}</span>
            </div>
          )}
          {resume.isPublic && (
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
                onRename(resume.id)
              }}
            >
              <Pencil className="size-4" />
              {m['resumeCard.rename']()}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onTogglePublic(resume.id)
              }}
            >
              {resume.isPublic ? (
                <>
                  <Lock className="size-4" />
                  {m['resumeCard.makePrivate']()}
                </>
              ) : (
                <>
                  <Share2 className="size-4" />
                  {m['resumeCard.makePublic']()}
                </>
              )}
            </DropdownMenuItem>
            {resume.isPublic && onShare && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onShare(resume.slug)
                }}
              >
                <Share2 className="size-4" />
                {m['resumeCard.share']()}
              </DropdownMenuItem>
            )}
            {onDuplicate && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onDuplicate(resume.id)
                }}
              >
                {m['resumeCard.duplicate']()}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(resume.id)
              }}
            >
              <Trash2 className="size-4" />
              {m['resumeCard.delete']()}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
