'use client'

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
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface DeleteModalProps {
  type: string
  onDelete(id: string): void
  id: string
}

export const DeleteModal = ({ type, onDelete, id }: DeleteModalProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations('DeleteModal')

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <TooltipWrapper tooltip={t('tooltip', { type })}>
          <Button
            size="icon"
            variant="outline"
            onClick={e => {
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
            onClick={e => {
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
