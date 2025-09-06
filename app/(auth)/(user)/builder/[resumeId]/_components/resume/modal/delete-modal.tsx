'use client'

import { IconTrash } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { TooltipWrapper } from '@/components/tooltip-wrapper'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteModalProps {
  type: string
  onDelete(id: string): void
  id: string
}

export const DeleteModal = ({ type, onDelete, id }: DeleteModalProps) => {
  const t = useTranslations('delete-modal')
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <TooltipWrapper tooltip={t('tooltip', { type })}>
          <Button
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <IconTrash className="size-4" />
          </Button>
        </TooltipWrapper>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title', { type })}</AlertDialogTitle>
          <AlertDialogDescription>{t('description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onDelete(id)
            }}
          >
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
