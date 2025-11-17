import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './form-input'
import { FormSelect } from './form-select'
import { FormTextarea } from './form-textarea'
import { FormSlider } from './form-slider'
import { FormCheckbox } from './form-checkbox'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm, withForm } = createFormHook({
  formComponents: {},
  fieldComponents: {
    FormInput,
    FormSelect,
    FormTextarea,
    FormSlider,
    FormCheckbox,
  },
  fieldContext,
  formContext,
})

export { useAppForm, withForm }
