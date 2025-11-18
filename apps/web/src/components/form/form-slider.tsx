import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field'
import { Slider } from '../ui/slider'
import { useFieldContext } from './form-context'

type FormSliderProps = {
  label?: string
  min?: number
  max?: number
  step?: number
}

export function FormSlider({
  label,
  min,
  max,
  step,
}: Readonly<FormSliderProps>) {
  const field = useFieldContext<number>()
  const value = field.state.value
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field orientation="vertical" data-invalid={isInvalid}>
      <FieldContent>
        {label && (
          <FieldLabel htmlFor={field.name}>
            {label}: {value}
          </FieldLabel>
        )}
        <Slider
          id={field.name}
          name={field.name}
          value={[value]}
          defaultValue={[value]}
          onValueChange={(value) => field.handleChange(value[0])}
          min={min}
          max={max}
          step={step}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
    </Field>
  )
}
