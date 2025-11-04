import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { useFieldContext } from './form-context'

type FormInputProps = {
  label: string
  placeholder?: string
}

export function FormInput({ label, placeholder }: Readonly<FormInputProps>) {
  const field = useFieldContext<string>()
  const value = field.state.value

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        type="text"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
