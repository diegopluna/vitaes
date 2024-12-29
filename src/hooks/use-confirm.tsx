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
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

export const useConfirm = (
  title: string,
  description?: string,
  cancelText: string = 'Cancel',
  confirmText: string = 'Confirm',
): [() => JSX.Element, () => Promise<unknown>, (loading: boolean) => void] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <AlertDialog open={promise !== null} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleConfirm}>
            {loading ? 'Loading...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return [ConfirmationDialog, confirm, setLoading]
}
