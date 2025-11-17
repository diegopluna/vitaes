import { Field, FieldError, FieldLabel } from '../ui/field'
import { Checkbox } from '../ui/checkbox'
import { useFieldContext } from './form-context'

type FormCheckboxProps = {
  label?: string
  className?: string
}

export function FormCheckbox({
  label,
  className,
}: Readonly<FormCheckboxProps>) {
  const field = useFieldContext<boolean>()
  const value = field.state.value ?? false

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        id={field.name}
        name={field.name}
        checked={value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        aria-invalid={isInvalid}
        className={className}
      />
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
