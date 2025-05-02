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
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppForm } from '@/components/ui/ts-form'
import type { StandardSchemaV1 } from '@tanstack/react-form'
import { memo, useCallback, useState } from 'react'

interface InputField {
  id: string
  label?: string
  placeholder?: string
  defaultValue?: string
  type?: 'text' | 'number' | 'email' | 'password'
}

type ConfirmDialogProps<T> = {
  open: boolean
  onClose: () => void
  onConfirm: (values: Record<string, string>) => void
  onCancel: () => void
  title: string
  description?: string
  inputs?: InputField[]
  initialValues?: Record<string, string>
  loading: boolean
  cancelText: string
  confirmText: string
  schema?: StandardSchemaV1<Record<string, string>>
} & (undefined extends T
  ? object
  : { schema: StandardSchemaV1<Record<string, string>> })

const ConfirmDialog = memo(function ConfirmDialog<T = unknown>({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  inputs = [],
  initialValues = {},
  loading,
  cancelText,
  confirmText,
  schema,
}: ConfirmDialogProps<T>) {
  const [localValues, setLocalValues] = useState(initialValues)

  const handleInputChange = useCallback((id: string, value: string) => {
    setLocalValues(prev => ({
      ...prev,
      [id]: value,
    }))
  }, [])

  const handleConfirmWithValues = useCallback(() => {
    onConfirm(localValues)
  }, [onConfirm, localValues])

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    defaultValues: schema ? initialValues : undefined,
    onSubmit: async ({ value }) => {
      onConfirm(value)
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    },
    [form],
  )

  if (schema) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <form.AppForm>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              {inputs.map(input => (
                <form.AppField
                  key={input.id}
                  name={input.id}
                  children={field => (
                    <field.FormItem>
                      <field.FormLabel>{input.label}</field.FormLabel>
                      <field.FormControl>
                        <Input
                          placeholder={input.placeholder}
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
              ))}
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
              <Button
                type="submit"
                onClick={form.handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : confirmText}
              </Button>
            </DialogFooter>
          </form.AppForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {inputs.length > 0 && (
          <div className="grid gap-4 py-4">
            {inputs.map(input => (
              <div key={input.id} className="grid gap-2">
                {input.label && <Label htmlFor={input.id}>{input.label}</Label>}
                <Input
                  id={input.id}
                  type={input.type || 'text'}
                  placeholder={input.placeholder}
                  value={localValues[input.id] || ''}
                  onChange={e => handleInputChange(input.id, e.target.value)}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirmWithValues}
          >
            {loading ? 'Loading...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})

export function useConfirm<T>(
  title: string,
  description?: string,
  cancelText: string = 'Cancel',
  confirmText: string = 'Confirm',
  inputs?: InputField[],
  schema?: undefined extends T
    ? undefined
    : StandardSchemaV1<Record<string, string>>,
) {
  const [promise, setPromise] = useState<{
    resolve: (value: {
      confirmed: boolean
      values?: Record<string, string>
    }) => void
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const confirm = useCallback(
    () =>
      new Promise<{ confirmed: boolean; values?: Record<string, string> }>(
        resolve => {
          setPromise({ resolve })
        },
      ),
    [],
  )

  const handleClose = useCallback(() => {
    setPromise(null)
  }, [])

  const handleConfirm = useCallback(
    (values: Record<string, string>) => {
      promise?.resolve({ confirmed: true, values })
      handleClose()
    },
    [promise, handleClose],
  )

  const handleCancel = useCallback(() => {
    promise?.resolve({ confirmed: false })
    handleClose()
  }, [promise, handleClose])

  const DialogComponent = useCallback(
    () => (
      <ConfirmDialog
        open={promise !== null}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={title}
        description={description}
        inputs={inputs}
        initialValues={inputs?.reduce(
          (acc, input) => ({
            ...acc,
            [input.id]: input.defaultValue || '',
          }),
          {},
        )}
        loading={loading}
        cancelText={cancelText}
        confirmText={confirmText}
        schema={schema}
      />
    ),
    [
      promise,
      loading,
      title,
      description,
      inputs,
      cancelText,
      confirmText,
      handleCancel,
      handleClose,
      handleConfirm,
      schema,
    ],
  )

  return [DialogComponent, confirm, setLoading] as const
}
