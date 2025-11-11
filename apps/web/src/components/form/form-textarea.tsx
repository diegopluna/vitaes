import { Field, FieldError, FieldLabel } from '../ui/field'
import { Textarea } from '../ui/textarea'
import { useFieldContext } from './form-context'

type FormTextareaProps = {
  label?: string
  placeholder?: string
  className?: string
  rows?: number
}

export function FormTextarea({
  label,
  placeholder,
  className,
  rows = 2,
}: Readonly<FormTextareaProps>) {
  const field = useFieldContext<string>()
  const value = field.state.value

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Textarea
        id={field.name}
        name={field.name}
        value={value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        className={className}
        rows={rows}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
