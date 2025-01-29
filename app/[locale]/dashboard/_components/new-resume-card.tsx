'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconFilePlus } from '@tabler/icons-react'

export const NewResumeCard = () => {
  return (
    <Card className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader className="p-0 gap-0">
        <div className="h-full overflow-hidden">
          <div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out">
            <IconFilePlus className="w-12 h-12 text-black group-hover:text-primary group-hover:scale-110 transition-all durantion-300 ease-in-out" />
          </div>
        </div>
        <CardTitle className="py-6 pb-4 px-6">
          <span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
            Create New
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
        Choose a template to get started
      </CardContent>
      <CardFooter className="space-x-4 mt-auto">
        <div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
      </CardFooter>
    </Card>
  )
}
