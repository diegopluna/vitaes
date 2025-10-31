import { PDFViewer } from '@/components/pdf-viewer'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { ResumeSchema, type IResume } from '@vitaes/types/resume'
import { initialValue } from '@/utils/initial-value'
import { useForm } from '@tanstack/react-form'
import { Field, FieldLabel } from '@/components/ui/field'

export const Route = createFileRoute('/builder/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [finalValue, setFinalValue] = useState<IResume>(initialValue)
  const [isSaving, startSavingTransition] = useTransition()

  const form = useForm({
    defaultValues: initialValue,
    validators: {
      onChange: ResumeSchema,
    },
    onSubmit: (values) => {
      setFinalValue(values.value)
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: (values) => {
        if (values.formApi.state.isValid) {
          startSavingTransition(() => {
            setFinalValue(values.formApi.state.values)
          })
        }
      },
    },
  })

  const [documentUrl, setDocumentUrl] = useState<string | null | undefined>(
    null,
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  console.log(documentUrl)
  console.log(error)

  // const [element, setElement] = useState(null)

  // const [loading, setLoading] = useState(true)

  // const onErrorClose = () => {
  //   setError(null)
  // }

  // const handleEditorLoaded = () => {
  //   setLoading(false)
  // }

  // const handleChange = (code) => {
  //   if (code.length === 0) {
  //     setError(null)
  //     setElement(null)
  //   }

  //   const callback = (value) => {
  //     setValue(value)
  //     setElement(value)
  //   }
  // }

  return (
    <div className="flex-1 flex relative max-h-full lg:flex-initial">
      {isSaving && 'Saving...'}
      <form className="flex-1 overflow-hidden relative">
        <form.Field
          name="personalInfo.firstName"
          children={(field) => (
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
              />
            </Field>
          )}
        />
      </form>
      <div className="flex-1 overflow-auto bg-background">
        <PDFViewer
          value={finalValue}
          onUrlChange={setDocumentUrl}
          onRenderError={setError}
        />
      </div>
    </div>
  )
}
