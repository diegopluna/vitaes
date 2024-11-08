'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FilePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const NewResumeCard = () => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push('/builder')}
      className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg hover:cursor-pointer"
    >
      <CardHeader className="p-0 gap-0">
        <div className="h-full overflow-hidden">
          <div className="w-full aspect-square bg-white flex items-center justify-center object-cover">
            <FilePlus className="w-12 h-12 text-black" />
          </div>
        </div>
        <CardTitle className="py-6 pb-4 px-6">
          <span className="text-primary">Create New</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0 text-muted-foreground">
        Choose a template to get started
      </CardContent>
      <CardFooter className="space-x-4 mt-auto"></CardFooter>
    </Card>
  )
}
