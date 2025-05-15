'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from '@/i18n/navigation'
import { FC } from 'react'
import type { Resume } from '@/@types/resume'
import ResumeView from '../../builder/_components/resume/resume-view'

interface ResumeCardProps {
  resume: {
    id: string
    name: string
    data: Resume
    createdAt?: string
    updatedAt?: string
  }
}

export const ResumeCard: FC<ResumeCardProps> = ({ resume }) => {
  const router = useRouter()
  return (
    <Card
      className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden rounded-none group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={() => router.push(`/builder/${resume.id}`)}
    >
      <CardHeader className="p-0 gap-0">
        <div className="h-full overflow-hidden">
          <div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out relative overflow-hidden">
            <div
              style={{
                width: '210mm',
                height: '297mm',
                position: 'absolute',
                top: '0%',
                left: '0%',
                transform: 'scale(0.35)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <ResumeView resume={resume.data} />
            </div>
          </div>
        </div>
        <CardTitle className="py-6 pb-4 px-6">
          <span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
            {resume.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
        {/* Optionally show created/updated date */}
        {resume.updatedAt && (
          <div className="text-xs text-muted-foreground mb-2">
            Updated: {new Date(resume.updatedAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="space-x-4 mt-auto">
        <div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
      </CardFooter>
    </Card>
  )
}
