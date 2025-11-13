import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './form-input'
import { FormSelect } from './form-select'
import { FormTextarea } from './form-textarea'
import { FormSlider } from './form-slider'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm, withForm } = createFormHook({
  formComponents: {},
  fieldComponents: {
    FormInput,
    FormSelect,
    FormTextarea,
    FormSlider,
  },
  fieldContext,
  formContext,
})

export { useAppForm, withForm }
